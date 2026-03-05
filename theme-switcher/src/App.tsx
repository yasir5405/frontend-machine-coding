import { useTheme } from "./Context/ThemeContext";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  console.log(theme);
  return (
    <div className="font-bold bg-white dark:bg-neutral-400 flex flex-col gap-3 w-full h-dvh">
      Welcome to theme switcher
      <button className="bg-sky-300 p-2 text-white" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

export default App;
