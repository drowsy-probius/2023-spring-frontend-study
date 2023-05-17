import { useState, useRef } from 'react';
import Link from 'next/link';
import TodoCard from '@/components/todo/TodoCard';
import { TodoCategory, TodoCategories } from '@/models/todo';
import useTodoStore from '@/store/useTodoStore';
import { Input, Container, Stack, Button, Divider } from '@mui/material';

function TodoPage() {
  const { todos, addTodo, deleteTodo, updateTodo } = useTodoStore();
  const [inputText, setInputText] = useState('');
  const [category, setCategory] = useState<TodoCategory>('Medium');
  const [onEditingIndex, setOnEditingIndex] = useState(-1);
  const id = useRef(0);

  const onDelete = (id: number) => {
    const todo = todos.filter(td => td.id === id).pop();
    if (todo === undefined) return;
    deleteTodo(todo);
  };

  const onEdit = (id: number) => {
    const todo = todos.filter(td => td.id === id).pop();
    if (todo === undefined) return;

    setOnEditingIndex(todo.id);
    setInputText(todo.text);
    setCategory(todo.category);
  };

  const onDone = (id: number) => {
    const todo = todos.filter(td => td.id === id).pop();
    if (todo === undefined) return;
    updateTodo({
      ...todo,
      done: !todo.done,
    });
  };

  const addOrUpdateTodo = () => {
    if (inputText.trim().length === 0) return;

    if (onEditingIndex === -1) {
      addTodo({
        id: (id.current = id.current + 1),
        text: inputText,
        done: false,
        category: category,
      });
    } else {
      const todo = todos.filter(td => td.id === onEditingIndex).pop();
      if (todo === undefined) return;
      updateTodo({
        ...todo,
        text: inputText,
        category: category,
        done: false,
      });
    }

    setInputText('');
    setOnEditingIndex(-1);
    setCategory('Medium');
  };

  return (
    <Container>
      <Stack width="100%">
        <Container>
          <Link href="/todo">Todo 홈으로 가기</Link>
        </Container>
        <Container>TODO 목록</Container>
        <Stack direction="row">
          <Input
            sx={{
              width: '80%',
            }}
            placeholder="여기에 항목 입력"
            onChange={event => {
              setInputText(event.target.value ?? '');
            }}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                addOrUpdateTodo();
              }
            }}
            value={inputText}
          />

          {/* <InputLabel id="label">우선순위</InputLabel> */}
          <select
            value={category}
            onChange={event => setCategory(event.target.value as TodoCategory)}
            style={{ width: '10%' }}
          >
            {TodoCategories.map(todoCategory => (
              <option key={todoCategory}>{todoCategory}</option>
            ))}
          </select>

          <Button onClick={addOrUpdateTodo}>추가</Button>
        </Stack>
        <Divider />
        <Container>
          {/* <Box>할일 목록</Box> */}
          <Stack width="100%">
            {todos.map(todo => (
              <TodoCard
                key={todo.id}
                todo={todo}
                isEditing={todo.id === onEditingIndex}
                onDone={onDone}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </Stack>
        </Container>
      </Stack>
    </Container>
  );
}

export default TodoPage;
