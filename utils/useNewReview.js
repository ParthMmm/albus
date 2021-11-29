import { useState, useEffect } from "react";

function useNewReview(flag) {
  const [newReview, setNewReview] = useState(false);

  useEffect(() => {
    setNewReview(flag);
  }, [flag]);
  return newReview;
}

export default useNewReview;
