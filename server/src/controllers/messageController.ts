import { Request, Response } from "express";
import {
  createMessage,
  getAllMessagesService,
  getMessageByIdService,
} from "../services/messageService";

// @description: Контроллер для обработки запросов сообщений
// @purpose: Обработка HTTP запросов и возврат соответствующих ответов

class MessageController {
  // @route: POST /api/messages
  // @description: Создание нового сообщения
  // @access: Public
  public async createMessage(req: Request, res: Response): Promise<void> {
    try {
      const { name, phone, message } = req.body;

      // Вызов сервиса для создания сообщения
      const result = await createMessage({ name, phone, message });

      if (result.success) {
        // Успешное создание - возвращаем 201 Created
        res.status(201).json({
          success: true,
          data: result.message,
          message: "Message created successfully",
        });
      } else {
        // Ошибки валидации - возвращаем 400 Bad Request
        res.status(400).json({
          success: false,
          errors: result.errors,
          message: "Validation failed",
        });
      }
    } catch (error) {
      console.error("Error in createMessage controller:", error);
      // Внутренняя ошибка сервера
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // @route: GET /api/messages
  // @description: Получение всех сообщений
  // @access: Public
  public async getAllMessages(req: Request, res: Response): Promise<void> {
    try {
      const result = await getAllMessagesService();

      if (result.success) {
        res.status(200).json({
          success: true,
          messages: result.messages,
          count: result.messages?.length || 0,
        });
      } else {
        res.status(500).json({
          success: false,
          errors: result.errors,
          message: "Failed to fetch messages",
        });
      }
    } catch (error) {
      console.error("Error in getAllMessages controller:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // @route: GET /api/messages/:id
  // @description: Получение сообщения по ID
  // @access: Public
  public async getMessageById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Проверка валидности ID
      const messageId = parseInt(id);
      if (isNaN(messageId)) {
        res.status(400).json({
          success: false,
          message: "Invalid message ID",
        });
        return;
      }

      const result = await getMessageByIdService(messageId);

      if (result.success) {
        res.status(200).json({
          success: true,
          message: result.message,
        });
      } else {
        if (result.errors?.includes("Message not found")) {
          res.status(404).json({
            success: false,
            message: "Message not found",
          });
        } else {
          res.status(500).json({
            success: false,
            errors: result.errors,
            message: "Failed to fetch message",
          });
        }
      }
    } catch (error) {
      console.error("Error in getMessageById controller:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

// @description: Экземпляр контроллера сообщений
// @purpose: Использование в маршрутах
export const messageController = new MessageController();
