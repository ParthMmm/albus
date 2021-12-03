import React from "react";
import axios from "axios";
import {
  addListenedPost,
  addListeningPost,
  addWantToListenPost,
} from "../fetch";

function addListened(data, token) {
  return axios
    .post(`${addListenedPost}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.json());
}

function addWantToListen(data, token) {
  return axios
    .post(`${addWantToListenPost}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.json());
}

function addListening(data, token) {
  return axios
    .post(`${addListeningPost}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.json());
}

export default { addListened, addWantToListen, addListening };
