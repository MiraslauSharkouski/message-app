import { Router } from "express";
import { messageController } from "../controllers/messageController";

// @description: Router для сообщений
// @purpose: Определение всех маршрутов, связанных с сообщениями
// @base_path: /api/messages
const router = Router();

// @route: POST /api/messages
// @description: Создание нового сообщения
// @access: Public
// @body: { name: string, phone: string, message: string }
// @returns: 201 Created + saved message | 400 Bad Request + validation errors
router.post("/", messageController.createMessage);

// @route: GET /api/messages
// @description: Получение всех сообщений (для административных целей)
// @access: Public (в реальном приложении может потребоваться аутентификация)
// @returns: 200 OK + array of messages | 500 Internal Server Error
router.get("/", messageController.getAllMessages);

// @route: GET /api/messages/:id
// @description: Получение сообщения по ID
// @access: Public
// @params: id - идентификатор сообщения
// @returns: 200 OK + message | 404 Not Found | 500 Internal Server Error
router.get("/:id", messageController.getMessageById);

export default router;
