// @description: Компонент формы отправки сообщения
// @purpose: Реализация формы с валидацией с использованием react-hook-form
import React from "react";
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
  onSubmit: (data: IFormInputs) => void;
  isSubmitting?: boolean;
  onCancel?: () => void;
}

// @description: Компонент формы отправки сообщения
// @purpose: Реализация формы с валидацией и управлением состоянием
const MessageForm: React.FC<MessageFormProps> = ({
  onSubmit,
  isSubmitting = false,
  onCancel,
}) => {
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
  const onFormSubmit: SubmitHandler<IFormInputs> = (data) => {
    onSubmit(data);
  };

  // @description: Очистка формы
  // @purpose: Сброс значений полей формы
  const handleReset = () => {
    reset();
  };

  return (
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
          disabled={isSubmitting}
        />
        {errors.name && <div className="form-error">{errors.name.message}</div>}
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
          disabled={isSubmitting}
        />
        {errors.phone && (
          <div className="form-error">{errors.phone.message}</div>
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
          disabled={isSubmitting}
        />
        {errors.message && (
          <div className="form-error">{errors.message.message}</div>
        )}
      </div>

      {/* @description: Кнопки формы */}
      {/* @purpose: Управление отправкой и отменой */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          type="submit"
          className={`btn btn-primary flex-1 ${
            isSubmitting ? "btn-disabled" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block"
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
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Отмена
          </button>
        )}

        <button
          type="button"
          onClick={handleReset}
          className="btn btn-secondary"
          disabled={isSubmitting}
        >
          Очистить
        </button>
      </div>

      {/* @description: DevTools для разработки */}
      {/* @purpose: Визуализация состояния формы в режиме разработки */}
      {process.env.NODE_ENV === "development" && <DevTool control={control} />}
    </form>
  );
};

export default MessageForm;
