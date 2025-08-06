import FontAwesome from "react-native-vector-icons/FontAwesome";
import MusicPlayerScreen from "@/components/MusicPlayerPage/MusicPlayerScreen";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";
import getSize from "../components/AdjustSizeByScreenSize";

import TrackItem from "@/components/TrackItem";
import React, { useEffect, useState } from "react";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { LinearGradient } from "expo-linear-gradient";
import AlbumItem from "@/components/AlbumItem";
import ArtistItem from "@/components/ArtistItem";
import { useNavigation } from "expo-router";

const Results = ({ route }) => {
  const { item, content } = route.params;
  const navigation = useNavigation();
  const navigateToAlbumInfoPage = (countryData, colorData) => {
    navigation.navigate("ChartInfo", {
      countryData: countryData,
      colorData: colorData,
    });
  };

  switch (item) {
    case "chart":
      return (
        <ScrollView
          style={([styles.chartList], { overflow: "visible" })}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.container}>
            {content.topTrackByCountryList.map((data, index) => {
              return (
                <View key={data._id}>
                  <Pressable
                    onPress={() =>
                      navigateToAlbumInfoPage(
                        data.countryItem,
                        content.chartColor[index]
                      )
                    }
                  >
                    <View
                      style={[
                        styles.chartItem,
                        { backgroundColor: content.chartColor[index] },
                      ]}
                    >
                      <View
                        style={[
                          styles.chartImage,
                          {
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                          },
                        ]}
                      >
                        <Text style={styles.title}>Top 50</Text>
                        <Text style={styles.region}>{data.countryItem}</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </ScrollView>
      );
    case "trendingAlbum":
      return (
        <ScrollView
          style={([styles.artistList], { overflow: "visible" })}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.container}>
            {content.albumList.map((data) => {
              return (
                <AlbumItem
                  key={data._id}
                  albumData={data}
                  imageWidth={getSize(100, 120, 160)}
                  imageHeight={getSize(100, 120, 160)}
                  style={styles.albumItem}
                />
              );
            })}
          </View>
        </ScrollView>
      );
    case "popularArtists":
      return (
        <ScrollView
          style={[styles.artistList, { overflow: "visible" }]}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.container}>
            {content.artistList.map((data) => {
              return (
                <ArtistItem
                  updateFollowedArtists={content.updateFollowedArtists}
                  followedArtists={content.followedArtists}
                  key={data._id}
                  navigation={navigation}
                  artistData={data}
                  allowFollowButton={true}
                  setFollowedArtists={content.setFollowedArtists}
                  imageWidth={getSize(100, 120, 160)}
                  imageHeight={getSize(100, 120, 160)}
                  displayFollower={false}
                />
              );
            })}
          </View>
        </ScrollView>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap", // Allows wrapping of items
  },
  // charts
  topHeading: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
  heading: {
    fontSize: getSize(20, 30, 40),
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  chartList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  chartItem: {
    height: getSize(100, 120, 160),
    width: getSize(100, 120, 160),
    opacity: 0.5,
    marginTop: getSize(15, 18, 20),
    marginHorizontal: 15,
    borderRadius: 20,
    shadowOpacity: 0.8, // Add shadowOpacity for better control
    elevation: 5,
  },
  title: {
    fontSize: getSize(14, 16, 20),
    color: "white",
    margin: 10,
    fontWeight: "bold",
  },
  region: {
    fontSize: getSize(18, 20, 22),
    color: "white",
    margin: 10,
    maxWidth: getSize(100, 120, 160),
    fontWeight: "bold",
  },
  chartImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    maxWidth: getSize(100, 120, 160),
  },
  subscription: {
    marginRight: 20,
    marginTop: 10,
    maxWidth: getSize(100, 120, 160),
    fontSize: getSize(13, 15, 20),
    color: "gray",
  },
  status: {
    marginRight: 20,
    marginTop: 10,
    color: "gray",
    fontSize: getSize(11, 13, 18),
  },

  // top artists
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

  // albums
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
  albumList: {
    flexDirection: "row",
  },

  title: {
    fontSize: 22,
    color: "black",
    marginTop: 10,
  },
  artist: {
    marginTop: 10,
    color: "gray",
    fontSize: 18,
  },
});

export default Results;
