import dotenv from "dotenv";
import express from "express";
import { Application } from "express";

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
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    // Пока без маршрутов, добавим позже
    this.app.get("/", (req, res) => {
      res.send("Message App Server is running!");
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const port = parseInt(process.env.PORT || "5000");
const app = new App(port);
app.listen();
