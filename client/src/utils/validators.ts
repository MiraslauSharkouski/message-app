// @description: Утилиты для валидации форм
// @purpose: Централизованная валидация данных формы

// @description: Валидация имени отправителя
// @purpose: Проверка длины имени (минимум 2 символа, максимум 100)
// @param: value - значение для валидации
// @returns: string | undefined - сообщение об ошибке или undefined если валидно
export const validateName = (value: string): string | undefined => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "Имя обязательно для заполнения";
  }

  if (trimmedValue.length < 2) {
    return "Имя должно содержать минимум 2 символа";
  }

  if (trimmedValue.length > 100) {
    return "Имя должно содержать менее 100 символов";
  }

  return undefined;
};

// @description: Валидация номера телефона
// @purpose: Проверка формата белорусского номера телефона (+375... или 80...)
// @param: value - значение для валидации
// @returns: string | undefined - сообщение об ошибке или undefined если валидно
export const validatePhone = (value: string): string | undefined => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "Телефон обязателен для заполнения";
  }

  // @description: Регулярное выражение для белорусских номеров
  // @purpose: Проверка формата +375XXYYYYYYY или 80XXYYYYYYY
  const belarusPhoneRegex = /^(\+375|80)(29|33|44|17)\d{3}\d{2}\d{2}$/;

  if (!belarusPhoneRegex.test(trimmedValue)) {
    return "Введите корректный белорусский номер телефона (+375XXYYYYYYY или 80XXYYYYYYY)";
  }

  return undefined;
};

// @description: Валидация текста сообщения
// @purpose: Проверка длины сообщения (минимум 2 символа, максимум 1000)
// @param: value - значение для валидации
// @returns: string | undefined - сообщение об ошибке или undefined если валидно
export const validateMessage = (value: string): string | undefined => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "Сообщение обязательно для заполнения";
  }

  if (trimmedValue.length < 2) {
    return "Сообщение должно содержать минимум 2 символа";
  }

  if (trimmedValue.length > 1000) {
    return "Сообщение должно содержать менее 1000 символов";
  }

  return undefined;
};

// @description: Экспорт всех валидаторов
// @purpose: Упрощение импорта валидаторов
export default {
  validateName,
  validatePhone,
  validateMessage,
};
