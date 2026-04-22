import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useAuth } from "./use-auth";

const useOAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  useEffect(() => {
    const processCallback = async () => {
      // Backend redirect includes ?token=... in URL
      const token = searchParams.get("token");

      if (!token) {
        navigate("/login?error=oauth_failed");
        return;
      }

      try {
        // The backend also sets a cookie, but we can use checkAuth to refresh state
        await checkAuth();
        navigate("/");
      } catch (err) {
        console.error("OAuth process error:", err);
        navigate("/login?error=oauth_failed");
      }
    };

    processCallback();
  }, [searchParams, checkAuth, navigate]);
};

export default useOAuthCallback;
