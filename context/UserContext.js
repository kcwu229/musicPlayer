import React, { createContext, useState, useContext, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

    const logout = async () => {
        try {
            await AsyncStorage.clear();
            console.log("logout successfully !")
            setUsername("");
            setToken("");
        } catch (err) {
            console.error(err);
        }
    };

  useEffect(() => {
      const getData = async () => {
          try {
              const accessToken = await AsyncStorage.getItem("@accessToken");
              const username = await AsyncStorage.getItem("@username");
              const userId = await AsyncStorage.getItem("@userId");
              if (accessToken !== null) {
                  setToken(accessToken)
                  setUsername(username)
                  setUserId(userId)
              }
          }
          catch(err){
              console.log(err)
          }
      }
      getData();
  }, [])

  return (
    <UserContext.Provider
      value={{
       setToken,
          token,
          userId,
          setUserId,
          username,
          setUsername,
          logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
