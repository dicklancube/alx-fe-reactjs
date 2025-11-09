import { useState } from 'react';

function Counter() {
  // Initialize state variable 'count' with default value 0
  const [count, setCount] = useState(0);

  // Component JSX
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
        margin: '20px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        width: '250px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <h2>React Counter</h2>
      <p style={{ fontSize: '20px' }}>Current Count: {count}</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

export default Counter;
