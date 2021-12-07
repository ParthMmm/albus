import axios from "axios";
import { userReviewFetch } from "../fetch";

async function fetchUserReviews(userID) {
  const { data } = await axios.get(userReviewFetch + `?userID=${userID}`);
  //   const { data } = await axios.get(userInfoFetch + `?userID=${userID}`);

  return data;
}

export default fetchUserReviews;
