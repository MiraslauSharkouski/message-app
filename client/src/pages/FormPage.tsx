// @description: Страница формы отправки сообщения
// @purpose: Отображение формы для ввода данных пользователя
import React from "react";
import { useNavigate } from "react-router-dom";

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

          {/* Форма будет реализована в следующих шагах */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <div className="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p>Форма будет реализована в следующих шагах</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
