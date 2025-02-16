import React, {useEffect, useState} from "react";
import {View, Pressable, StyleSheet, Dimensions, Platform} from "react-native";
import ArtistItem from "@/components/ArtistItem";
import AlbumItem from "@/components/AlbumItem";
import TrackItem from "@/components/TrackItem";
import getSize from "../AdjustSizeByScreenSize";

const {height} = Dimensions.get("window")

const SearchResultPage = ({ setSelectedTrack, navigation }) => {
  const handleArtist = () => {
    console.log(`Artist`);
  };

  const navigateToArtistInfoPage = (selectedArtistData) => {
    navigation.navigate("ArtistInfo", {
      artistData: { selectedArtistData },
    });
  };

  const [albumList, setAlbumList] = useState([]);
  const [artistList, setArtistList] = useState([]);
  const [trackList, setTrackList] = useState([]);

  useEffect(() => {
    const albumCount = 8;
    const getAlbumListUrl = Platform.OS === "ios"
        ? process.env.EXPO_PUBLIC_BASE_URL + `album?limit=${albumCount}`
        : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `album?limit=${albumCount}`

    const artistCount = 8;
    const getArtistListUrl = Platform.OS === "ios"
        ? process.env.EXPO_PUBLIC_BASE_URL + `artist?limit=${artistCount}`
        : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `artist?limit=${artistCount}`

    const trackCount = 8;
    const getTrackListUrl = Platform.OS === "ios"
        ? process.env.EXPO_PUBLIC_BASE_URL + `track?limit=${trackCount}`
        : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `track?limit=${trackCount}`

    try {
      const fetchResultArtist = async () => {
        try {
          const result = await fetch(getArtistListUrl);
          const data = await result.json();
          setArtistList(data.data);

        } catch (err) {
          console.log(err)
        }
      }


        const fetchResultTrack = async () => {
          try {
            const result = await fetch(getTrackListUrl);
            const data = await result.json();
            setTrackList(data.data);

          } catch (err) {
            console.log(err)
          }
        }

      const fetchResultAlbums = async () => {
        try {
          const result = await fetch(getAlbumListUrl);
          const data = await result.json();
          setAlbumList(data.data);

        } catch (err) {
          console.log(err)
        }
      }
      fetchResultTrack();
      fetchResultArtist();
      fetchResultAlbums();
    }

    catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <View style={styles.container}>
      {artistList &&
          artistList.map((artist) => (
          <Pressable key={artist._id} onPress={() => navigateToArtistInfoPage(artist)}>
            <ArtistItem
              artistData={artist}
              imageWidth={getSize(60, 70, 100)}
              imageHeight={getSize(60, 70, 100)}
              shownOnResultList={true}
              allowFollowButton={true}
              displayFollower={true}
            />
          </Pressable>
        ))}

      {albumList &&
        albumList.map((album) => (
            <AlbumItem key={album._id}
                       albumData={album}
              imageWidth={getSize(60, 70, 100)}
              imageHeight={getSize(60, 70, 100)}
              shownOnResultList={true}
              setSelectedTrack={setSelectedTrack}
              showViewAndDuration={true}
            />
        ))}

      {/*. Need to fix
      {trackList &&
          trackList.map((track) => (
              <Pressable key={track._id} onPress={() => setSelectedTrack(track)}>
                <TrackItem
                    albumData={track}
                    imageWidth={height > 800 ? 100: 60}
                    imageHeight={height > 800 ? 100: 60}
                    shownOnResultList={true}
                    setSelectedTrack={setSelectedTrack}
                    showViewAndDuration={true}
                />
              </Pressable>
          ))}

          */}

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
