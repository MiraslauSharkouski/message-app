import { Router } from "express";
import { messageController } from "../controllers/messageController";
import {
  validateMessageMiddleware,
  validateIdMiddleware,
  validateJsonContentType,
} from "../middleware/validationMiddleware";

// @description: Router для сообщений
// @purpose: Определение всех маршрутов, связанных с сообщениями
// @base_path: /api/messages
const router = Router();

// @route: POST /api/messages
// @description: Создание нового сообщения
// @access: Public
// @middleware: validateJsonContentType, validateMessageMiddleware
// @body: { name: string, phone: string, message: string }
// @returns: 201 Created + saved message | 400 Bad Request + validation errors
router.post(
  "/",
  validateJsonContentType,
  validateMessageMiddleware,
  messageController.createMessage
);

// @route: GET /api/messages
// @description: Получение всех сообщений (для административных целей)
// @access: Public
// @returns: 200 OK + array of messages | 500 Internal Server Error
router.get("/", messageController.getAllMessages);

// @route: GET /api/messages/:id
// @description: Получение сообщения по ID
// @access: Public
// @middleware: validateIdMiddleware
// @params: id - идентификатор сообщения
// @returns: 200 OK + message | 400 Bad Request | 404 Not Found | 500 Internal Server Error
router.get("/:id", validateIdMiddleware, messageController.getMessageById);

export default router;
