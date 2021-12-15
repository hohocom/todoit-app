import { useState } from "react";

const colors = [
  { view: "bg-gray-200", data: "#E5E7EB" },
  { view: "bg-pink-200", data: "#FBCFE8" },
  { view: "bg-red-200", data: "#FECACA" },
  { view: "bg-yellow-200", data: "#FDE68A" },
  { view: "bg-yellow-300", data: "#FCD34D" },
  { view: "bg-green-200", data: "#A7F3D0" },
  { view: "bg-blue-200", data: "#BFDBFE" },
  { view: "bg-purple-200", data: "#DDD6FE" },
];

function ThemeColorPicker({ workCreateForm, setWorkCreateForm }) {
  const [colorNumber, setColorNumber] = useState(0);

  const changeColor = (index) => {
    setColorNumber(index);
    setWorkCreateForm({ ...workCreateForm, color: colors[index].data });
  };

  return (
    colors.length > 0 &&
    colors.map((color, index) => {
      return (
        <div
          className="relative"
          key={index}
          onClick={() => changeColor(index)}
        >
          <div
            className={`flex items-center justify-center w-10 h-10 ml-1 rounded-2xl ${color.view} cursor-pointer`}
          ></div>
          {colorNumber === index && (
            <div className="absolute top-0 z-10 flex items-center justify-center w-10 h-10 ml-1 rounded-4xl">
              <i className="fas fa-check text-white mt-1"></i>
            </div>
          )}
        </div>
      );
    })
  );
}

export default ThemeColorPicker;
