// `musicPlayer/context/FollowContext.js`
import React, { createContext, useState, useContext } from 'react';

const FollowContext = createContext();

export const FollowProvider = ({ children }) => {
    const [followedArtists, setFollowedArtists] = useState([]);

    const toggleFollow = (artistId) => {
        setFollowedArtists((prev) =>
            prev.includes(artistId)
                ? prev.filter((id) => id !== artistId)
                : [...prev, artistId]
        );
    };

    return (
        <FollowContext.Provider value={{ followedArtists, toggleFollow }}>
            {children}
        </FollowContext.Provider>
    );
};

export const useFollowContext = () => useContext(FollowContext);