use std::sync::Arc;

use chrono::Utc;
use serde::{Deserialize, Serialize};
use tauri::State;
use uuid::Uuid;

use crate::AppState;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateScenarioInput {
    pub name: String,
    pub description: Option<String>,
    pub tags: Vec<String>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ScenarioSummary {
    pub id: String,
    pub name: String,
    pub description: String,
    pub status: String,
    pub fiction_lab_plan: String,
    pub tags: Vec<String>,
    pub created_at: String,
    pub updated_at: String,
}

fn make_managed_folder_name(name: &str, id: &str) -> String {
    let sanitized: String = name
        .chars()
        .filter(|character| {
            !matches!(
                character,
                '<' | '>' | ':' | '"' | '/' | '\\' | '|' | '?' | '*'
            ) && !character.is_control()
        })
        .collect();

    let sanitized = sanitized
        .trim()
        .trim_end_matches(['.', ' '])
        .chars()
        .take(80)
        .collect::<String>();

    let base = if sanitized.is_empty() {
        "Scenario".to_string()
    } else {
        sanitized
    };

    format!("{}-{}", base, &id[..8])
}

#[tauri::command]
pub async fn create_scenario(
    state: State<'_, Arc<AppState>>,
    input: CreateScenarioInput,
) -> Result<ScenarioSummary, String> {
    let name = input.name.trim().to_string();

    if name.is_empty() {
        return Err("Scenario Name is required.".to_string());
    }

    if input.tags.len() > 5 {
        return Err("A Scenario can have at most 5 Tags & Genres.".to_string());
    }

    let id = Uuid::new_v4().to_string();
    let now = Utc::now().to_rfc3339();
    let status = "DRAFT".to_string();

    let description = input.description.unwrap_or_default().trim().to_string();

    let managed_folder_name = make_managed_folder_name(&name, &id);

    let mut transaction = state.db.begin().await.map_err(|error| error.to_string())?;

    sqlx::query(
        r#"
        INSERT INTO scenarios (
            id,
            name,
            description,
            managed_folder_name,
            status,
            favorite,
            is_trashed,
            created_at,
            updated_at
        )
        VALUES (?, ?, ?, ?, ?, 0, 0, ?, ?)
        "#,
    )
    .bind(&id)
    .bind(&name)
    .bind(&description)
    .bind(&managed_folder_name)
    .bind(&status)
    .bind(&now)
    .bind(&now)
    .execute(&mut *transaction)
    .await
    .map_err(|error| error.to_string())?;

    for (display_order, tag) in input.tags.iter().enumerate() {
        sqlx::query(
            r#"
            INSERT INTO scenario_tags (
                id,
                scenario_id,
                value,
                display_order
            )
            VALUES (?, ?, ?, ?)
            "#,
        )
        .bind(Uuid::new_v4().to_string())
        .bind(&id)
        .bind(tag)
        .bind(display_order as i64)
        .execute(&mut *transaction)
        .await
        .map_err(|error| error.to_string())?;
    }

    transaction
        .commit()
        .await
        .map_err(|error| error.to_string())?;

    Ok(ScenarioSummary {
        id,
        name,
        description,
        status,
        fiction_lab_plan: "FREE".to_string(),
        tags: input.tags,
        created_at: now.clone(),
        updated_at: now,
    })
}

#[tauri::command]
pub async fn list_scenarios(
    state: State<'_, Arc<AppState>>,
) -> Result<Vec<ScenarioSummary>, String> {
    let rows = sqlx::query_as::<_, (String, String, String, String, String, String, String)>(
        r#"
        SELECT
            id,
            name,
            description,
            status,
            fiction_lab_plan,
            created_at,
            updated_at
        FROM scenarios
        WHERE is_trashed = 0
        ORDER BY updated_at DESC
        "#,
    )
    .fetch_all(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    let mut scenarios = Vec::with_capacity(rows.len());

    for (id, name, description, status, fiction_lab_plan, created_at, updated_at) in rows {
        let tags = sqlx::query_scalar::<_, String>(
            r#"
            SELECT value
            FROM scenario_tags
            WHERE scenario_id = ?
            ORDER BY display_order ASC
            "#,
        )
        .bind(&id)
        .fetch_all(&state.db)
        .await
        .map_err(|error| error.to_string())?;

        scenarios.push(ScenarioSummary {
            id,
            name,
            description,
            status,
            fiction_lab_plan,
            tags,
            created_at,
            updated_at,
        });
    }

    Ok(scenarios)
}

#[tauri::command]
pub async fn get_scenario(
    state: State<'_, Arc<AppState>>,
    scenario_id: String,
) -> Result<ScenarioSummary, String> {
    let row = sqlx::query_as::<_, (String, String, String, String, String, String, String)>(
        r#"
        SELECT
            id,
            name,
            description,
            status,
            fiction_lab_plan,
            created_at,
            updated_at
        FROM scenarios
        WHERE id = ?
          AND is_trashed = 0
        "#,
    )
    .bind(&scenario_id)
    .fetch_optional(&state.db)
    .await
    .map_err(|error| error.to_string())?
    .ok_or_else(|| "Scenario not found.".to_string())?;

    let tags = sqlx::query_scalar::<_, String>(
        r#"
        SELECT value
        FROM scenario_tags
        WHERE scenario_id = ?
        ORDER BY display_order ASC
        "#,
    )
    .bind(&scenario_id)
    .fetch_all(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    Ok(ScenarioSummary {
        id: row.0,
        name: row.1,
        description: row.2,
        status: row.3,
        fiction_lab_plan: row.4,
        tags,
        created_at: row.5,
        updated_at: row.6,
    })
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ScenarioStory {
    pub backstory: String,
    pub greeting: String,
    pub custom_instructions: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ScenarioStoryLimits {
    pub backstory: i64,
    pub greeting: i64,
    pub custom_instructions: i64,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct LoreCardSummary {
    pub id: String,
    pub lore_type: String,
    pub internal_category: String,
    pub title: String,
    pub description: String,
    pub weight: String,
    pub pinned: bool,
    pub text_canon_status: String,
    pub visual_canon_status: String,
    pub display_order: i64,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateLoreCardInput {
    pub scenario_id: String,
    pub lore_type: String,
    pub internal_category: String,
    pub title: String,
    pub weight: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateLoreCardWeightInput {
    pub lore_card_id: String,
    pub weight: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateLoreCardTitleInput {
    pub lore_card_id: String,
    pub title: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateLoreCardTypeInput {
    pub lore_card_id: String,
    pub lore_type: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateLoreCardInternalCategoryInput {
    pub lore_card_id: String,
    pub internal_category: String,
}

async fn get_scenario_limit(
    pool: &sqlx::SqlitePool,
    scenario_id: &str,
    key: &str,
    missing_message: &str,
) -> Result<i64, String> {
    sqlx::query_scalar::<_, i64>(
        r#"
        SELECT platform_limits.value
        FROM scenarios
        JOIN platform_profiles
          ON platform_profiles.plan = scenarios.fiction_lab_plan
        JOIN platform_limits
          ON platform_limits.profile_id = platform_profiles.id
        WHERE scenarios.id = ?
          AND scenarios.is_trashed = 0
          AND platform_limits.key = ?
        "#,
    )
    .bind(scenario_id)
    .bind(key)
    .fetch_optional(pool)
    .await
    .map_err(|error| error.to_string())?
    .ok_or_else(|| missing_message.to_string())
}

#[tauri::command]
pub async fn get_scenario_story(
    state: State<'_, Arc<AppState>>,
    scenario_id: String,
) -> Result<ScenarioStory, String> {
    let row = sqlx::query_as::<_, (String, String, String)>(
        r#"
        SELECT
            backstory,
            greeting,
            custom_instructions
        FROM scenarios
        WHERE id = ?
          AND is_trashed = 0
        "#,
    )
    .bind(&scenario_id)
    .fetch_optional(&state.db)
    .await
    .map_err(|error| error.to_string())?
    .ok_or_else(|| "Scenario not found.".to_string())?;

    Ok(ScenarioStory {
        backstory: row.0,
        greeting: row.1,
        custom_instructions: row.2,
    })
}

#[tauri::command]
pub async fn list_lore_cards(
    state: State<'_, Arc<AppState>>,
    scenario_id: String,
) -> Result<Vec<LoreCardSummary>, String> {
    let rows = sqlx::query_as::<
        _,
        (
            String,
            String,
            String,
            String,
            String,
            String,
            i64,
            String,
            String,
            i64,
        ),
    >(
        r#"
        SELECT
            id,
            type,
            internal_category,
            title,
            description,
            weight,
            pinned,
            text_canon_status,
            visual_canon_status,
            display_order
        FROM lore_cards
        WHERE scenario_id = ?
          AND is_trashed = 0
        ORDER BY display_order ASC
        "#,
    )
    .bind(scenario_id)
    .fetch_all(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    Ok(rows
        .into_iter()
        .map(|row| LoreCardSummary {
            id: row.0,
            lore_type: row.1,
            internal_category: row.2,
            title: row.3,
            description: row.4,
            weight: row.5,
            pinned: row.6 != 0,
            text_canon_status: row.7,
            visual_canon_status: row.8,
            display_order: row.9,
        })
        .collect())
}

#[tauri::command]
pub async fn create_lore_card(
    state: State<'_, Arc<AppState>>,
    input: CreateLoreCardInput,
) -> Result<LoreCardSummary, String> {
    let title = input.title.trim().to_string();

    if title.is_empty() {
        return Err("Lore Card Title is required.".to_string());
    }

    let id = Uuid::new_v4().to_string();
    let now = Utc::now().to_rfc3339();

    let display_order = sqlx::query_scalar::<_, i64>(
        r#"
        SELECT COALESCE(MAX(display_order) + 1, 0)
        FROM lore_cards
        WHERE scenario_id = ?
        "#,
    )
    .bind(&input.scenario_id)
    .fetch_one(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    sqlx::query(
        r#"
        INSERT INTO lore_cards (
            id,
            scenario_id,
            type,
            internal_category,
            title,
            weight,
            display_order,
            created_at,
            updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        "#,
    )
    .bind(&id)
    .bind(&input.scenario_id)
    .bind(&input.lore_type)
    .bind(&input.internal_category)
    .bind(&title)
    .bind(&input.weight)
    .bind(display_order)
    .bind(&now)
    .bind(&now)
    .execute(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    Ok(LoreCardSummary {
        id,
        lore_type: input.lore_type,
        internal_category: input.internal_category,
        title,
        description: String::new(),
        weight: input.weight,
        pinned: false,
        text_canon_status: "DRAFT".to_string(),
        visual_canon_status: "NOT_STARTED".to_string(),
        display_order,
    })
}

#[tauri::command]
pub async fn update_lore_card_weight(
    state: State<'_, Arc<AppState>>,
    input: UpdateLoreCardWeightInput,
) -> Result<(), String> {
    let now = Utc::now().to_rfc3339();

    sqlx::query(
        r#"
        UPDATE lore_cards
        SET weight = ?,
            updated_at = ?
        WHERE id = ?
        "#,
    )
    .bind(&input.weight)
    .bind(&now)
    .bind(&input.lore_card_id)
    .execute(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn update_lore_card_title(
    state: State<'_, Arc<AppState>>,
    input: UpdateLoreCardTitleInput,
) -> Result<(), String> {
    let title = input.title.trim().to_string();

    if title.is_empty() {
        return Err("Lore Card Title is required.".to_string());
    }

    let now = Utc::now().to_rfc3339();

    sqlx::query(
        r#"
        UPDATE lore_cards
        SET title = ?,
            updated_at = ?
        WHERE id = ?
        "#,
    )
    .bind(&title)
    .bind(&now)
    .bind(&input.lore_card_id)
    .execute(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn update_lore_card_type(
    state: State<'_, Arc<AppState>>,
    input: UpdateLoreCardTypeInput,
) -> Result<(), String> {
    let now = Utc::now().to_rfc3339();

    sqlx::query(
        r#"
        UPDATE lore_cards
        SET type = ?,
            updated_at = ?
        WHERE id = ?
        "#,
    )
    .bind(&input.lore_type)
    .bind(&now)
    .bind(&input.lore_card_id)
    .execute(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn update_lore_card_internal_category(
    state: State<'_, Arc<AppState>>,
    input: UpdateLoreCardInternalCategoryInput,
) -> Result<(), String> {
    let now = Utc::now().to_rfc3339();

    sqlx::query(
        r#"
        UPDATE lore_cards
        SET internal_category = ?,
            updated_at = ?
        WHERE id = ?
        "#,
    )
    .bind(&input.internal_category)
    .bind(&now)
    .bind(&input.lore_card_id)
    .execute(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn get_scenario_story_limits(
    state: State<'_, Arc<AppState>>,
    scenario_id: String,
) -> Result<ScenarioStoryLimits, String> {
    let rows = sqlx::query_as::<_, (String, i64)>(
        r#"
        SELECT
            platform_limits.key,
            platform_limits.value
        FROM scenarios
        JOIN platform_profiles
          ON platform_profiles.plan = scenarios.fiction_lab_plan
        JOIN platform_limits
          ON platform_limits.profile_id = platform_profiles.id
        WHERE scenarios.id = ?
          AND scenarios.is_trashed = 0
          AND platform_limits.key IN (
              'scenario.backstory',
              'scenario.greeting',
              'scenario.customInstructions'
          )
        "#,
    )
    .bind(&scenario_id)
    .fetch_all(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    let mut backstory = None;
    let mut greeting = None;
    let mut custom_instructions = None;

    for (key, value) in rows {
        match key.as_str() {
            "scenario.backstory" => backstory = Some(value),
            "scenario.greeting" => greeting = Some(value),
            "scenario.customInstructions" => custom_instructions = Some(value),
            _ => {}
        }
    }

    Ok(ScenarioStoryLimits {
        backstory: backstory.ok_or_else(|| "Backstory limit could not be resolved.".to_string())?,
        greeting: greeting.ok_or_else(|| "Greeting limit could not be resolved.".to_string())?,
        custom_instructions: custom_instructions
            .ok_or_else(|| "Custom Instructions limit could not be resolved.".to_string())?,
    })
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateScenarioBackstoryInput {
    pub scenario_id: String,
    pub backstory: String,
}

#[tauri::command]
pub async fn update_scenario_backstory(
    state: State<'_, Arc<AppState>>,
    input: UpdateScenarioBackstoryInput,
) -> Result<(), String> {
    let limit = get_scenario_limit(
        &state.db,
        &input.scenario_id,
        "scenario.backstory",
        "Backstory limit could not be resolved.",
    )
    .await?;
    let character_count = input.backstory.chars().count() as i64;

    if character_count > limit {
        return Err(format!(
            "Backstory exceeds the Fiction Lab limit of {limit} characters."
        ));
    }

    let now = Utc::now().to_rfc3339();

    let result = sqlx::query(
        r#"
        UPDATE scenarios
        SET
            backstory = ?,
            updated_at = ?
        WHERE id = ?
          AND is_trashed = 0
        "#,
    )
    .bind(&input.backstory)
    .bind(&now)
    .bind(&input.scenario_id)
    .execute(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    if result.rows_affected() == 0 {
        return Err("Scenario not found.".to_string());
    }

    Ok(())
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateScenarioGreetingInput {
    pub scenario_id: String,
    pub greeting: String,
}

#[tauri::command]
pub async fn update_scenario_greeting(
    state: State<'_, Arc<AppState>>,
    input: UpdateScenarioGreetingInput,
) -> Result<(), String> {
    let limit = get_scenario_limit(
        &state.db,
        &input.scenario_id,
        "scenario.greeting",
        "Greeting limit could not be resolved.",
    )
    .await?;

    let character_count = input.greeting.chars().count() as i64;

    if character_count > limit {
        return Err(format!(
            "Greeting exceeds the Fiction Lab limit of {limit} characters."
        ));
    }

    let now = Utc::now().to_rfc3339();

    let result = sqlx::query(
        r#"
        UPDATE scenarios
        SET
            greeting = ?,
            updated_at = ?
        WHERE id = ?
          AND is_trashed = 0
        "#,
    )
    .bind(&input.greeting)
    .bind(&now)
    .bind(&input.scenario_id)
    .execute(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    if result.rows_affected() == 0 {
        return Err("Scenario not found.".to_string());
    }

    Ok(())
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateScenarioCustomInstructionsInput {
    pub scenario_id: String,
    pub custom_instructions: String,
}

#[tauri::command]
pub async fn update_scenario_custom_instructions(
    state: State<'_, Arc<AppState>>,
    input: UpdateScenarioCustomInstructionsInput,
) -> Result<(), String> {
    let limit = get_scenario_limit(
        &state.db,
        &input.scenario_id,
        "scenario.customInstructions",
        "Custom Instructions limit could not be resolved.",
    )
    .await?;

    let character_count = input.custom_instructions.chars().count() as i64;

    if character_count > limit {
        return Err(format!(
            "Custom Instructions exceeds the Fiction Lab limit of {limit} characters."
        ));
    }

    let now = Utc::now().to_rfc3339();

    let result = sqlx::query(
        r#"
        UPDATE scenarios
        SET
            custom_instructions = ?,
            updated_at = ?
        WHERE id = ?
          AND is_trashed = 0
        "#,
    )
    .bind(&input.custom_instructions)
    .bind(&now)
    .bind(&input.scenario_id)
    .execute(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    if result.rows_affected() == 0 {
        return Err("Scenario not found.".to_string());
    }

    Ok(())
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateScenarioFictionLabPlanInput {
    pub scenario_id: String,
    pub fiction_lab_plan: String,
}

#[tauri::command]
pub async fn update_scenario_fiction_lab_plan(
    state: State<'_, Arc<AppState>>,
    input: UpdateScenarioFictionLabPlanInput,
) -> Result<(), String> {
    if !matches!(input.fiction_lab_plan.as_str(), "FREE" | "PLUS" | "ULTRA") {
        return Err("Invalid Fiction Lab plan.".to_string());
    }

    let now = Utc::now().to_rfc3339();

    let result = sqlx::query(
        r#"
        UPDATE scenarios
        SET
            fiction_lab_plan = ?,
            updated_at = ?
        WHERE id = ?
          AND is_trashed = 0
        "#,
    )
    .bind(&input.fiction_lab_plan)
    .bind(&now)
    .bind(&input.scenario_id)
    .execute(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    if result.rows_affected() == 0 {
        return Err("Scenario not found.".to_string());
    }

    Ok(())
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ScenarioOverview {
    pub lore_count: i64,
    pub connection_count: i64,
    pub visual_canon_count: i64,
}

#[tauri::command]
pub async fn get_scenario_overview(
    state: State<'_, Arc<AppState>>,
    scenario_id: String,
) -> Result<ScenarioOverview, String> {
    let lore_count = sqlx::query_scalar::<_, i64>(
        r#"
        SELECT COUNT(*)
        FROM lore_cards
        WHERE scenario_id = ?
          AND is_trashed = 0
        "#,
    )
    .bind(&scenario_id)
    .fetch_one(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    let connection_count = sqlx::query_scalar::<_, i64>(
        r#"
        SELECT COUNT(*)
        FROM connections
        WHERE scenario_id = ?
        "#,
    )
    .bind(&scenario_id)
    .fetch_one(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    let visual_canon_count = sqlx::query_scalar::<_, i64>(
        r#"
        SELECT COUNT(*)
        FROM lore_cards
        WHERE scenario_id = ?
          AND is_trashed = 0
          AND visual_canon_status = 'VISUAL CANON'
        "#,
    )
    .bind(&scenario_id)
    .fetch_one(&state.db)
    .await
    .map_err(|error| error.to_string())?;

    Ok(ScenarioOverview {
        lore_count,
        connection_count,
        visual_canon_count,
    })
}
