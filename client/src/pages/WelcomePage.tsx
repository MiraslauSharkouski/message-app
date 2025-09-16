// @description: Страница приветствия
// @purpose: Приветствие пользователя и навигация к форме
import React from "react";
import { useNavigate } from "react-router-dom";

// @description: Компонент страницы приветствия
// @purpose: Отображение приветственного сообщения и кнопки перехода
const WelcomePage: React.FC = () => {
  // @description: Хук для программной навигации
  // @purpose: Переход к странице формы по клику на кнопку
  const navigate = useNavigate();

  // @description: Обработчик клика по кнопке "Далее"
  // @purpose: Переход к странице формы
  const handleNextClick = () => {
    navigate("/form");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="card max-w-2xl w-full">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h1 className="page-title">Добро пожаловать в Message App</h1>
            <p className="text-gray-600 text-lg">
              Отправьте нам сообщение и мы обязательно его сохраним!
            </p>
          </div>

          <div className="mb-8">
            <p className="text-gray-700 mb-4">
              Это простое приложение позволяет вам отправлять сообщения, которые
              будут сохранены в нашей базе данных.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-blue-600 font-semibold mb-2">Быстро</div>
                <p className="text-sm text-gray-600">
                  Мгновенная отправка сообщений
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-green-600 font-semibold mb-2">Надежно</div>
                <p className="text-sm text-gray-600">
                  Все сообщения надежно сохраняются
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-purple-600 font-semibold mb-2">Просто</div>
                <p className="text-sm text-gray-600">Интуитивный интерфейс</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleNextClick}
            className="btn btn-primary w-full md:w-auto px-8 py-3 text-lg"
          >
            Далее
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 inline-block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
