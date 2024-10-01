import React from "react";
import LINK from "../store/Link";
export const AuthContext = React.createContext();
import Loader from "../components/Loader";

export const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = React.useState(false);
  const [token, setToken] = React.useState(
    localStorage.getItem("hackathon-token")
  );
  const [user, setUser] = React.useState("");

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    userAuthentication();
    return localStorage.setItem("hackathon-token", serverToken);
  };

  let isLoggedIn = !!token;

  const LogoutUser = () => {
    console.log("Logged Out");
    setToken("");

    return localStorage.removeItem("hackathon-token");
  };

  const userAuthentication = async () => {
    try {
      setLoading(true);
      const response = await fetch(LINK + "api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      if (response.ok) {
        const data = await response.json();
        const userData = data.msg;
        setUser(userData);
        return localStorage.setItem("user", userData.username);
      }
    } catch (err) {
      console.log("Error Fetching User Data");
      setLoading(false);
    }
  };

  React.useEffect(() => {
    userAuthentication();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, storeTokenInLS, LogoutUser, user }}
    >
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = React.useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};

export default useAuth;