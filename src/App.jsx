import { MainLayout } from "./components/layout/MainLayout";
import { AddTodoForm } from "./features/todos/AddTodoForm";
import { TodoList } from "./features/todos/TodoList";

function App() {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <AddTodoForm />
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground/80">
            Your Tasks
          </h2>
          <TodoList />
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
