-- @description: Инициализационный скрипт для базы данных
-- @purpose: Создание необходимых таблиц при запуске контейнера

-- Создание таблицы сообщений если она не существует
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Добавление комментариев к таблице и полям
COMMENT ON TABLE messages IS 'Таблица для хранения сообщений пользователей';
COMMENT ON COLUMN messages.id IS 'Уникальный идентификатор сообщения';
COMMENT ON COLUMN messages.name IS 'Имя отправителя сообщения';
COMMENT ON COLUMN messages.phone IS 'Телефон отправителя сообщения';
COMMENT ON COLUMN messages.message IS 'Текст сообщения';
COMMENT ON COLUMN messages.created_at IS 'Дата и время создания сообщения';

-- Создание индекса для ускорения поиска по дате
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- Вставка тестовых данных (опционально)
-- INSERT INTO messages (name, phone, message) VALUES 
-- ('Тестовый пользователь', '+375291234567', 'Тестовое сообщение для проверки работы системы');

-- Вывод информации о создании таблицы
SELECT 'Таблица messages успешно создана или уже существовала' as message;