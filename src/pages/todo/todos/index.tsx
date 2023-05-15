import { Input, Container, Stack, Box, Button, Checkbox } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

interface TodoItemProps extends Todo {
  onDone: (id: number) => void;
  onDelete: (id: number) => void;
}
function TodoItem({ id, text, done, onDone, onDelete }: TodoItemProps) {
  return (
    <Container>
      <Stack direction="row">
        <Checkbox checked={done} onClick={() => onDone(id)} />
        <Box
          sx={
            done
              ? {
                  textDecoration: 'line-through',
                }
              : {}
          }
        >
          {text}
        </Box>
        <Button onClick={() => onDelete(id)}>
          <DeleteForeverIcon />
        </Button>
      </Stack>
    </Container>
  );
}

function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const id = useRef(0);
  const inputArea = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    if (inputText.length === 0) return;

    const nextTodos = [
      ...todos,
      {
        id: id.current + 1,
        text: inputText,
        done: false,
      },
    ];

    setTodos(nextTodos);
    setInputText('');

    id.current = id.current + 1;
    window.localStorage.setItem('todo', JSON.stringify(nextTodos));
    if (inputArea.current) inputArea.current.value = '';
  };

  const onDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const onDoneTodo = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };

  useEffect(() => {
    console.log(window.localStorage);

    const localTodos = JSON.parse(window.localStorage.getItem('todo') ?? '[]') as TodoItemProps[];
    id.current = localTodos.length > 0 ? localTodos.at(-1)?.id ?? 0 : 0;
    setTodos(localTodos);
  }, []);

  return (
    <Container>
      <Stack>
        <Container>TODO 목록</Container>
        <Container>
          <Input
            ref={inputArea}
            placeholder="여기에 항목 입력"
            onChange={event => {
              setInputText(event.target.value ?? '');
            }}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                addTodo();
              }
            }}
            value={inputText}
          />
          <Button onClick={addTodo}>추가</Button>
        </Container>
        <Container>
          <Box>할일 목록</Box>
          <Stack>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                text={todo.text}
                done={todo.done}
                id={todo.id}
                onDone={onDoneTodo}
                onDelete={onDeleteTodo}
              />
            ))}
          </Stack>
        </Container>
      </Stack>
    </Container>
  );
}

export default TodoPage;
