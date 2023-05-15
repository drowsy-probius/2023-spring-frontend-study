import { Container } from '@mui/material';
import Link from 'next/link';

function TodoApp() {
  return (
    <Container>
      <Container>Todo App</Container>
      <Link href="/todo/todos">Todo 목록으로 가기</Link>
    </Container>
  );
}

export default TodoApp;
