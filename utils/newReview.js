import useSWR from "swr";
import { fetchAlbumReviews } from "./fetch";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";
import { useAuth } from "../providers/authProvider";
function newReview(data, token) {
  //   const auth = useAuth();
  return axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/user/createReview`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export default newReview;
