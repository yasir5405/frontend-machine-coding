import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface IChips {
  name: string;
  id: string;
}

const ChipsInput = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const [chips, setChips] = useState<IChips[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("chips");
    if (stored) setChips(JSON.parse(stored));
  }, []);

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newValue: IChips = {
        id: crypto.randomUUID(),
        name: inputValue.trim(),
      };
      const putValues = [...chips, newValue];
      localStorage.setItem("chips", JSON.stringify(putValues));
      setChips(putValues);
      setInputValue("");
    }
  };

  const handleRemove = (id: string) => {
    const newValues: IChips[] = chips.filter((chip) => chip.id !== id);
    localStorage.setItem("chips", JSON.stringify(newValues));
    setChips(newValues);
  };

  return (
    <div className="flex flex-col gap-5 w-[500px]">
      <h1 className="font-semibold text-2xl underline text-center">
        Chips Inputs
      </h1>

      <input
        type="text"
        className="border outline-0 p-2 rounded-md border-neutral-300 w-full"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        onKeyDown={handleSubmit}
        placeholder="Type a chip and press tag"
      />

      <div className="flex flex-wrap gap-2">
        {chips.map((chip, idx) => (
          <Chip
            key={idx}
            name={chip.name}
            id={chip.id}
            onClick={handleRemove}
          />
        ))}
      </div>
    </div>
  );
};

const Chip = ({
  name,
  id,
  onClick,
}: {
  name: string;
  id: string;
  onClick: (id: string) => void;
}) => {
  return (
    <div className="flex items-center justify-between gap-3 p-4 bg-neutral-200 rounded-full">
      <p className="font-medium text-sm">{name}</p>

      <X className="cursor-pointer text-red-500" onClick={() => onClick(id)} />
    </div>
  );
};

export default ChipsInput;
