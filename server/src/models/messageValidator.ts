import { ICreateMessage } from "./Message";

// @description: Результат валидации данных
// @purpose: Стандартизированный формат для возвращения результатов валидации
export interface IValidationResult {
  isValid: boolean;
  errors: string[];
}

// @description: Валидация имени отправителя
// @purpose: Проверка длины имени (минимум 2 символа)
// @param: name - имя для валидации
// @returns: string[] - массив ошибок (пустой если валидно)
export function validateName(name: string): string[] {
  const errors: string[] = [];

  if (!name || typeof name !== "string") {
    errors.push("Name is required");
    return errors;
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  if (trimmedName.length > 100) {
    errors.push("Name must be less than 100 characters");
  }

  return errors;
}

// @description: Валидация номера телефона
// @purpose: Проверка формата белорусского номера телефона (+375... или 80...)
// @param: phone - номер телефона для валидации
// @returns: string[] - массив ошибок (пустой если валидно)
export function validatePhone(phone: string): string[] {
  const errors: string[] = [];

  if (!phone || typeof phone !== "string") {
    errors.push("Phone is required");
    return errors;
  }

  const trimmedPhone = phone.trim();

  // Регулярное выражение для белорусских номеров
  const belarusPhoneRegex = /^(\+375|80)(29|33|44|17)\d{3}\d{2}\d{2}$/;

  if (!belarusPhoneRegex.test(trimmedPhone)) {
    errors.push(
      "Phone must be in Belarusian format (+375XXYYYYYYY or 80XXYYYYYYY)"
    );
  }

  return errors;
}

// @description: Валидация текста сообщения
// @purpose: Проверка длины сообщения (минимум 2 символа)
// @param: message - текст сообщения для валидации
// @returns: string[] - массив ошибок (пустой если валидно)
export function validateMessage(message: string): string[] {
  const errors: string[] = [];

  if (!message || typeof message !== "string") {
    errors.push("Message is required");
    return errors;
  }

  const trimmedMessage = message.trim();

  if (trimmedMessage.length < 2) {
    errors.push("Message must be at least 2 characters long");
  }

  if (trimmedMessage.length > 1000) {
    errors.push("Message must be less than 1000 characters");
  }

  return errors;
}

// @description: Валидация всех полей сообщения
// @purpose: Комплексная проверка данных перед сохранением в БД
// @param: messageData - данные сообщения для валидации
// @returns: IValidationResult - результат валидации
export function validateMessageData(
  messageData: ICreateMessage
): IValidationResult {
  const errors: string[] = [];

  // Валидация каждого поля
  errors.push(...validateName(messageData.name));
  errors.push(...validatePhone(messageData.phone));
  errors.push(...validateMessage(messageData.message));

  return {
    isValid: errors.length === 0,
    errors,
  };
}
