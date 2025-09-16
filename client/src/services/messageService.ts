// @description: Сервис для работы с API сообщений
// @purpose: Централизованная логика взаимодействия с сервером
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  AxiosError,
} from "axios";

// @description: Интерфейс для данных сообщения
// @purpose: Типизация данных сообщения
export interface IMessage {
  id?: number;
  name: string;
  phone: string;
  message: string;
  created_at?: string;
}

// @description: Интерфейс для создания сообщения
// @purpose: Типизация данных для отправки на сервер
export interface ICreateMessage {
  name: string;
  phone: string;
  message: string;
}

// @description: Интерфейс для ответа API
// @purpose: Типизация успешного ответа от сервера
export interface IApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  count?: number;
}

// @description: Интерфейс для ошибки API
// @purpose: Типизация ошибочного ответа от сервера
export interface IApiError {
  success: boolean;
  message: string;
  errors?: string[];
}

// @description: Конфигурация axios инстанса
// @purpose: Базовая настройка для всех запросов
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// @description: Создание axios инстанса с базовой конфигурацией
// @purpose: Централизованная настройка HTTP клиента
const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// @description: Интерсептор запросов
// @purpose: Добавление заголовков и логирование
apiClient.interceptors.request.use(
  (config) => {
    console.log("API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// @description: Интерсептор ответов
// @purpose: Обработка ответов и ошибок
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("API Response:", response.status, response.data);
    return response;
  },
  (error: AxiosError) => {
    console.error(
      "API Response Error:",
      error.response?.status,
      error.response?.data
    );
    return Promise.reject(error);
  }
);

// @description: Класс сервиса сообщений
// @purpose: Централизованная логика работы с сообщениями
class MessageService {
  // @description: Отправка сообщения на сервер
  // @purpose: Создание нового сообщения в системе
  // @param: messageData - данные сообщения для отправки
  // @returns: Promise<IMessage> - созданное сообщение
  public async sendMessage(messageData: ICreateMessage): Promise<IMessage> {
    try {
      const response: AxiosResponse<IApiResponse<IMessage>> =
        await apiClient.post("/messages", messageData);

      // @description: Проверка успешности ответа
      // @purpose: Обработка различных сценариев ответа
      if (response.data.success) {
        return response.data.data!;
      } else {
        throw new Error(response.data.message || "Failed to send message");
      }
    } catch (error) {
      // @description: Обработка ошибок axios
      // @purpose: Преобразование ошибок в понятный формат
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<IApiError>;

        if (axiosError.response?.data?.errors) {
          throw new Error(axiosError.response.data.errors.join(", "));
        }

        if (axiosError.response?.data?.message) {
          throw new Error(axiosError.response.data.message);
        }

        if (axiosError.response?.status === 400) {
          throw new Error("Некорректные данные формы");
        }

        if (axiosError.response?.status === 500) {
          throw new Error("Внутренняя ошибка сервера");
        }
      }

      // @description: Обработка сетевых ошибок
      // @purpose: Пользовательская обработка ошибок подключения
      if (error instanceof Error) {
        if (error.message.includes("timeout")) {
          throw new Error("Превышено время ожидания ответа от сервера");
        }
        if (error.message.includes("Network Error")) {
          throw new Error(
            "Ошибка подключения к серверу. Проверьте соединение."
          );
        }
        throw error;
      }

      throw new Error("Неизвестная ошибка при отправке сообщения");
    }
  }

  // @description: Получение всех сообщений
  // @purpose: Получение списка всех сообщений (для административных целей)
  // @returns: Promise<IMessage[]> - массив сообщений
  public async getAllMessages(): Promise<IMessage[]> {
    try {
      const response: AxiosResponse<IApiResponse<IMessage[]>> =
        await apiClient.get("/messages");

      if (response.data.success) {
        return response.data.data || [];
      } else {
        throw new Error(response.data.message || "Failed to fetch messages");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<IApiError>;

        if (axiosError.response?.status === 404) {
          return [];
        }

        if (axiosError.response?.data?.message) {
          throw new Error(axiosError.response.data.message);
        }
      }

      throw new Error("Неизвестная ошибка при получении сообщений");
    }
  }

  // @description: Получение сообщения по ID
  // @purpose: Получение конкретного сообщения по идентификатору
  // @param: id - идентификатор сообщения
  // @returns: Promise<IMessage> - найденное сообщение
  public async getMessageById(id: number): Promise<IMessage> {
    try {
      const response: AxiosResponse<IApiResponse<IMessage>> =
        await apiClient.get(`/messages/${id}`);

      if (response.data.success) {
        return response.data.data!;
      } else {
        throw new Error(response.data.message || "Message not found");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<IApiError>;

        if (axiosError.response?.status === 404) {
          throw new Error("Сообщение не найдено");
        }

        if (axiosError.response?.data?.message) {
          throw new Error(axiosError.response.data.message);
        }
      }

      throw new Error("Неизвестная ошибка при получении сообщения");
    }
  }
}

// @description: Экземпляр сервиса сообщений
// @purpose: Использование в компонентах и хуках
export const messageService = new MessageService();

// @description: Экспорт типов для использования в других модулях
// @purpose: Упрощение импорта типов
export default MessageService;
