import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface User {
  id: number
  name: string
  email: string
}

const fetchUser = async (userId: number): Promise<User> => {
  const { data } = await axios.get(`https://api.example.com/users/${userId}`)
  return data
}

export const useUser = (userId: number) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  })
} 