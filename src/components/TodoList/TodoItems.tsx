import { useTypedDispatch, useTypedSelector } from '../../store/store';
import { selectTodoItems, todoItemDeleted } from '../../store/todoSlice';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

export default function TodoItems() {
  const dispatch = useTypedDispatch();
  const todoItems = useTypedSelector(selectTodoItems);

  const handleDeleteTodoItem = (id: string) => {
    dispatch(todoItemDeleted(id));
  };

  return (
    <div className="grid gap-2">
      <AnimatePresence mode="popLayout">
        {todoItems.map((todo) => (
          <motion.div
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="grid grid-flow-col gap-4 py-2 px-4 rounded-md bg-white items-center justify-between"
            key={todo.id}
          >
            <div className="grid gap-1">
              <p className="text-xl truncate">{todo.todo}</p>
              <span className="text-xs truncate">
                {format(new Date(todo.createdTime), 'd MMM yyyy HH:mm')}
              </span>
            </div>
            <button
              className="bg-rose-500 px-2 py-1 rounded-md text-white"
              onClick={() => handleDeleteTodoItem(todo.id)}
            >
              Delete
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
