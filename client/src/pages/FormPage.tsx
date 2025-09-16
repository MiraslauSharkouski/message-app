// @description: Страница формы отправки сообщения
// @purpose: Отображение формы для ввода данных пользователя
import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageForm } from "../components";
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

  // @description: Обработчик клика по кнопке "Назад"
  // @purpose: Переход к странице приветствия
  const handleBackClick = () => {
    navigate("/");
  };

  // @description: Обработчик отмены
  // @purpose: Переход к странице приветствия
  const handleCancel = () => {
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

          {/* @description: Компонент формы сообщения */}
          {/* @purpose: Реализация формы с валидацией */}
          <MessageForm
            onSubmit={async (data: ICreateMessage) => {
              await messageService.sendMessage(data);
            }}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default FormPage;
