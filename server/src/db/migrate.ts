import pool from "./db";
import * as messagesMigration from "./migrations/01_create_messages_table";

// @description: Выполнение миграции вверх (создание таблицы)
// @purpose: Создание необходимой структуры БД
async function runMigrationUp() {
  try {
    console.log("Running migration up...");
    await pool.query(messagesMigration.up);
    console.log("Migration completed successfully");
    await pool.end();
  } catch (error) {
    console.error("Migration failed:", error);
    await pool.end();
    process.exit(1);
  }
}

// @description: Выполнение миграции вниз (удаление таблицы)
// @purpose: Откат изменений (используется при необходимости)
async function runMigrationDown() {
  try {
    console.log("Running migration down...");
    await pool.query(messagesMigration.down);
    console.log("Migration rollback completed successfully");
    await pool.end();
  } catch (error) {
    console.error("Migration rollback failed:", error);
    await pool.end();
    process.exit(1);
  }
}

// @description: Определение типа миграции из аргументов командной строки
// @usage: npm run migrate:up или npm run migrate:down
const action = process.argv[2];
if (action === "down") {
  runMigrationDown();
} else {
  runMigrationUp();
}
