// @description: Основной компонент приложения
// @purpose: Корневой компонент с маршрутизацией
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

// @description: Главный компонент приложения
// @purpose: Обертка для маршрутизации и основной структуры
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* @description: Компонент маршрутов */}
        {/* @purpose: Управление навигацией между страницами */}
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
