import Accordion from "./components/Accordion";

const App = () => {
  return (
    <div className="flex flex-col gap-10 py-10 items-center justify-center">
      <h1 className="text-2xl underline font-bold text-center">
        Mock Interview React Machine Coding Round
      </h1>

      <Accordion />
    </div>
  );
};

export default App;
