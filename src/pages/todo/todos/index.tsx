import { Input, Container, Stack, Box, Button, Checkbox, ButtonGroup, Divider } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

interface Todo {
  id: number;
  text: string;
  done: boolean;
  isOnEditing: boolean;
}

interface TodoItemProps extends Todo {
  onDoneClidk: (id: number) => void;
  onDeleteClick: (id: number) => void;
  onEditClick: (id: number) => void;
}
function TodoItem({
  id,
  text,
  done,
  isOnEditing,
  onDoneClidk: onDone,
  onDeleteClick: onDelete,
  onEditClick: onEdit,
}: TodoItemProps) {
  return (
    <Container>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          backgroundColor: isOnEditing ? 'pink' : 'none',
        }}
      >
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
        <ButtonGroup variant="text" aria-label="text button group">
          <Divider orientation="vertical" />
          <Button onClick={() => onDelete(id)}>
            <DeleteForeverIcon />
          </Button>
          <Button onClick={() => onEdit(id)}>
            <EditIcon />
          </Button>
        </ButtonGroup>
      </Stack>
    </Container>
  );
}

function TodoPage() {
  const [todos, _setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const id = useRef(0);
  const onEditId = useRef(-1);
  const inputArea = useRef<HTMLInputElement>(null);

  const setTodos = (nextTodos: Todo[]) => {
    _setTodos(nextTodos);
    window.localStorage.setItem('todo', JSON.stringify(nextTodos));
  };

  const addTodo = () => {
    if (inputText.length === 0) return;

    const nextTodos: Todo[] =
      onEditId.current !== -1
        ? todos.map(todo =>
            todo.id === onEditId.current ? { ...todo, text: inputText, done: false, isOnEditing: false } : todo
          )
        : [
            ...todos,
            {
              id: (id.current = id.current + 1),
              text: inputText,
              done: false,
              isOnEditing: false,
            },
          ];

    setTodos(nextTodos);
    setInputText('');

    onEditId.current = -1;
    if (inputArea.current) inputArea.current.value = '';
  };

  const onDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const onDoneTodo = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };

  const onEditTodo = (id: number) => {
    if (!inputArea.current) return;
    const target = todos.filter(todo => todo.id === id).pop();
    if (target === undefined) return;

    setTodos(todos.map(todo => (todo.id === target.id ? { ...todo, isOnEditing: true } : todo)));

    setInputText(target.text);
    onEditId.current = id;
    inputArea.current.value = target.text;
  };

  useEffect(() => {
    const localTodos = JSON.parse(window.localStorage.getItem('todo') ?? '[]') as TodoItemProps[];
    id.current = localTodos.length > 0 ? localTodos.at(-1)?.id ?? 0 : 0;
    setTodos(localTodos);
  }, []);

  return (
    <Container>
      <Stack width="100%">
        <Container>TODO 목록</Container>
        <Container>
          <Input
            sx={{
              width: '90%',
            }}
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
        <Divider />
        <Container>
          {/* <Box>할일 목록</Box> */}
          <Stack width="100%">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                text={todo.text}
                done={todo.done}
                isOnEditing={todo.isOnEditing}
                id={todo.id}
                onDoneClidk={onDoneTodo}
                onDeleteClick={onDeleteTodo}
                onEditClick={onEditTodo}
              />
            ))}
          </Stack>
        </Container>
      </Stack>
    </Container>
  );
}

export default TodoPage;
