import React from "react";
import useOAuthCallback from "../hooks/use-oauth-callback";

const OAuthCallback = () => {
  useOAuthCallback();

  return (
    <div>
      <h1>Authenticating...</h1>
      <p>Please wait while we set up your session</p>
    </div>
  );
};

export default OAuthCallback;
