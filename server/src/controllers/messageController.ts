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
  // @body: { name: string, phone: string, message: string }
  // @returns: 201 Created | 400 Bad Request | 500 Internal Server Error
  public async createMessage(req: Request, res: Response): Promise<void> {
    try {
      const { name, phone, message } = req.body;

      // @description: Валидация наличия обязательных полей
      // @purpose: Предварительная проверка входных данных
      if (!name || !phone || !message) {
        res.status(400).json({
          success: false,
          message: "All fields are required: name, phone, message",
        });
        return;
      }

      // @description: Вызов сервиса для создания сообщения
      // @purpose: Бизнес-логика валидации и сохранения в БД
      const result = await createMessage({ name, phone, message });

      if (result.success) {
        // @description: Успешное создание - возвращаем 201 Created
        // @response: 201 + сохраненное сообщение
        res.status(201).json({
          success: true,
          data: result.message,
          message: "Message created successfully",
        });
      } else {
        // @description: Ошибки валидации - возвращаем 400 Bad Request
        // @response: 400 + массив ошибок
        res.status(400).json({
          success: false,
          errors: result.errors,
          message: "Validation failed",
        });
      }
    } catch (error) {
      console.error("Error in createMessage controller:", error);
      // @description: Внутренняя ошибка сервера
      // @response: 500 + сообщение об ошибке
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // @route: GET /api/messages
  // @description: Получение всех сообщений
  // @access: Public
  // @returns: 200 OK | 500 Internal Server Error
  public async getAllMessages(req: Request, res: Response): Promise<void> {
    try {
      // @description: Вызов сервиса для получения всех сообщений
      // @purpose: Получение списка сообщений из БД
      const result = await getAllMessagesService();

      if (result.success) {
        // @description: Успешное получение - возвращаем 200 OK
        // @response: 200 + массив сообщений
        res.status(200).json({
          success: true,
          data: result.messages,
          count: result.messages?.length || 0,
          message: "Messages fetched successfully",
        });
      } else {
        // @description: Ошибка получения данных - возвращаем 500 Internal Server Error
        // @response: 500 + сообщение об ошибке
        res.status(500).json({
          success: false,
          errors: result.errors,
          message: "Failed to fetch messages",
        });
      }
    } catch (error) {
      console.error("Error in getAllMessages controller:", error);
      // @description: Внутренняя ошибка сервера
      // @response: 500 + сообщение об ошибке
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // @route: GET /api/messages/:id
  // @description: Получение сообщения по ID
  // @access: Public
  // @params: id - идентификатор сообщения
  // @returns: 200 OK | 400 Bad Request | 404 Not Found | 500 Internal Server Error
  public async getMessageById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // @description: Проверка валидности ID
      // @purpose: Убедиться, что ID является числом
      const messageId = parseInt(id);
      if (isNaN(messageId)) {
        // @description: Невалидный ID - возвращаем 400 Bad Request
        // @response: 400 + сообщение об ошибке
        res.status(400).json({
          success: false,
          message: "Invalid message ID",
        });
        return;
      }

      // @description: Вызов сервиса для получения сообщения по ID
      // @purpose: Получение конкретного сообщения из БД
      const result = await getMessageByIdService(messageId);

      if (result.success) {
        // @description: Сообщение найдено - возвращаем 200 OK
        // @response: 200 + найденное сообщение
        res.status(200).json({
          success: true,
          data: result.message,
          message: "Message fetched successfully",
        });
      } else {
        // @description: Обработка различных типов ошибок
        if (result.errors?.includes("Message not found")) {
          // @description: Сообщение не найдено - возвращаем 404 Not Found
          // @response: 404 + сообщение об ошибке
          res.status(404).json({
            success: false,
            message: "Message not found",
          });
        } else {
          // @description: Другая ошибка - возвращаем 500 Internal Server Error
          // @response: 500 + сообщение об ошибке
          res.status(500).json({
            success: false,
            errors: result.errors,
            message: "Failed to fetch message",
          });
        }
      }
    } catch (error) {
      console.error("Error in getMessageById controller:", error);
      // @description: Внутренняя ошибка сервера
      // @response: 500 + сообщение об ошибке
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
