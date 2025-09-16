// @description: Компонент формы отправки сообщения
// @purpose: Реализация формы с валидацией с использованием react-hook-form
import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {
  validateName,
  validatePhone,
  validateMessage,
} from "../utils/validators";

// @description: Интерфейс для данных формы
// @purpose: Типизация данных формы
interface IFormInputs {
  name: string;
  phone: string;
  message: string;
}

// @description: Пропсы компонента формы
// @purpose: Типизация пропсов компонента
interface MessageFormProps {
  onSubmit: (data: IFormInputs) => Promise<void>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

// @description: Компонент формы отправки сообщения
// @purpose: Реализация формы с валидацией и управлением состоянием
const MessageForm: React.FC<MessageFormProps> = ({
  onSubmit,
  onSuccess,
  onCancel,
}) => {
  // @description: Локальное состояние загрузки
  // @purpose: Управление состоянием загрузки внутри компонента
  const [isLoading, setIsLoading] = useState(false);
  // @description: Состояние успешной отправки
  // @purpose: Отображение сообщения об успехе
  const [isSuccess, setIsSuccess] = useState(false);
  // @description: Состояние ошибки
  // @purpose: Хранение сообщения об ошибке
  const [submitError, setSubmitError] = useState<string | null>(null);

  // @description: Инициализация react-hook-form
  // @purpose: Управление состоянием формы и валидацией
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IFormInputs>({
    mode: "onBlur", // @description: Валидация при потере фокуса
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  // @description: Обработчик отправки формы
  // @purpose: Передача валидных данных родительскому компоненту
  const onFormSubmit: SubmitHandler<IFormInputs> = async (data) => {
    // @description: Установка состояния загрузки
    // @purpose: Блокировка кнопки и отображение индикатора загрузки
    setIsLoading(true);
    setIsSuccess(false);
    setSubmitError(null);

    try {
      // @description: Вызов обработчика отправки из пропсов
      // @purpose: Передача данных родительскому компоненту
      await onSubmit(data);

      // @description: Установка состояния успеха
      // @purpose: Отображение сообщения об успешной отправке
      setIsSuccess(true);

      // @description: Вызов обработчика успеха если передан
      // @purpose: Дополнительная обработка успеха
      if (onSuccess) {
        onSuccess();
      }

      // @description: Автоматическая очистка формы через 3 секунды
      // @purpose: Улучшение UX после успешной отправки
      setTimeout(() => {
        reset();
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      // @description: Обработка ошибок отправки
      // @purpose: Отображение сообщения об ошибке пользователю
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Произошла ошибка при отправке сообщения";
      setSubmitError(errorMessage);
    } finally {
      // @description: Сброс состояния загрузки
      // @purpose: Разблокировка кнопки
      setIsLoading(false);
    }
  };

  // @description: Очистка формы
  // @purpose: Сброс значений полей формы
  const handleReset = () => {
    reset();
    setIsSuccess(false);
    setSubmitError(null);
  };

  // @description: Обработчик отмены
  // @purpose: Очистка состояния и вызов обработчика отмены
  const handleCancel = () => {
    reset();
    setIsSuccess(false);
    setSubmitError(null);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="space-y-6">
      {/* @description: Сообщение об успехе */}
      {/* @purpose: Отображение положительной обратной связи */}
      {isSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6 fade-in">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Сообщение успешно отправлено!
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  Ваше сообщение было успешно сохранено. Форма будет очищена
                  автоматически.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* @description: Отображение ошибки отправки */}
      {/* @purpose: Обратная связь при ошибках */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Ошибка отправки
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{submitError}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* @description: Поле ввода имени */}
        {/* @purpose: Сбор имени пользователя с валидацией */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Имя <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            {...register("name", {
              validate: validateName,
            })}
            className={`form-input ${errors.name ? "form-input-error" : ""}`}
            placeholder="Введите ваше имя"
            disabled={isLoading}
          />
          {errors.name && (
            <div className="form-error flex items-center mt-1">
              <svg
                className="h-4 w-4 text-red-500 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.name.message}
            </div>
          )}
        </div>

        {/* @description: Поле ввода телефона */}
        {/* @purpose: Сбор номера телефона пользователя с валидацией */}
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Телефон <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone", {
              validate: validatePhone,
            })}
            className={`form-input ${errors.phone ? "form-input-error" : ""}`}
            placeholder="+375XXYYYYYYY или 80XXYYYYYYY"
            disabled={isLoading}
          />
          {errors.phone && (
            <div className="form-error flex items-center mt-1">
              <svg
                className="h-4 w-4 text-red-500 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.phone.message}
            </div>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Пример: +375291234567 или 80291234567
          </p>
        </div>

        {/* @description: Поле ввода сообщения */}
        {/* @purpose: Сбор текста сообщения с валидацией */}
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Сообщение <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            {...register("message", {
              validate: validateMessage,
            })}
            rows={5}
            className={`form-input ${errors.message ? "form-input-error" : ""}`}
            placeholder="Введите ваше сообщение"
            disabled={isLoading}
          />
          {errors.message && (
            <div className="form-error flex items-center mt-1">
              <svg
                className="h-4 w-4 text-red-500 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.message.message}
            </div>
          )}
        </div>

        {/* @description: Кнопки формы */}
        {/* @purpose: Управление отправкой и отменой */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            className={`btn btn-primary flex-1 flex items-center justify-center ${
              isLoading ? "btn-disabled" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Отправка...
              </>
            ) : (
              "Отправить сообщение"
            )}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
              disabled={isLoading}
            >
              Отмена
            </button>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary"
            disabled={isLoading}
          >
            Очистить
          </button>
        </div>
      </form>

      {/* @description: DevTools для разработки */}
      {/* @purpose: Визуализация состояния формы в режиме разработки */}
      {process.env.NODE_ENV === "development" && <DevTool control={control} />}
    </div>
  );
};

export default MessageForm;
