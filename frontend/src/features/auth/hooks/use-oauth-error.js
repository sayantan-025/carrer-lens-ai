import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";

const ERROR_MAP = {
  google_denied: "Login cancelled.",
  github_denied: "Login cancelled.",
  github_no_email: "Email missing on GitHub. Add it and try again.",
  email_exists: (provider) => `Account exists. Use email to login.`,
  google_failed: "Login failed. Try again.",
  github_failed: "Login failed. Try again.",
  account_suspended: "Account suspended.",
  server_error: "Error. Try again.",
  oauth_failed: "Login failed. Try again.",
};

/**
 * Custom hook to read and handle OAuth errors from URL query params
 */
export const useOAuthError = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [oauthError, setOauthError] = useState("");

  const clearOAuthError = useCallback(() => {
    setOauthError("");
  }, []);

  useEffect(() => {
    const errorKey = searchParams.get("error");
    const provider = searchParams.get("provider");

    if (errorKey) {
      let message = ERROR_MAP[errorKey] || "Login failed. Try again.";
      
      if (typeof message === "function") {
        message = message(provider);
      }

      setOauthError(message);

      // Clear the error from URL without refreshing
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("error");
      newParams.delete("provider");
      setSearchParams(newParams, { replace: true });

      // Auto-dismiss after 6 seconds
      const timer = setTimeout(() => {
        setOauthError("");
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [searchParams, setSearchParams]);

  return {
    oauthError,
    clearOAuthError,
  };
};
