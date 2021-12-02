import React, { useState, useEffect } from "react";

function useAverageRating(data) {
  const [avgRating, setAvgRating] = useState(null);
  let tmp;
  useEffect(() => {
    if (data) {
      tmp = data.map((review) => {
        return review.rating;
      });
      setAvgRating(_.round(_.mean(tmp)));
    }
  }, [data]);

  return avgRating;
}

export default useAverageRating;
