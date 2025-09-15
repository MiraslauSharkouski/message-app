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
