import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
}) => {
  const { setIsClicked, initialState } = useStateContext();
  return (
    <button
      type="button"
      onClick={() => setIsClicked(initialState)}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded"
    >
      {icon} {text}
    </button>
  );
};

export default Button;
