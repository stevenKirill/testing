import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './index';

describe('Counter Component', () => {
  it('должен корректно увеличивать и уменьшать значение при клике', async () => {
    // Создаем экземпляр userEvent
    const user = userEvent.setup();
    
    // Рендерим компонент
    render(<Counter />);
    
    // Получаем элементы
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    const countValue = screen.getByTestId('count-value');
    
    // Проверяем начальное значение
    expect(countValue).toHaveTextContent('0');
    
    // Кликаем на кнопку увеличения
    await user.click(incrementButton);
    expect(countValue).toHaveTextContent('1');
    
    // Кликаем на кнопку увеличения ещё раз
    await user.click(incrementButton);
    expect(countValue).toHaveTextContent('2');
    
    // Кликаем на кнопку уменьшения
    await user.click(decrementButton);
    expect(countValue).toHaveTextContent('1');
  });

  it('должен корректно работать при быстрых последовательных кликах', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    const countValue = screen.getByTestId('count-value');
    
    // Быстрое нажатие три раза
    await user.tripleClick(incrementButton);
    expect(countValue).toHaveTextContent('3');
  });
}); 