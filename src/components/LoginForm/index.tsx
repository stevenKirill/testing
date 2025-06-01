import { useState } from 'react';
import AuthService from '../../lib/services/AuthService';
import Alert from '../Alert';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(email, password);
      if (response.success) {
        setSuccess(true);
        setError('');
      }
    } catch (err: unknown) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      {error && <Alert message={error} />}
      {success && <Alert message="Login successful" />}
    </form>
  );
}

export default LoginForm;