import React, {useEffect, useState} from "react";
import {View, Pressable, StyleSheet, Dimensions, Platform} from "react-native";
import ArtistItem from "@/components/ArtistItem";
import getSize from "@/components/AdjustSizeByScreenSize";
import {useUserContext} from "@/context/UserContext";

const {height} = Dimensions.get("window")
const GenreResultPage = ({ setSelectedTrack, navigation, route }) => {

  const {genreItem} = route.params;
  const genreId = genreItem._id;
  const {token, userId} = useUserContext();
  const navigateToArtistInfoPage = (selectedArtistData) => {
    navigation.navigate("ArtistInfo", {
      artistData: { selectedArtistData },
    });
  };

  const [artistList, setArtistList] = useState([]);

  useEffect(() => {


    try {
      const fetchResultArtist = async (genreId) => {
        try {
          const url = Platform.OS === "ios"
              ? process.env.EXPO_PUBLIC_BASE_URL + `artist/genre/${genreId}`
              : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `artist/genre/${genreId}`
          const result = await fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = await result.json();
          setArtistList(data.data);
          console.log(data.data)

        } catch (err) {
          console.log(err)
        }
      }
      fetchResultArtist(genreId);
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
    backgroundColor: "white"
  },
});

export default GenreResultPage;
