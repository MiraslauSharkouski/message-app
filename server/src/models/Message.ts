// @description: Интерфейс для модели сообщения
// @purpose: Определение структуры данных сообщения
// @fields:
//   - id: уникальный идентификатор (опциональный для новых сообщений)
//   - name: имя отправителя (2-100 символов)
//   - phone: телефон отправителя (формат +375... или 80...)
//   - message: текст сообщения (2+ символов)
//   - created_at: дата создания (устанавливается автоматически)

export interface IMessage {
  id?: number;
  name: string;
  phone: string;
  message: string;
  created_at?: Date;
}

// @description: Интерфейс для создания нового сообщения
// @purpose: Используется при валидации входных данных
export interface ICreateMessage {
  name: string;
  phone: string;
  message: string;
}
