import React from "react";

const HotelInfoOptions = ({
  value,
  category,
  categoryMeta,
  decrement,
  increment,
  minValue,
  maxValue,
}) => {
  return (
    <div className="grid place-items-center">
      <label className="text-sm mb-1">
        {category} <small>{categoryMeta}</small>
      </label>
      <div className="px-4 py-1 shadow-md rounded-3xl flex gap-4 text-lg text-pink-500 items-center ">
        <button disabled={value === minValue} onClick={decrement}>
          -
        </button>
        <span>{value}</span>
        <button disabled={value === maxValue} onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
};
6;
export default HotelInfoOptions;
