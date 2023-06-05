import { useRef } from 'react';

export default function App() {
  const count = useRef(0);
  setInterval(() => {
    count.current += 1;
  }, 1000);

  console.log('Render App');

  return (
    <div>
      app
      <Child1 count={count.current} />
    </div>
  );
}

function Child1({ count }: { count: number }) {
  console.log('Render child1');

  return <div>child1: {count}</div>;
}
