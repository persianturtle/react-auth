import { useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setAuthenticatedStatus] = useState(false);
  const [isLoading, setLoadingStatus] = useState(true);

  if (isLoading) {
    fetch("/api/auth/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(({ isAuthenticated }) => {
        setAuthenticatedStatus(isAuthenticated);
        setLoadingStatus(false);
      });
  }

  return {
    isAuthenticated,
    isLoading,
  };
};

export default useAuth;
