import { QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import LoginForm from './components/LoginForm';
import { queryClient } from './lib/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginForm />
    </QueryClientProvider>
  )
}

export default App
