import { Pen, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface Todo {
  id: string;
  name: string;
  isCompleted: boolean;
  dateAdded: Date;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completeTodoValue, setCompleteTodoValue] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [input, setInput] = useState("");
  const [updatedInput, setUpdatedInput] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("todos");
    if (data) setTodos(JSON.parse(data));
  }, []);

  const addTodo = (input: string) => {
    if (!input || input.trim() === "") {
      alert("Todo name can't be empty");
      return;
    }
    const newValues = [
      ...todos,
      {
        id: crypto.randomUUID(),
        name: input.trim(),
        dateAdded: new Date(Date.now()),
        isCompleted: false,
      },
    ];

    localStorage.setItem("todos", JSON.stringify(newValues));
    setTodos(newValues);
    setInput("");
  };

  const completeTodo = (id: string, value: boolean) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: value } : todo,
    );

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const startEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setUpdatedInput(currentName);
  };

  const upatedTodo = (id: string) => {
    if (!updatedInput || updatedInput.trim() === "") {
      alert("Updated todo name can't be empty");
      return;
    }

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, name: updatedInput } : todo,
    );

    localStorage.setItem("todos", JSON.stringify(updatedInput));
    setTodos(updatedTodos);
    setEditingId(null);
    setUpdatedInput("");
  };

  const deleteTodo = (id: string) => {
    if (confirm("Do you want to delete this todo?")) {
      const newTodos = todos.filter((todo) => todo.id !== id);

      localStorage.setItem("todos", JSON.stringify(newTodos));
      setTodos(newTodos);
    }
  };

  return (
    <div className="w-screen min-h-dvh overflow-y-auto flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold underline">Add Todo</h1>
      <div className="max-w-xl flex items-center justify-between gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="outline p-3 text-sm"
          placeholder="Enter your todo here..."
        />

        <button
          className="bg-sky-300 rounded-md p-3 text-white cursor-pointer"
          onClick={() => addTodo(input)}
        >
          Add todo
        </button>
      </div>

      <h1 className="text-3xl font-bold underline">All Todos</h1>
      <div className="w-3xl py-5 flex flex-col gap-2 px-6">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="w-full border border-neutral-300 p-3 gap-8 flex items-center justify-between"
            >
              <div className="flex items-center h-full gap-2">
                {editingId === todo.id ? (
                  <input
                    type="text"
                    className="font-semibold text-sm"
                    value={updatedInput}
                    onChange={(e) => setUpdatedInput(e.target.value)}
                  />
                ) : (
                  <>
                    <input
                      type="checkbox"
                      onClick={() => completeTodo(todo.id, completeTodoValue)}
                      checked={todo.isCompleted}
                      onChange={() => setCompleteTodoValue((prev) => !prev)}
                    />
                    <h1
                      className={`font-semibold text-sm ${todo.isCompleted && "line-through text-green-500"}`}
                    >
                      {todo.name}
                    </h1>
                  </>
                )}
              </div>

              <div className="flex items-center h-full gap-2">
                {editingId === todo.id ? (
                  <button
                    className="bg-sky-300 rounded-md p-2 flex items-center justify-center gap-2 text-sm text-white cursor-pointer"
                    onClick={() => upatedTodo(todo.id)}
                  >
                    <Pen className="size-3.5 cursor-pointer" />
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-sky-300 rounded-md p-2 flex items-center justify-center gap-2 text-sm text-white cursor-pointer"
                    onClick={() => startEdit(todo.id, todo.name)}
                  >
                    <Pen className="size-3.5 cursor-pointer" />
                    Update
                  </button>
                )}
                <button
                  className="bg-red-300 flex items-center justify-center gap-2 rounded-md p-2 text-sm text-white cursor-pointer"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <TrashIcon className="size-3.5 cursor-pointer" />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="font-semibold">No todos found</p>
        )}
      </div>
    </div>
  );
};

export default App;
