import { TodoCardProps } from '@/models/todo';
import { Container, Stack, Checkbox, ButtonGroup, Box, Divider, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

function TodoCard(props: TodoCardProps) {
  const { todo, isEditing, onDone, onDelete, onEdit } = props;

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          justifyContent: 'space-between',
          backgroundColor: isEditing ? 'pink' : 'none',
          textDecoration: todo.done ? 'line-through' : 'none',
        }}
      >
        <Stack direction="row" alignItems="center">
          <Checkbox checked={todo.done} onClick={() => onDone(todo.id)} />
          <Box>{todo.category}</Box>
        </Stack>

        <Box>{todo.text}</Box>
        <ButtonGroup variant="text" aria-label="text button group">
          <Divider orientation="vertical" />
          <Button onClick={() => onDelete(todo.id)}>
            <DeleteForeverIcon />
          </Button>
          <Button onClick={() => onEdit(todo.id)}>
            <EditIcon />
          </Button>
        </ButtonGroup>
      </Stack>
    </Container>
  );
}

export default TodoCard;
