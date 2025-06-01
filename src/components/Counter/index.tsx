import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>
        Counter: <span data-testid="count-value">{count}</span>
      </h2>
      <button
        onClick={() => setCount((prev) => prev + 1)}
        aria-label="Increment"
      >
        +
      </button>
      <button
        onClick={() => setCount((prev) => prev - 1)}
        aria-label="Decrement"
      >
        -
      </button>
    </div>
  );
};

export default Counter;
