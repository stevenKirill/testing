import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useUser } from '../useUser'
import axios from 'axios'

// Мокаем axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('useUser', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )

  beforeEach(() => {
    queryClient.clear()
    jest.clearAllMocks()
  })

  it('успешно получает данные пользователя', async () => {
    const mockUser = {
      id: 1,
      name: 'Иван Иванов',
      email: 'ivan@example.com',
    }

    mockedAxios.get.mockResolvedValueOnce({ data: mockUser })

    const { result } = renderHook(() => useUser(1), { wrapper })

    // Проверяем начальное состояние загрузки
    expect(result.current.isLoading).toBe(true)

    // Ждем завершения запроса
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Проверяем полученные данные
    expect(result.current.data).toEqual(mockUser)
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.example.com/users/1')
  })

  it('обрабатывает ошибку при неудачном запросе', async () => {
    const error = new Error('Ошибка загрузки')
    mockedAxios.get.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useUser(1), { wrapper })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toBeDefined()
  })

  it('не делает запрос, если userId не предоставлен', () => {
    const { result } = renderHook(() => useUser(0), { wrapper })

    expect(result.current.isLoading).toBe(false)
    expect(mockedAxios.get).not.toHaveBeenCalled()
  })
})

// В тесте мы видим использование @testing-library/react и тестирование хука useUser
// Мы мокаем внешние зависимости (axios)
// Тестируем взаимодействие нескольких компонентов:
// React Query (QueryClient, QueryClientProvider)
// Наш кастомный хук useUser
// Сетевой слой (axios)
// Проверяем полный flow работы хука: от загрузки до получения данных
// Ответ: Это интеграционный тест, потому что:
// Мы тестируем взаимодействие нескольких модулей системы (хук + React Query + сетевой слой)
// Проверяем полный жизненный цикл работы хука
// Тестируем реальную интеграцию с React Query, хотя и с замоканным axios
// Если бы это был юнит-тест, мы бы:
// Тестировали только логику самого хука в изоляции
// Замокали бы React Query
// Фокусировались бы на тестировании отдельных функций/методов, а не на их взаимодействии
// Хотя мы и используем моки для axios (что характерно для юнит-тестов), основной фокус теста на проверке правильной интеграции различных частей системы, что делает его интеграционным.
