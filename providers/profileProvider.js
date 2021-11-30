import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const profile = useProvideProfile();

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}

function useProvideProfile() {
  const [profileInfo, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [listened, setListened] = useState(null);
  const [wantToListen, setWantToListen] = useState(null);
  const [listening, setListening] = useState(null);
  const [reviews, setReviews] = useState(null);

  const handleProfileInfo = async (rawProfile) => {
    if (rawProfile) {
      const profile = await formatProfileInfo(rawProfile);

      setProfile(profile);
      setListened(profile.actions.listened);
      setWantToListen(profile.actions.wantToListen);
      setListening(profile.actions.listening);

      setLoading(false);

      return profile;
    }
    return;
  };

  const fetchProfileInfo = async (data) => {
    setLoading(true);
    const userID = { userID: data };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/fetchUserInfo`,
      userID
    );
    if (res.status === 200) {
      handleProfileInfo(res.data);
      setLoading(false);

      return;
    } else {
      setLoading(false);
    }
  };

  const fetchUserReviews = async (userID) => {
    setLoading(true);

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/fetchUserReviews?id=${userID}`
    );

    if (res.status === 200) {
      setReviews(res.data);
      setLoading(false);
      return;
    }
    setLoading(false);
    return;
  };

  return {
    profileInfo,
    loading,
    error,
    reviews,
    fetchProfileInfo,
    fetchUserReviews,
  };
}

const formatProfileInfo = async (data) => {
  return {
    user_id: data._id,
    username: data.username,
    actions: {
      listened: data.listened,
      wantToListen: data.wantToListen,
      listening: data.listening,
    },
    info: {
      genre: data.info.genre,
      artist: data.info.artist,
      album: data.info.album,
      spotify: data.info.spotify,
      lastfm: data.info.lastfm,
    },
  };
};
