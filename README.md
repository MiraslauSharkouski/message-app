# Message App

Клиент-серверное приложение для отправки и сохранения сообщений.

## Структура проекта

- `client/` - React клиентское приложение
- `server/` - Express сервер
- `docs/` - Документация

## Технологии

- **Клиент**: React, TypeScript, Vite
- **Сервер**: Express, TypeScript
- **База данных**: PostgreSQL
- **Инфраструктура**: Docker, docker-compose

## API Endpoints

### Messages

- `POST /api/messages` - Создание нового сообщения
- `GET /api/messages` - Получение всех сообщений
- `GET /api/messages/:id` - Получение сообщения по ID

### Health Check

- `GET /api/health` - Проверка состояния API

## Запуск приложения

### С использованием Docker

```bash
# Запуск всех сервисов
docker-compose up --build

# Запуск в фоновом режиме
docker-compose up -d --build

# Остановка сервисов
docker-compose down
```
