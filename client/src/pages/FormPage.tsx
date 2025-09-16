// @description: Страница формы отправки сообщения
// @purpose: Отображение формы для ввода данных пользователя
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// @description: Интерфейс для данных формы
// @purpose: Типизация данных формы
interface FormData {
  name: string;
  phone: string;
  message: string;
}

// @description: Интерфейс для ошибок валидации
// @purpose: Типизация ошибок валидации
interface FormErrors {
  name?: string;
  phone?: string;
  message?: string;
}

// @description: Компонент страницы формы
// @purpose: Отображение формы и обработка отправки
const FormPage: React.FC = () => {
  // @description: Хук для программной навигации
  // @purpose: Переход к другой странице
  const navigate = useNavigate();

  // @description: Состояние данных формы
  // @purpose: Хранение значений полей формы
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    message: "",
  });

  // @description: Состояние ошибок валидации
  // @purpose: Отображение ошибок валидации
  const [errors, setErrors] = useState<FormErrors>({});

  // @description: Состояние загрузки
  // @purpose: Блокировка кнопки во время отправки
  const [isSubmitting, setIsSubmitting] = useState(false);

  // @description: Обработчик изменения полей формы
  // @purpose: Обновление состояния данных формы
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // @description: Очистка ошибки при изменении поля
    // @purpose: Улучшение UX при исправлении ошибок
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // @description: Валидация данных формы
  // @purpose: Проверка корректности введенных данных
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // @description: Валидация имени
    // @purpose: Проверка длины имени (минимум 2 символа)
    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно для заполнения";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    }

    // @description: Валидация телефона
    // @purpose: Проверка формата белорусского номера телефона
    const phoneRegex = /^(\+375|80)(29|33|44|17)\d{3}\d{2}\d{2}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обязателен для заполнения";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone =
        "Введите корректный белорусский номер телефона (+375XXYYYYYYY или 80XXYYYYYYY)";
    }

    // @description: Валидация сообщения
    // @purpose: Проверка длины сообщения (минимум 2 символа)
    if (!formData.message.trim()) {
      newErrors.message = "Сообщение обязательно для заполнения";
    } else if (formData.message.trim().length < 2) {
      newErrors.message = "Сообщение должно содержать минимум 2 символа";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // @description: Обработчик отправки формы
  // @purpose: Валидация и отправка данных
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // @description: Валидация формы перед отправкой
    // @purpose: Предотвращение отправки некорректных данных
    if (!validateForm()) {
      return;
    }

    // @description: Блокировка кнопки во время отправки
    // @purpose: Предотвращение дублирующих запросов
    setIsSubmitting(true);

    // @description: Здесь будет логика отправки данных на сервер
    // @purpose: Сохранение сообщения в базе данных
    console.log("Form submitted:", formData);

    // @description: Симуляция отправки данных
    // @purpose: Демонстрация UX во время загрузки
    setTimeout(() => {
      setIsSubmitting(false);
      // @description: Очистка формы после успешной отправки
      // @purpose: Подготовка к новой отправке
      setFormData({
        name: "",
        phone: "",
        message: "",
      });
      alert("Сообщение успешно отправлено!");
    }, 1500);
  };

  // @description: Обработчик клика по кнопке "Назад"
  // @purpose: Переход к странице приветствия
  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h1 className="page-title mb-0">Отправить сообщение</h1>
            <button
              onClick={handleBackClick}
              className="btn btn-secondary flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Назад
            </button>
          </div>

          <p className="text-gray-600 mb-8">
            Заполните форму ниже, чтобы отправить нам сообщение
          </p>

          {/* @description: Форма отправки сообщения */}
          {/* @purpose: Сбор данных от пользователя */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* @description: Поле ввода имени */}
            {/* @purpose: Сбор имени пользователя */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Имя <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${
                  errors.name ? "form-input-error" : ""
                }`}
                placeholder="Введите ваше имя"
                disabled={isSubmitting}
              />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>

            {/* @description: Поле ввода телефона */}
            {/* @purpose: Сбор номера телефона пользователя */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Телефон <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`form-input ${
                  errors.phone ? "form-input-error" : ""
                }`}
                placeholder="+375XXYYYYYYY или 80XXYYYYYYY"
                disabled={isSubmitting}
              />
              {errors.phone && <div className="form-error">{errors.phone}</div>}
              <p className="text-sm text-gray-500 mt-1">
                Пример: +375291234567 или 80291234567
              </p>
            </div>

            {/* @description: Поле ввода сообщения */}
            {/* @purpose: Сбор текста сообщения */}
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Сообщение <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`form-input ${
                  errors.message ? "form-input-error" : ""
                }`}
                placeholder="Введите ваше сообщение"
                disabled={isSubmitting}
              />
              {errors.message && (
                <div className="form-error">{errors.message}</div>
              )}
            </div>

            {/* @description: Кнопка отправки формы */}
            {/* @purpose: Отправка данных на сервер */}
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

              <button
                type="button"
                onClick={handleBackClick}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
