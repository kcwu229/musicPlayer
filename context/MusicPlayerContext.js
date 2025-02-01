import React, { createContext, useState, useContext } from "react";

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [initialPlayMusic, setInitialPlayMusic] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMinimizedScreen = () => {
    if (initialPlayMusic === false) {
      setInitialPlayMusic(true);
    }
    setIsMinimized((prev) => !prev);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        selectedAlbum,
        setSelectedAlbum,
        initialPlayMusic,
        setInitialPlayMusic,
        isMinimized,
        setIsMinimized,
        handleMinimizedScreen,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);
