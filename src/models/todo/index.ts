export const TodoCategories = ['Highest', 'High', 'Medium', 'Low', 'Lowest'] as const;
export type TodoCategory = (typeof TodoCategories)[number];

export interface TodoItem {
  id: number;
  text: string;
  category: TodoCategory;
  done: boolean;
}

export interface TodoCardProps {
  todo: TodoItem;
  isEditing: boolean;
  onDone: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export interface TodoStore {
  todos: TodoItem[];
  addTodo: (todo: TodoItem) => void;
  deleteTodo: (todo: TodoItem) => void;
  updateTodo: (todo: TodoItem) => void;
}
