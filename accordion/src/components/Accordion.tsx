import { ChevronDown } from "lucide-react";
import { useState } from "react";

const items = [
  {
    title: "JavaScript Basics",
    content: "Learn variables, functions, and loops in JavaScript",
  },
  {
    title: "React.js Overview",
    content: "Understand state, components and props in React.",
  },
  {
    title: "Node.js",
    content: "Basics of server-side development with Node.js",
  },
  {
    title: "Full-Stack Development",
    content: "",
  },
];

const Accordion = () => {
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const handleClick = (idx: number) => {
    if (idx === isOpen) {
      setIsOpen(null);
    } else {
      setIsOpen(idx);
    }
  };

  return (
    <div className="border p-5 w-[500px] rounded-md border-neutral-300 flex flex-col gap-2">
      {items.map(({ content, title }, idx) => (
        <div
          key={idx}
          className="p-4 border rounded-md border-neutral-300 select-none cursor-pointer hover:bg-neutral-200 transition-all duration-150 ease-linear flex justify-between items-center flex-col"
          onClick={() => handleClick(idx)}
        >
          <div className="flex justify-between items-center w-full z-10">
            <h1 className="font-bold text-lg">{title}</h1>
            <ChevronDown
              className={`${
                isOpen === idx ? "rotate-180" : ""
              } transition-all duration-200 ease-linear`}
            />
          </div>

          <div
            className={`z-30 text-sm font-medium w-full h-full mt-2 ${
              isOpen === idx ? "block" : "hidden"
            }`}
          >
            {content.length < 0 || !content ? (
              <p>No items available.</p>
            ) : (
              <p>{content}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
