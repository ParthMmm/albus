import React from "react";
import axios from "axios";
import { userInfoFetch } from "../fetch";
async function fetchUserInfo(userID) {
  const { data } = await axios.get(userInfoFetch + `?userID=${userID}`);

  // console.log(userInfoFetch);
  //   console.log(data);
  //   const { data } = await axios.get(userInfoFetch + `?userID=${userID}`);

  return data;
}

// async function fetchUserReviews(userID) {
//   const { data } = await axios.get(
//     `http://localhost:8000/api/fetchUserReviews?userID=${userID}`
//   );
//   //   console.log(data);
//   //   const { data } = await axios.get(userInfoFetch + `?userID=${userID}`);

//   return data;
// }

export default fetchUserInfo;
