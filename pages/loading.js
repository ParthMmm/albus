import React, { useEffect } from "react";
import ProfileLoaders from "../components/Loaders/ProfileLoaders";
import { useAuth } from "../providers/authProvider";
import { useRouter } from "next/router";

function loading() {
  const auth = useAuth();
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  console.log(auth.user);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [show]);

  if (show) {
    router.push("/");
    return <></>;
  } else {
    return <ProfileLoaders />;
  }
}

export default loading;
