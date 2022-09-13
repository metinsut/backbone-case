import AddTodoItem from './AddTodoItem';
import TodoItems from './TodoItems';

export default function TodoList() {
  return (
    <div className="grid w-80 sm:w-[600px] sm:p-8 p-4 pt-8 gap-4 justify-self-center">
      <AddTodoItem />
      <TodoItems />
    </div>
  );
}
