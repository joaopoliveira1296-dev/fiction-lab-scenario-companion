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
        tags: input.tags,
        created_at: now.clone(),
        updated_at: now,
    })
}

#[tauri::command]
pub async fn list_scenarios(
    state: State<'_, Arc<AppState>>,
) -> Result<Vec<ScenarioSummary>, String> {
    let rows = sqlx::query_as::<_, (String, String, String, String, String, String)>(
        r#"
        SELECT
            id,
            name,
            description,
            status,
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

    for (id, name, description, status, created_at, updated_at) in rows {
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
            tags,
            created_at,
            updated_at,
        });
    }

    Ok(scenarios)
}
