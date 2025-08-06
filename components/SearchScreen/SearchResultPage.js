import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  Platform,
  FlatList,
  Text,
} from "react-native";
import ArtistItem from "@/components/ArtistItem";
import { useFocusEffect } from "@react-navigation/native";
import AlbumItem from "@/components/AlbumItem";
import TrackItem from "@/components/TrackItem";
import getSize from "@/components/AdjustSizeByScreenSize";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { useUserContext } from "@/context/UserContext";

const { height } = Dimensions.get("window");

const SearchResultPage = ({ navigation, searchKeyWord }) => {
  const handleArtist = () => {};

  const {
    selectedTrack,
    setSelectedTrack,
    isMinimized,
    handleMinimizedScreen,
    isPlaying,
    setIsPlaying,
    setTrackUrl,
    handlePlayTrack,
  } = useMusicPlayer();

  const {
    username,
    token,
    userId,
    logout,
    fetchUserData,
    followedArtists,
    updateFollowedArtists,
    setFollowedArtists,
  } = useUserContext();
  const navigateToArtistInfoPage = (selectedArtistData) => {
    navigation.navigate("ArtistInfo", {
      artistData: { selectedArtistData },
    });
  };

  const [albumList, setAlbumList] = useState([]);
  const [artistList, setArtistList] = useState([]);
  const [trackList, setTrackList] = useState([]);

  const handlePlayMusic = (data) => {
    setIsPlaying(!isPlaying);
    setSelectedTrack(data);
    setTrackUrl(data.soundTrackUrl);
    handlePlayTrack(data.soundTrackUrl);
  };

  const fetchData = (
    albumCount = null,
    trackCount = null,
    artistCount = null
  ) => {
    const getAlbumListUrl =
      Platform.OS === "ios"
        ? process.env.EXPO_PUBLIC_BASE_URL +
          `album` +
          (albumCount !== null ? `?limit=${albumCount}` : ``)
        : process.env.EXPO_PUBLIC_ANDROID_BASE_URL +
          `album` +
          (albumCount ? `?limit=${albumCount}` : ``);

    const getArtistListUrl =
      Platform.OS === "ios"
        ? process.env.EXPO_PUBLIC_BASE_URL +
          `artist` +
          (artistCount !== null ? `?limit=${artistCount}` : ``)
        : process.env.EXPO_PUBLIC_ANDROID_BASE_URL +
          `artist` +
          (artistCount ? `?limit=${artistCount}` : ``);

    const getTrackListUrl =
      Platform.OS === "ios"
        ? process.env.EXPO_PUBLIC_BASE_URL +
          `track` +
          (trackCount !== null ? `?limit=${trackCount}` : ``)
        : process.env.EXPO_PUBLIC_ANDROID_BASE_URL +
          `track` +
          (trackCount ? `?limit=${trackCount}` : ``);

    try {
      const fetchResultArtists = async () => {
        try {
          const result = await fetch(getArtistListUrl);
          const data = await result.json();
          setArtistList(data.data);
        } catch (err) {
          console.log(err);
        }
      };

      const fetchResultTracks = async () => {
        try {
          const result = await fetch(getTrackListUrl);
          const data = await result.json();
          setTrackList(data.data);
        } catch (err) {
          console.log(err);
        }
      };

      const fetchResultAlbums = async () => {
        try {
          const result = await fetch(getAlbumListUrl);
          const data = await result.json();
          setAlbumList(data.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchResultTracks();
      fetchResultArtists();
      fetchResultAlbums();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(8, 8, 8);
  }, []);

  return (
    <View style={styles.container}>
      {artistList &&
        artistList
          .filter((artist) =>
            artist.name.toLowerCase().includes(searchKeyWord.toLowerCase())
          )
          .map((artist) => (
            <Pressable
              key={artist._id}
              onPress={() => navigateToArtistInfoPage(artist)}
            >
              <ArtistItem
                artistData={artist}
                imageWidth={getSize(60, 70, 100)}
                imageHeight={getSize(60, 70, 100)}
                shownOnResultList={true}
                allowFollowButton={true}
                setFollowedArtists={setFollowedArtists}
                followedArtists={followedArtists}
                updateFollowedArtists={updateFollowedArtists}
                displayFollower={true}
                navigation={navigation}
              />
            </Pressable>
          ))}

      {albumList &&
        albumList
          .filter((album) =>
            album.name.toLowerCase().includes(searchKeyWord.toLowerCase())
          )
          .map((album) => (
            <AlbumItem
              key={album._id}
              albumData={album}
              imageWidth={getSize(60, 70, 100)}
              imageHeight={getSize(60, 70, 100)}
              shownOnResultList={true}
              setSelectedTrack={setSelectedTrack}
              showViewAndDuration={true}
            />
          ))}

      {trackList && (
        <>
          <FlatList
            data={trackList.filter((track) =>
              track.name.toLowerCase().includes(searchKeyWord.toLowerCase())
            )}
            style={{ backgroundColor: "white" }}
            renderItem={({ item, index }) => (
              <Pressable onPress={() => handlePlayMusic(item)}>
                <View>
                  <TrackItem
                    trackData={item}
                    selectedTrack={selectedTrack}
                    imageWidth={getSize(60, 70, 100)}
                    imageHeight={getSize(60, 70, 100)}
                    shownOnResultList={true}
                    showViewAndDuration={true}
                    setSelectedTrack={selectedTrack}
                  />
                </View>
              </Pressable>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
  },
});

export default SearchResultPage;
