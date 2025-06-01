import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../lib/api/axios'

interface User {
  id: number
  name: string
  email: string
}

export const fetchUser = async (userId: number): Promise<User> => {
  const { data } = await apiClient.get(`/user/${userId}`)
  return data
}

export const useUser = (userId: number) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  })
} 