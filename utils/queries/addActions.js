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

async function updateInfo(data, token) {
  const { res } = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/user/updateInfo`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  console.log(res);

  return;
}

export { addListened, addWantToListen, addListening, checkAction, updateInfo };
