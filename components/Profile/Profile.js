import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Center,
  Text,
  Skeleton,
  Grid,
  Button,
  Icon,
  Link,
  Image,
} from "@chakra-ui/react";
import { useAuth } from "../../providers/authProvider";
import Avatar, { genConfig } from "react-nice-avatar";
import SavedAlbums from "./SavedAlbums";
import { useRouter } from "next/router";
import ShareButton from "../Album/ShareButton";
import { FaSpotify, FaLastfmSquare } from "react-icons/fa";
import PersonalProfile from "./PersonalProfile";
import OtherProfile from "./OtherProfile";

function Profile() {
  const auth = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const config = {
    sex: "man",
    faceColor: "#AC6651",
    earSize: "big",
    eyeStyle: "smile",
    noseStyle: "long",
    mouthStyle: "smile",
    shirtStyle: "polo",
    glassesStyle: "none",
    hairColor: "#000",
    hairStyle: "thick",
    hatStyle: "none",
    hatColor: "#D2EFF3",
    eyeBrowStyle: "up",
    shirtColor: "#F4D150",
    bgColor: "#FC909F",
  };
  const myConfig = genConfig(config);

  let userID;
  useEffect(() => {
    userID = router.query.pid;
    if (userID) {
      if (auth.user?.user_id === userID) {
        setAuthorized(true);
      }
    }
  }, [router.query]);

  if (authorized) {
    return <PersonalProfile />;
  } else {
    return <OtherProfile />;
  }
}

export default Profile;
