import React, { createContext, useState, useContext, useEffect } from "react";
import { Audio } from 'expo-av';

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);
    const [previousTrackUrl, setPreviousTrackUrl] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackUrl, setTrackUrl] = useState("");
  const [trackDuration, setTrackDuration] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
    }, [trackUrl]);

  const handleMinimizedScreen = () => {
    setIsMinimized((prev) => !prev);
  };

  const handlePlayTrack = async (trackUrl) => {
        try {
            // load the track and ready to play
            let { sound } = await Audio.Sound.createAsync(
                { uri: trackUrl },
                { shouldPlay: false }
            );

            // if this is initial play music, then play the music
            if (previousTrackUrl !== trackUrl) {
                console.log("initial play music");
                await sound.stopAsync();
                setPreviousTrackUrl(trackUrl);
                setIsPlaying(true);
                await sound.playAsync();
            }

            else if (previousTrackUrl === selectedTrackUrl && isPlaying === false) {
                console.log("resume music");
                setIsPlaying(true);
                await sound.playAsync()
            }

        } catch (error) {
            console.error("Error playing audio", error);
        }
    };




  return (
    <MusicPlayerContext.Provider
      value={{
        selectedTrack,
        setSelectedTrack,
        isMinimized,
        setIsMinimized,
        handleMinimizedScreen,
        isPlaying,
        setIsPlaying,
          setTrackUrl,
          setTrackDuration,
          previousTrackUrl,
          setPreviousTrackUrl,
          handlePlayTrack,
          commentCount,
          setCommentCount,
          likeCount,
            setLikeCount
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);
