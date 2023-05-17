// const useBearStore = create(set => ({
//   bears: 0,
//   increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
// }));

import { TodoItem, TodoStore } from '@/models/todo';
import { create } from 'zustand';

const useTodoStore = create<TodoStore>(set => ({
  todos: [],
  addTodo: (todo: TodoItem) => set(state => ({ ...state, todos: [...state.todos, todo] })),
  deleteTodo: (todo: TodoItem) =>
    set(state => ({
      ...state,
      todos: state.todos.filter(td => td.id !== todo.id),
    })),
  updateTodo: (todo: TodoItem) =>
    set(state => ({
      ...state,
      todos: state.todos.map(td => (td.id === todo.id ? todo : td)),
    })),
}));

export default useTodoStore;
