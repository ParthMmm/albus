import { useState, useEffect } from "react";
import FastAverageColor from "fast-average-color";
import validator from "validator";

function useAverageColor(img) {
  const [color, setColor] = useState(null);
  const fac = new FastAverageColor();

  useEffect(() => {
    if (img) {
      if (validator.isURL(img)) {
        fac
          .getColorAsync(img)
          .then((color) => {
            setColor(color.hex);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [img]);
  return color;
}

export default useAverageColor;
