import { TodoCategories } from '@/models/todo';
import useTodoStore from '@/store/useTodoStore';
import { Container, Box } from '@mui/material';
import Link from 'next/link';

function TodoApp() {
  const { todos } = useTodoStore();

  return (
    <Container>
      <Container>Todo App</Container>
      <Link href="/todo/todos">Todo 목록으로 가기</Link>
      <Container>
        <Container>
          <Box>전체 Todo 갯수: {todos.length}</Box>
        </Container>
        <Container>
          <Box>카테고리별 Todo 갯수</Box>
          {TodoCategories.map(todoCategory => (
            <Box>
              {todoCategory}: {todos.filter(td => td.category === todoCategory).length}개
            </Box>
          ))}
        </Container>
      </Container>
    </Container>
  );
}

export default TodoApp;
