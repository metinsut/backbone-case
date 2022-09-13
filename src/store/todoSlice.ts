import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { formatISO } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export interface TodoItem {
  id: string;
  todo: string;
  createdTime: string;
}

export interface TodoListState {
  todoItems: TodoItem[];
}

const initialState: TodoListState = {
  todoItems: []
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    todoItemAdded: (state, action: PayloadAction<TodoItem>) => {
      const todo = action.payload;
      todo.id = uuidv4();
      todo.createdTime = formatISO(new Date());
      state.todoItems.push(todo);
      state.todoItems.sort((a, b) => {
        const date1 = new Date(a.createdTime);
        const date2 = new Date(b.createdTime);
        return date2 > date1 ? 1 : -1;
      });
    },
    todoItemDeleted: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const newTodoItems = state.todoItems.filter((item) => item.id !== id);
      state.todoItems = newTodoItems;
    }
  }
});

export const { todoItemAdded, todoItemDeleted } = todoSlice.actions;

export const selectTodoItems = (state: RootState) => state.todoSlice.todoItems;
export const selectTodoExistBefore = (state: RootState, todo: string) =>
  state.todoSlice.todoItems.some((item) => item.todo === todo);

export default todoSlice.reducer;
