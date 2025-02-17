import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import { Audio } from 'expo-av';
const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);
    const [previousTrackUrl, setPreviousTrackUrl] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackUrl, setTrackUrl] = useState("");
  const [trackDuration, setTrackDuration] = useState(0);
  const [trackCurrentDuration, setTrackCurrentDuration] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState( 0);
  const [sound, setSound] = useState(null);
    const intervalRef = useRef(null);
    const [initialPlay, setInitialPlay] = useState(true);

    useEffect(() => {
    }, []);

  const handleMinimizedScreen = () => {
    setIsMinimized((prev) => !prev);
  };

    const enableAudio = async () => {
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: false,
            shouldDuckAndroid: false,
        })}


  const handlePlayTrack = async (trackUrl) => {
      try {
          // Unload the current sound if it is playing
          enableAudio();
          if (sound) {
              await sound.unloadAsync();
          }

          // Load the new track
          const { sound: newSound } = await Audio.Sound.createAsync(
              { uri: trackUrl },
              { shouldPlay: true }
          );
          const totalDuration = await newSound.getStatusAsync();
          setSound(newSound);

          // Initial play of the track
          if (previousTrackUrl !== trackUrl) {
              console.log("initial play music");
              setInitialPlay(false);
              clearInterval(intervalRef.current);
              setTrackCurrentDuration(0);
              setPreviousTrackUrl(trackUrl);
              setIsPlaying(true);
              const startTime = Date.now();
              await newSound.playAsync();
              intervalRef.current = setInterval(async () => {
                  let elapsedTime = Date.now() - startTime;
                  setTrackCurrentDuration(elapsedTime);
                  if (elapsedTime >= totalDuration.durationMillis) {
                      console.log("sound ended");
                      setIsPlaying(false);
                      await newSound.stopAsync();
                      elapsedTime = 0;
                      setInitialPlay(true);
                      clearInterval(intervalRef.current);
                  }
              }, 100);
          }

          else if (previousTrackUrl === trackUrl && initialPlay === true) {
              console.log("initial play music");
              setInitialPlay(false);
              clearInterval(intervalRef.current);
              setTrackCurrentDuration(0);
              setPreviousTrackUrl(trackUrl);
              setIsPlaying(true);
              const startTime = Date.now();
              await newSound.playAsync();
              intervalRef.current = setInterval(async () => {
                  let elapsedTime = Date.now() - startTime;
                  setTrackCurrentDuration(elapsedTime);
                  if (elapsedTime >= totalDuration.durationMillis) {
                      console.log("sound ended");
                      setIsPlaying(false);
                      await newSound.stopAsync();
                      elapsedTime = 0;
                      setInitialPlay(true);
                      clearInterval(intervalRef.current);
                  }
              }, 100);
          }
          // Pause the track if it is currently playing
          else if (previousTrackUrl === trackUrl && isPlaying === true && initialPlay === false) {
              console.log("pause music");
              setIsPlaying(false);
              await newSound.pauseAsync();
              clearInterval(intervalRef.current);
              const elapsedTime = Date.now() - (Date.now() - trackCurrentDuration);
              setTrackCurrentDuration(elapsedTime);
          }
          // Resume the track if it is currently paused
          else if (previousTrackUrl === trackUrl && isPlaying === false && initialPlay === false) {
              console.log("resume music");
              setIsPlaying(true);
              await newSound.playFromPositionAsync(trackCurrentDuration);
              const startTime = Date.now();
              intervalRef.current = setInterval( async () => {
                  let elapsedTime = Date.now() - startTime + trackCurrentDuration;
                  setTrackCurrentDuration(elapsedTime);
                  if (elapsedTime >= totalDuration.durationMillis) {
                      setIsPlaying(false);
                      await newSound.stopAsync();
                      elapsedTime = 0;
                      setInitialPlay(true);
                      clearInterval(intervalRef.current);
                  }
              }, 100);
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
            setLikeCount,
          trackDuration,
          trackCurrentDuration,
          setTrackCurrentDuration
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);
