// @description: Миграция для создания таблицы messages
// @purpose: Создание структуры таблицы для хранения сообщений пользователей
// @table: messages - хранит информацию о сообщениях

export const up = `
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

export const down = `
  DROP TABLE IF EXISTS messages;
`;
