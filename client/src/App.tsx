// @description: Основной компонент приложения
// @purpose: Корневой компонент с маршрутизацией
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// @description: Главная страница приложения
// @purpose: Приветствие пользователя и навигация
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/"
            element={
              <div className="container py-12">
                <div className="card text-center">
                  <h1 className="page-title">Welcome to Message App</h1>
                  <p className="text-gray-600 mb-6">
                    Send your messages and we'll save them for you!
                  </p>
                  <div className="flex justify-center gap-4">
                    <button className="btn btn-primary">Get Started</button>
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="/form"
            element={
              <div className="container py-12">
                <div className="card">
                  <h1 className="page-title">Send Message</h1>
                  <p className="text-gray-600 mb-6">
                    Fill out the form below to send your message
                  </p>
                  {/* Форма будет добавлена позже */}
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
