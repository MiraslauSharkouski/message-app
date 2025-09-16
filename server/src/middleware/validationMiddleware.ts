import { Request, Response, NextFunction } from "express";

// @description: Интерфейс для результата валидации
// @purpose: Стандартизированный формат для возвращения результатов валидации
interface IValidationResult {
  isValid: boolean;
  errors: string[];
}

// @description: Валидация имени отправителя
// @purpose: Проверка длины имени (минимум 2 символа, максимум 100)
// @param: name - имя для валидации
// @returns: IValidationResult - результат валидации
function validateName(name: string): IValidationResult {
  const errors: string[] = [];

  if (!name || typeof name !== "string") {
    errors.push("Name is required");
    return { isValid: false, errors };
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  if (trimmedName.length > 100) {
    errors.push("Name must be less than 100 characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// @description: Валидация номера телефона
// @purpose: Проверка формата белорусского номера телефона (+375... или 80...)
// @param: phone - номер телефона для валидации
// @returns: IValidationResult - результат валидации
function validatePhone(phone: string): IValidationResult {
  const errors: string[] = [];

  if (!phone || typeof phone !== "string") {
    errors.push("Phone is required");
    return { isValid: false, errors };
  }

  const trimmedPhone = phone.trim();

  // Регулярное выражение для белорусских номеров
  const belarusPhoneRegex = /^(\+375|80)(29|33|44|17)\d{3}\d{2}\d{2}$/;

  if (!belarusPhoneRegex.test(trimmedPhone)) {
    errors.push(
      "Phone must be in Belarusian format (+375XXYYYYYYY or 80XXYYYYYYY)"
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// @description: Валидация текста сообщения
// @purpose: Проверка длины сообщения (минимум 2 символа, максимум 1000)
// @param: message - текст сообщения для валидации
// @returns: IValidationResult - результат валидации
function validateMessage(message: string): IValidationResult {
  const errors: string[] = [];

  if (!message || typeof message !== "string") {
    errors.push("Message is required");
    return { isValid: false, errors };
  }

  const trimmedMessage = message.trim();

  if (trimmedMessage.length < 2) {
    errors.push("Message must be at least 2 characters long");
  }

  if (trimmedMessage.length > 1000) {
    errors.push("Message must be less than 1000 characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// @description: Middleware для валидации сообщений
// @purpose: Централизованная валидация входных данных для POST /api/messages
// @usage: Применяется к маршрутам, требующим валидации сообщений
export const validateMessageMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { name, phone, message } = req.body;

    // @description: Проверка наличия всех обязательных полей
    // @purpose: Убедиться, что все необходимые данные переданы
    if (!name && !phone && !message) {
      res.status(400).json({
        success: false,
        message: "Request body is empty",
        errors: ["Name, phone, and message are required"],
      });
      return;
    }

    // @description: Валидация каждого поля по отдельности
    // @purpose: Получить все ошибки валидации
    const nameValidation = validateName(name);
    const phoneValidation = validatePhone(phone);
    const messageValidation = validateMessage(message);

    // @description: Сбор всех ошибок валидации
    // @purpose: Предоставить полную информацию об ошибках пользователю
    const allErrors: string[] = [
      ...nameValidation.errors,
      ...phoneValidation.errors,
      ...messageValidation.errors,
    ];

    // @description: Проверка общего результата валидации
    // @purpose: Продолжить обработку или вернуть ошибки
    if (allErrors.length > 0) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: allErrors,
      });
      return;
    }

    // @description: Если валидация прошла успешно, продолжаем обработку
    // @purpose: Передача управления следующему middleware или контроллеру
    next();
  } catch (error) {
    console.error("Validation middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Internal validation error",
    });
  }
};

// @description: Middleware для валидации ID в параметрах
// @purpose: Проверка корректности числового ID в URL параметрах
// @usage: Применяется к маршрутам с параметром :id
export const validateIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { id } = req.params;

    // @description: Проверка валидности ID
    // @purpose: Убедиться, что ID является положительным числом
    const messageId = parseInt(id);

    if (isNaN(messageId) || messageId <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid message ID. ID must be a positive number",
      });
      return;
    }

    // @description: Добавление валидного ID в request для дальнейшего использования
    // @purpose: Предостать контроллеру проверенный ID
    req.params.id = messageId.toString();

    // @description: Если валидация прошла успешно, продолжаем обработку
    next();
  } catch (error) {
    console.error("ID validation middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Internal validation error",
    });
  }
};

// @description: Middleware для проверки Content-Type
// @purpose: Убедиться, что запрос содержит JSON данные
export const validateJsonContentType = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const contentType = req.headers["content-type"];

  if (contentType && !contentType.includes("application/json")) {
    res.status(400).json({
      success: false,
      message: "Content-Type must be application/json",
    });
    return;
  }

  next();
};
