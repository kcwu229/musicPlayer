import React, { createContext, useState, useContext, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from "react-native";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [followedArtists, setFollowedArtists] = useState([]);
  const [followedAlbums, setFollowedAlbums] = useState([]);
  const [followedTracks, setFollowedTracks] = useState([]);

    const logout = async () => {
        try {
            await AsyncStorage.clear();
            console.log("logout successfully !")
            setUsername("");
            setToken("");
            setUserId("")
        } catch (err) {
            console.error(err);
        }
    };

    const fetchUserData = async (token) => {
        try {
            const fetchUserDataUrl = Platform.OS === "ios"
                ? process.env.EXPO_PUBLIC_BASE_URL + `user/info`
                : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `user/info`;

            if (token.length > 0) {
                const result = await fetch(fetchUserDataUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (result.ok) {
                    const data = await result.json();
                    setFollowedAlbums(data.data.likeAlbumId);
                    setFollowedTracks(data.data.likeTrackId);
                    setFollowedArtists(data.data.followArtistId);
                }
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const updateFollowedArtists = (updatedArtists) => {
       setFollowedArtists(updatedArtists);
    };

    const updateFollowedTracks = (updatedTracks) => {
        console.log(updatedTracks.length)
        setFollowedTracks(updatedTracks);
    };

    const updateFollowedAlbums = (updatedAlbums) => {
        setFollowedAlbums(updatedAlbums);
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
              if (token.length > 0 ) fetchUserData(token);
          }
          catch(err){
              console.log(err)
          }
      }
      getData();
      fetchUserData(token);
  }, [userId, token])


    return (
    <UserContext.Provider
      value={{
       setToken,
          token,
          userId,
          setUserId,
          username,
          setUsername,
          followedArtists,
          followedAlbums,
          followedTracks,
          logout,
          fetchUserData,
          updateFollowedArtists,
          updateFollowedTracks,
          updateFollowedAlbums,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
