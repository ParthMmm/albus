import { useState, useEffect } from "react";
import FastAverageColor from "fast-average-color";

function useAverageColor(img) {
  const [color, setColor] = useState(null);
  const fac = new FastAverageColor();
  useEffect(() => {
    fac
      .getColorAsync(img)
      .then((color) => {
        setColor(color.hex);
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return color;
}

export default useAverageColor;
