import { createContext, useContext, useState } from "react";

const MusicPlayerContext = createContext();

const MusicPlayerComponent = () => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  return (
    <MusicPlayerContext.Provider
      value={{
        isPlayingMusic,
        selectedAlbum,
        setIsPlayingMusic,
        setSelectedAlbum,
      }}
    ></MusicPlayerContext.Provider>
  );
};

export default MusicPlayerContext;
