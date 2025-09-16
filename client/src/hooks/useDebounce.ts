// @description: Хук для debounce функций
// @purpose: Ограничение частоты вызова функций для оптимизации производительности
// @performance: Предотвращение чрезмерных вызовов функций при частых событиях
import { useCallback, useEffect, useRef, useState } from "react";

// @description: Хук debounce для значений
// @purpose: Откладывание обновления значения до завершения периода бездействия
// @param: value - значение для debounce
// @param: delay - задержка в миллисекундах
// @returns: debouncedValue - значение после задержки
export function useDebounce<T>(value: T, delay: number): T {
  // @description: Состояние для хранения debounced значения
  // @purpose: Хранение значения после применения debounce
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // @description: Установка таймера для обновления значения
    // @purpose: Откладывание обновления до завершения периода бездействия
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // @description: Очистка таймера при изменении значения или размонтировании
    // @purpose: Предотвращение утечек памяти и некорректных обновлений
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// @description: Хук debounce для функций
// @purpose: Откладывание вызова функции до завершения периода бездействия
// @param: func - функция для debounce
// @param: delay - задержка в миллисекундах
// @returns: debounced function - функция с примененным debounce
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T {
  // @description: Ссылка на таймер
  // @purpose: Хранение идентификатора таймера для очистки
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // @description: Memoized функция с debounce
  // @purpose: Создание функции с примененным debounce один раз
  const debouncedFunc = useCallback(
    (...args: Parameters<T>) => {
      // @description: Очистка предыдущего таймера
      // @purpose: Предотвращение преждевременного вызова функции
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // @description: Установка нового таймера
      // @purpose: Откладывание вызова функции
      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay]
  ) as T;

  return debouncedFunc;
}
