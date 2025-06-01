import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Время, в течение которого данные считаются свежими
      staleTime: 1000 * 60 * 5, // 5 минут
      
      // Время хранения неактивных данных в кэше
      gcTime: 1000 * 60 * 60 * 24, // 24 часа
      
      // Настройки повторных запросов при ошибке
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Выбрасывать ошибки для обработки в ErrorBoundary
      throwOnError: true,
      
      // Обновление данных при фокусе на вкладке
      refetchOnWindowFocus: true,
      
      // Обновление при восстановлении подключения
      refetchOnReconnect: true,
    },
    mutations: {
      // Настройки для мутаций
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      throwOnError: true,
    },
  },
}) 