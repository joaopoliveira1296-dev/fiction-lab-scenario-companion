mod commands;
mod domain;
mod errors;
mod repositories;
mod services;
mod storage;
mod backup;
mod export;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running Fiction Lab Scenario Companion");
}
