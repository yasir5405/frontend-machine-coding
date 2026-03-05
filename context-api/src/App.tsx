import { useState } from "react";
import { useTodo } from "./context/TodoContext";

export type Todo = {
  id: string;
  name: string;
  isCompleted: boolean;
  date: Date;
};

const App = () => {
  const [input, setInput] = useState<string | "">("");

  const { addTodo, todos } = useTodo();
  return (
    <div className="w-full h-dvh flex items-center flex-col gap-4 justify-center">
      <form
        className="flex items-center justify-center gap-2"
        onSubmit={() => addTodo(input)}
      >
        <input
          type="text"
          className="border border-neutral-500 bg-transparent p-3 focus:border-neutral-500 focus:outline-neutral-500"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />

        <button
          className="p-2 bg-sky-300 text-white rounded-md cursor-pointer"
          type="submit"
        >
          Add Todo
        </button>
      </form>

      <div className="w-lg border border-black p-2 rounded-md">
        <ul className="list-disc list-inside">
          {todos.length > 0 ? (
            todos.map((todo) => <li key={todo.id}>{todo.name}</li>)
          ) : (
            <p>No todos</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;
