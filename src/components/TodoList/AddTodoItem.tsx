import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTypedDispatch, useTypedSelector } from '../../store/store';
import {
  selectTodoExistBefore,
  TodoItem,
  todoItemAdded
} from '../../store/todoSlice';

export default function AddTodoItem() {
  const dispatch = useTypedDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<TodoItem>();

  const todoField = watch('todo');

  const todoItemExistBefore = useTypedSelector((state) =>
    selectTodoExistBefore(state, todoField)
  );

  useEffect(() => {
    if (todoItemExistBefore) {
      setError('todo', {
        types: {
          hasItem: 'Todo Item Already exists'
        }
      });
    } else {
      clearErrors('todo');
    }
  }, [todoItemExistBefore]);

  const onSubmit = (todo: TodoItem) => {
    if (!todoItemExistBefore) {
      dispatch(todoItemAdded(todo));
      reset();
    }
  };

  return (
    <div className="relative">
      <p className="absolute -top-7 text-red-400">
        {errors.todo?.types?.hasItem}
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-2 grid-flow-col grid-cols-[1fr_auto]"
      >
        <input
          {...register('todo', { required: true })}
          placeholder="Please type a todo item"
          defaultValue=""
          required
          className={errors.todo ? 'error' : ''}
        />
        <input
          disabled={todoItemExistBefore || !!!todoField}
          type="submit"
          value="+ Add Todo"
          className="cursor-pointer bg-green-700 border-none text-white disabled:bg-slate-600 disabled:text-slate-400 transition duration-300 ease-in-out"
        />
      </form>
    </div>
  );
}
