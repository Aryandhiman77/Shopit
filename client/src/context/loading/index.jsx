import React from "react";
import { Outlet, useNavigation } from "react-router-dom";

const Loading = () => {
  const navigation = useNavigation();
  if (navigation.state === "loading" || navigation.state === "submitting") {
    return <p>Loading..</p>;
  } else {
    <Outlet />;
  }
};

export default Loading;
