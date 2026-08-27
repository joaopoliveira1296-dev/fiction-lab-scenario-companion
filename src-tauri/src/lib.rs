mod backup;
mod commands;
mod domain;
mod errors;
mod export;
mod repositories;
mod services;
mod storage;

use std::sync::Arc;

use sqlx::SqlitePool;
use tauri::Manager;

pub struct AppState {
    pub db: SqlitePool,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![commands::create_scenario])
        .setup(|app| {
            let app_data_dir = app
                .path()
                .app_local_data_dir()
                .expect("failed to resolve app local data directory");

            let data_root = app_data_dir.join("Data");

            let database_pool =
                tauri::async_runtime::block_on(storage::initialize_database(&data_root))
                    .expect("failed to initialize Companion database");
            app.manage(Arc::new(AppState { db: database_pool }));

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running Fiction Lab Scenario Companion");
}
