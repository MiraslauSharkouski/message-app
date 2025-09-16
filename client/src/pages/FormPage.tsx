// @description: Страница формы отправки сообщения
// @purpose: Отображение формы для ввода данных пользователя
import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageForm } from "../components";
import { useFormSubmit } from "../hooks";
import {
  messageService,
  type ICreateMessage,
} from "../services/messageService";

// @description: Компонент страницы формы
// @purpose: Отображение формы и обработка отправки
const FormPage: React.FC = () => {
  // @description: Хук для программной навигации
  // @purpose: Переход к другой странице
  const navigate = useNavigate();

  // @description: Хук для управления отправкой формы
  // @purpose: Централизованное управление состоянием отправки
  const { isSubmitting, submitError, handleSubmit, reset } =
    useFormSubmit<ICreateMessage>();

  // @description: Обработчик клика по кнопке "Назад"
  // @purpose: Переход к странице приветствия
  const handleBackClick = () => {
    navigate("/");
  };

  // @description: Обработчик отмены
  // @purpose: Переход к странице приветствия
  const handleCancel = () => {
    reset();
    navigate("/");
  };

  // @description: Обработчик успеха
  // @purpose: Дополнительная обработка после успешной отправки
  const handleSuccess = () => {
    // @description: Здесь можно добавить дополнительную логику после успеха
    // @purpose: Например, логирование или обновление состояния приложения
    console.log("Form submission successful");
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

          {/* @description: Компонент формы сообщения */}
          {/* @purpose: Реализация формы с валидацией */}
          <MessageForm
            onSubmit={(data) => messageService.sendMessage(data)}
            isSubmitting={isSubmitting}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default FormPage;
