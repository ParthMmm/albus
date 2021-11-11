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
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleProfileInfo = async (rawUser) => {
    if (rawProfile) {
      const profile = await formatProfileInfo(rawProfile);

      setProfile(profile);
      setListened(profile.actions.listened);
      setWantToListen(profile.actions.wantToListen);
      setListening(profile.actions.listening);

      setLoading(false);

      return user;
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

  return {
    profile,
    loading,
    error,
    fetchProfileInfo,
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
