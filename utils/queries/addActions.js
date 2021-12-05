import React from "react";
import axios from "axios";
import {
  addListenedPost,
  addListeningPost,
  addWantToListenPost,
  checkActionsFetch,
} from "../fetch";

function addListened(data, token) {
  // console.log(data, token);
  const { res } = axios.post(`${addListenedPost}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // console.log(res);

  return res;
}

function addWantToListen(data, token) {
  const { res } = axios.post(`${addWantToListenPost}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // console.log(res);
  return res;
}

function addListening(data, token) {
  const { res } = axios.post(`${addListeningPost}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // console.log(res);
  return res;
}

function checkAction(id, token) {
  return axios
    .get(checkActionsFetch + `?mbid=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

  // return data;
}

export { addListened, addWantToListen, addListening, checkAction };
