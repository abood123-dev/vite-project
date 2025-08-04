import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
interface Todo {
  id: number;
  Name: string;
}

interface TodoState {
  todos: Todo[];
}

const loadFromLocalStorage = (): Todo[] => {
  try {
    const data = localStorage.getItem('todos');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const initialState: TodoState = {
  todos: loadFromLocalStorage(),
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      const newTodo = { id: Math.random(), Name: action.payload };
      state.todos.push(newTodo);
      saveToLocalStorage(state.todos);
    },
    removeTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
      saveToLocalStorage(state.todos);
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
