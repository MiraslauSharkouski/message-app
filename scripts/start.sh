#!/bin/bash

echo "🚀 Starting Message App with Docker..."

# Остановка существующих контейнеров
echo "🛑 Stopping existing containers..."
docker-compose down

# Запуск всех сервисов
echo "🏗️  Building and starting services..."
docker-compose up -d --build

# Ожидание запуска
echo "⏳ Waiting for services to start..."
sleep 10

# Проверка статуса
echo "📋 Checking service status..."
docker-compose ps

echo "✅ Services started successfully!"
echo "🌐 Client: http://localhost:3000"
echo "🔧 Server: http://localhost:5000"
echo "🗄️  Database: localhost:5432"

# Показать логи
echo "📋 Showing logs (Ctrl+C to exit)..."
docker-compose logs -f