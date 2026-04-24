import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useAuth } from "./use-auth";

const useOAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  useEffect(() => {
    const processCallback = async () => {
      // Backend redirect no longer includes ?token=... for security
      // checkAuth() will call /api/auth/refresh-token which uses the httpOnly cookie
      try {
        await checkAuth();
        navigate("/");
      } catch (err) {
        console.error("OAuth process error:", err);
        navigate("/login?error=oauth_failed");
      }
    };

    processCallback();
  }, [checkAuth, navigate]);
};

export default useOAuthCallback;
