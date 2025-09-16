// @description: Точка входа в приложение
// @purpose: Рендер основного компонента в DOM
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// @description: Создание корневого элемента для рендера
// @purpose: Инициализация React приложения
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
