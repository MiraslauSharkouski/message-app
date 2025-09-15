import { ICreateMessage, IMessage } from "../models/Message";
import {
  saveMessage,
  getMessageById,
  getAllMessages,
} from "../db/messageRepository";
import {
  validateMessageData,
  IValidationResult,
} from "../models/messageValidator";

// @description: Результат операции с сообщением
// @purpose: Стандартизированный формат для возвращения результатов операций
export interface IMessageOperationResult {
  success: boolean;
  message?: IMessage;
  messages?: IMessage[];
  errors?: string[];
}

// @description: Создание нового сообщения
// @purpose: Валидация и сохранение сообщения в базе данных
// @param: messageData - данные нового сообщения
// @returns: Promise<IMessageOperationResult> - результат операции
export async function createMessage(
  messageData: ICreateMessage
): Promise<IMessageOperationResult> {
  // Валидация входных данных
  const validation: IValidationResult = validateMessageData(messageData);

  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors,
    };
  }

  try {
    // Сохранение сообщения в базе данных
    const savedMessage = await saveMessage(messageData);

    return {
      success: true,
      message: savedMessage,
    };
  } catch (error) {
    console.error("Error creating message:", error);
    return {
      success: false,
      errors: ["Failed to save message to database"],
    };
  }
}

// @description: Получение всех сообщений
// @purpose: Получение списка всех сохраненных сообщений
// @returns: Promise<IMessageOperationResult> - результат операции
export async function getAllMessagesService(): Promise<IMessageOperationResult> {
  try {
    const messages = await getAllMessages();

    return {
      success: true,
      messages,
    };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return {
      success: false,
      errors: ["Failed to fetch messages from database"],
    };
  }
}

// @description: Получение сообщения по ID
// @purpose: Получение конкретного сообщения по идентификатору
// @param: id - идентификатор сообщения
// @returns: Promise<IMessageOperationResult> - результат операции
export async function getMessageByIdService(
  id: number
): Promise<IMessageOperationResult> {
  try {
    const message = await getMessageById(id);

    if (!message) {
      return {
        success: false,
        errors: ["Message not found"],
      };
    }

    return {
      success: true,
      message,
    };
  } catch (error) {
    console.error("Error fetching message by id:", error);
    return {
      success: false,
      errors: ["Failed to fetch message from database"],
    };
  }
}
