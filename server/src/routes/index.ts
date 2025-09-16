import { Router } from "express";
import messagesRouter from "./messages";

// @description: Главный router приложения
// @purpose: Централизованное подключение всех маршрутов
const router = Router();

// @route: /api/messages
// @description: Все маршруты для работы с сообщениями
router.use("/messages", messagesRouter);

// @route: GET /api/health
// @description: Проверка состояния API
// @access: Public
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "Message App API",
  });
});

export default router;
