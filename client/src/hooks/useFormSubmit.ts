// @description: Хук для отправки формы
// @purpose: Централизованная логика отправки данных формы
import { useState } from "react";

// @description: Результат хука отправки формы
// @purpose: Типизация возвращаемых значений
interface UseFormSubmitResult {
  isSubmitting: boolean;
  submitError: string | null;
  reset: () => void;
}

// @description: Хук для управления отправкой формы
// @purpose: Управление состоянием загрузки и ошибок при отправке
export const useFormSubmit = (): UseFormSubmitResult => {
  // @description: Состояние загрузки
  // @purpose: Отслеживание процесса отправки
  const [isSubmitting, setIsSubmitting] = useState(false);

  // @description: Состояние ошибки
  // @purpose: Хранение сообщения об ошибке
  const [submitError, setSubmitError] = useState<string | null>(null);

  // @description: Функция сброса состояния
  // @purpose: Очистка состояния ошибок
  const reset = () => {
    setSubmitError(null);
    setIsSubmitting(false);
  };

  return {
    isSubmitting,
    submitError,
    reset,
  };
};
