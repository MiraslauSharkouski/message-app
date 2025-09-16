// @description: Хук для отправки формы
// @purpose: Централизованная логика отправки данных формы
import { useState } from "react";
import {
  messageService,
  type ICreateMessage,
} from "../services/messageService";

// @description: Тип для функции отправки данных
// @purpose: Типизация функции отправки
type SubmitFunction<T> = (data: T) => Promise<void>;

// @description: Результат хука отправки формы
// @purpose: Типизация возвращаемых значений
interface UseFormSubmitResult<T> {
  isSubmitting: boolean;
  submitError: string | null;
  handleSubmit: (data: T) => Promise<void>;
  reset: () => void;
}

// @description: Хук для управления отправкой формы
// @purpose: Управление состоянием загрузки и ошибок при отправке
export const useFormSubmit = <T extends ICreateMessage>(
  submitFunction?: SubmitFunction<T>
): UseFormSubmitResult<T> => {
  // @description: Состояние загрузки
  // @purpose: Отслеживание процесса отправки
  const [isSubmitting, setIsSubmitting] = useState(false);

  // @description: Состояние ошибки
  // @purpose: Хранение сообщения об ошибке
  const [submitError, setSubmitError] = useState<string | null>(null);

  // @description: Функция отправки данных
  // @purpose: Обработка отправки с управлением состоянием
  const handleSubmit = async (data: T): Promise<void> => {
    // @description: Сброс предыдущей ошибки
    // @purpose: Очистка состояния ошибки перед новой попыткой
    setSubmitError(null);

    // @description: Установка состояния загрузки
    // @purpose: Блокировка интерфейса во время отправки
    setIsSubmitting(true);

    try {
      // @description: Вызов функции отправки или стандартного сервиса
      // @purpose: Передача данных для обработки
      if (submitFunction) {
        await submitFunction(data);
      } else {
        // @description: Использование стандартного сервиса сообщений
        // @purpose: Отправка данных через messageService
        await messageService.sendMessage(data);
      }
    } catch (error) {
      // @description: Обработка ошибок отправки
      // @purpose: Отображение сообщения об ошибке пользователю
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Произошла ошибка при отправке сообщения";
      setSubmitError(errorMessage);
      throw error;
    } finally {
      // @description: Сброс состояния загрузки
      // @purpose: Разблокировка интерфейса после отправки
      setIsSubmitting(false);
    }
  };

  // @description: Функция сброса состояния
  // @purpose: Очистка состояния ошибок
  const reset = () => {
    setSubmitError(null);
    setIsSubmitting(false);
  };

  return {
    isSubmitting,
    submitError,
    handleSubmit,
    reset,
  };
};
