import dotenv from "dotenv";
import express from "express";
import { Application } from "express";
import routes from "./routes";

// @description: Загрузка переменных окружения из .env файла
// @purpose: Конфигурация приложения через переменные окружения
dotenv.config();

class App {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    // @description: Middleware для парсинга JSON
    // @purpose: Автоматическое преобразование тела запроса в JSON
    this.app.use(express.json());

    // @description: Middleware для парсинга URL-encoded данных
    // @purpose: Поддержка данных формы
    this.app.use(express.urlencoded({ extended: true }));

    // @description: Middleware для CORS (временно для разработки)
    // @purpose: Разрешение запросов с разных доменов
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
  }

  private initializeRoutes(): void {
    // @description: Главная страница API
    // @purpose: Информация о состоянии сервера
    this.app.get("/", (req, res) => {
      res.send("Message App Server is running!");
    });

    // @description: Подключение всех API маршрутов
    // @base_path: /api
    this.app.use("/api", routes);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server is running on port ${this.port}`);
      console.log(`📝 API Documentation:`);
      console.log(`   GET  http://localhost:${this.port}/`);
      console.log(`   POST http://localhost:${this.port}/api/messages`);
      console.log(`   GET  http://localhost:${this.port}/api/messages`);
      console.log(`   GET  http://localhost:${this.port}/api/messages/:id`);
      console.log(`   GET  http://localhost:${this.port}/api/health`);
    });
  }
}

const port = parseInt(process.env.PORT || "5000");
const app = new App(port);
app.listen();
