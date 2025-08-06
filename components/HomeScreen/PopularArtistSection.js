import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  Platform,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import getSize from "../AdjustSizeByScreenSize";
import { useUserContext } from "@/context/UserContext";

import ArtistItem from "@/components/ArtistItem";

const { height, width } = Dimensions.get("window");

const PopularArtistSection = ({ navigation }) => {
  const [artistList, setArtistList] = useState([]);
  const { followedArtists, updateFollowedArtists, setFollowedArtists } =
    useUserContext();
  const artistsLimit = 8;

  useEffect(() => {
    const fetchArtistList = async () => {
      const url =
        Platform.OS === "ios"
          ? process.env.EXPO_PUBLIC_BASE_URL + `artist`
          : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `artist`;

      try {
        const result = await fetch(url);
        const data = await result.json();
        setArtistList(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchArtistList();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      updateFollowedArtists: () => {}, // Define how to update followed artists here
    });
  }, [navigation]);

  const navigateToShowAllResults = () => {
    navigation.navigate("Results", {
      item: "popularArtists",
      content: {
        artistList: artistList,
        updateFollowedArtists: updateFollowedArtists,
        followedArtists: followedArtists,
        setFollowedArtists: setFollowedArtists,
      },
    });
  };

  return (
    <View>
      <View style={styles.topHeading}>
        <Text style={styles.heading}>Popular artists</Text>
        <Pressable onPress={() => navigateToShowAllResults()}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>
      <ScrollView
        style={[styles.artistList, { overflow: "visible" }]}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {artistList.slice(0, artistsLimit).map((data) => {
          return (
            <ArtistItem
              updateFollowedArtists={updateFollowedArtists}
              followedArtists={followedArtists}
              key={data._id}
              navigation={navigation}
              artistData={data}
              allowFollowButton={true}
              setFollowedArtists={setFollowedArtists}
              imageWidth={getSize(100, 120, 160)}
              imageHeight={getSize(100, 120, 160)}
              displayFollower={false}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  followBtn: {
    backgroundColor: "black",
    borderRadius: 20,
  },
  image: {
    borderRadius: 100,
    width: 180,
    height: 180,
    backgroundColor: "black",
  },
  topHeading: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
  seeAll: {
    color: "gray",
    marginTop: 10,
    fontSize: getSize(17, 20, 22),
    fontWeight: "thin",
  },
  heading: {
    fontSize: getSize(20, 30, 40),
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  artistList: {
    flexDirection: "row",
  },
  artistItem: {
    flexDirection: "column",
    marginRight: 20,
    marginTop: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    margin: 10,
    color: "black",
  },
  description: {
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    width: "auto",
  },
});

export default PopularArtistSection;
