import { MainLayout } from "./shared/layouts/MainLayout";
import { AddTodoForm } from "./features/todo/ui/AddTodoForm";
import { TodoList } from "./features/todo/ui/TodoList";
import { CheckSquare } from "lucide-react";

function App() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-10 px-4">
        <header className="mb-10 text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4 ring-1 ring-primary/20 shadow-sm">
            <CheckSquare className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            TaskFlow Pro
          </h1>
          <p className="text-muted-foreground text-lg">
            Focus on what matters most.
          </p>
        </header>

        <main className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <section className="bg-gradient-to-br from-card to-secondary/30 p-1 rounded-2xl shadow-sm border ring-1 ring-black/5">
            <AddTodoForm />
          </section>

          <section>
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-lg font-semibold text-foreground/80 flex items-center gap-2">
                Your Tasks
              </h2>
            </div>
            <TodoList />
          </section>
        </main>
      </div>
    </MainLayout>
  );
}

export default App;
