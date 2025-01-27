import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Button,
} from "react-native";

import ArtistItem from "@/components/ArtistItem";

const artistData = [
  {
    id: 1,
    name: "Ariana Grande",
    image: require("../../assets/images/ariana_grande.png"),
  },
  {
    id: 2,
    name: "Beyoncé",
    image: require("../../assets/images/beyonce.jpeg"),
  },
  {
    id: 3,
    name: "Ed Sheeran",
    image: require("../../assets/images/ed_sheeran.jpeg"),
  },
];

const PopularArtistSection = () => (
  <View>
    <View style={styles.topHeading}>
      <Text style={styles.heading}>Popular artists</Text>
      <Pressable onPress={() => console.log("See More")}>
        <Text style={styles.seeAll}>See all</Text>
      </Pressable>
    </View>
    <ScrollView
      style={styles.artistList}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {artistData.map((data) => {
        return (
          <ArtistItem
            key={data.id}
            artistData={data}
            allowFollowButton={true}
            imageWidth={180}
            imageHeight={180}
          />
        );
      })}
    </ScrollView>
  </View>
);

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
    fontSize: 16,
    fontWeight: "thin",
  },
  heading: {
    fontSize: 26,
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
