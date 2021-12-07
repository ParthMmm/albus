import React from "react";
import axios from "axios";
import userInfoFetch from "../fetch";

async function fetchUserReviews(userID) {
  const { data } = await axios.get(
    `http://localhost:8000/api/fetchUserReviews?userID=${userID}`
  );
  //   const { data } = await axios.get(userInfoFetch + `?userID=${userID}`);

  return data;
}

export default fetchUserReviews;
