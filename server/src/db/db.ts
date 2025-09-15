import { Pool, PoolConfig } from "pg";

// @description: Конфигурация pool соединений PostgreSQL
// @purpose: Оптимизация производительности и управление соединениями
// @config:
//   - max: максимальное количество соединений в пуле
//   - min: минимальное количество соединений в пуле
//   - idleTimeoutMillis: время простоя соединения перед закрытием
//   - connectionTimeoutMillis: время ожидания соединения
const poolConfig: PoolConfig = {
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "message_app",
  password: process.env.DB_PASSWORD || "postgres",
  port: parseInt(process.env.DB_PORT || "5432"),
  max: 20, // максимальное количество соединений
  min: 5, // минимальное количество соединений
  idleTimeoutMillis: 30000, // 30 секунд простоя
  connectionTimeoutMillis: 2000, // 2 секунды ожидания
};

// @description: Pool соединений для PostgreSQL
// @purpose: Повторное использование соединений для повышения производительности
const pool = new Pool(poolConfig);

// @description: Обработка ошибок pool соединений
// @purpose: Логирование ошибок соединения
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// @description: Проверка подключения к базе данных
// @purpose: Убедиться, что подключение установлено корректно при запуске
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err.stack);
  } else {
    console.log("Database connected successfully");
  }
});

export default pool;
