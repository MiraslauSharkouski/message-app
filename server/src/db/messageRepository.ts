import pool from "./db";
import { IMessage, ICreateMessage } from "../models/Message";

// @description: Сохранение нового сообщения в базу данных
// @purpose: Добавление сообщения от пользователя в таблицу messages
// @param: messageData - данные сообщения для сохранения
// @returns: Promise<IMessage> - сохраненное сообщение с ID и датой создания
export async function saveMessage(
  messageData: ICreateMessage
): Promise<IMessage> {
  const { name, phone, message } = messageData;

  const query = `
    INSERT INTO messages (name, phone, message)
    VALUES ($1, $2, $3)
    RETURNING id, name, phone, message, created_at
  `;

  const values = [name, phone, message];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error saving message to database:", error);
    throw new Error("Failed to save message");
  }
}

// @description: Получение всех сообщений из базы данных
// @purpose: Для административных целей или отображения списка сообщений
// @returns: Promise<IMessage[]> - массив всех сообщений
export async function getAllMessages(): Promise<IMessage[]> {
  const query =
    "SELECT id, name, phone, message, created_at FROM messages ORDER BY created_at DESC";

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching messages from database:", error);
    throw new Error("Failed to fetch messages");
  }
}

// @description: Получение сообщения по ID
// @purpose: Для получения конкретного сообщения по идентификатору
// @param: id - идентификатор сообщения
// @returns: Promise<IMessage | null> - сообщение или null если не найдено
export async function getMessageById(id: number): Promise<IMessage | null> {
  const query =
    "SELECT id, name, phone, message, created_at FROM messages WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Error fetching message by id:", error);
    throw new Error("Failed to fetch message");
  }
}
