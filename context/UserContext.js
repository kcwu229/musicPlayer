import React, { createContext, useState, useContext} from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");


  return (
    <UserContext.Provider
      value={{
       setToken,
          token,
          userId,
          setUserId,
          username,
          setUsername
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
