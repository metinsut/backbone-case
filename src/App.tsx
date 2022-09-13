import Header from './components/Header';
import TodoList from './components/TodoList/TodoList';

function App() {
  return (
    <>
      <Header />
      <main className="grid mt-10">
        <TodoList />
      </main>
    </>
  );
}

export default App;
