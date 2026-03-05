import { createContext, useContext, useEffect, useState } from "react";
import type { Todo } from "../App";

type TodoContextType = {
  todos: Todo[];
  addTodo: (name: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
};

const TodoContext = createContext<TodoContextType | null>(null);

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchedTodos = localStorage.getItem("todos");

    if (fetchedTodos) {
      setTodos(JSON.parse(fetchedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (name: string) => {
    const newTodo: Todo = {
      date: new Date(Date.now()),
      id: crypto.randomUUID(),
      isCompleted: false,
      name: name,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo: Todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };
  return (
    <TodoContext.Provider value={{ addTodo, todos, deleteTodo, toggleTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
export const useTodo = () => {
  const ctx = useContext(TodoContext);

  if (!ctx) {
    throw new Error("useTodo must be used within TodoProvider");
  }

  return ctx;
};
