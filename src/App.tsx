import { QueryClientProvider } from '@tanstack/react-query';
import LoginForm from './components/LoginForm';
import { queryClient } from './lib/queryClient';
import Counter from './components/Counter';
import './App.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginForm />
      <Counter />
    </QueryClientProvider>
  );
};

export default App;
