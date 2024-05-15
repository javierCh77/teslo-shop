import { Size } from "@/interfaces";
import clsx from "clsx";
import React from "react";

interface Props {
  selectSize?: Size;
  availableSizes: Size[];
  
  onSizeChanged: (size: Size) => void;
}

export const SizeSelector = ({ selectSize, availableSizes, onSizeChanged }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>

      <div className="flex">
        {availableSizes.map((size) => (
          <button
            onClick={()=> onSizeChanged(size)}
            key={size}
            className={clsx("mx-2 hover:underline text-lg", {
              underline: size === selectSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
