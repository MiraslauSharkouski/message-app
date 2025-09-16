// @description: Компонент маршрутизации приложения
// @purpose: Централизованное управление маршрутами
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import FormPage from "../pages/FormPage";

// @description: Компонент маршрутов приложения
// @purpose: Определение всех доступных маршрутов
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* @description: Маршрут главной страницы */}
      {/* @purpose: Отображение страницы приветствия */}
      <Route path="/" element={<WelcomePage />} />

      {/* @description: Маршрут страницы формы */}
      {/* @purpose: Отображение формы отправки сообщения */}
      <Route path="/form" element={<FormPage />} />

      {/* @description: Перенаправление несуществующих маршрутов */}
      {/* @purpose: Перенаправление на главную страницу */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
