import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from "react-native";

const trendingAlbumData = [
  {
    id: 1,
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    image: require("../../assets/images/future_nostalgia.jpeg"),
  },
  {
    id: 2,
    title: "After Hours",
    artist: "The Weeknd",
    image: require("../../assets/images/after_hour.jpeg"),
  },
  {
    id: 3,
    title: "Fine Line",
    artist: "Harry Styles",
    image: require("../../assets/images/fine_line.jpg"),
  },
];

const TrendingAlbumSection = () => (
  <View>
    <View style={styles.topHeading}>
      <Text style={styles.heading}>Trending albums</Text>
      <Pressable onPress={() => console.log("See More")}>
        <Text style={styles.seeAll}>See all</Text>
      </Pressable>
    </View>
    <ScrollView
      style={styles.albumList}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {trendingAlbumData.map((data) => {
        return (
          <View key={data.id} style={styles.albumItem}>
            <Pressable onPress={() => console.log(data.title)}>
              <View style={styles.albumImage}>
                <Image source={data.image} style={styles.albumImage} />
              </View>
            </Pressable>
            <View>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.artist}>{data.artist}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
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
  albumList: {
    flexDirection: "row",
  },
  albumItem: {
    flexDirection: "column",
    margin: 10,
  },
  title: {
    fontSize: 20,
    color: "white",
    shadowColor: "black",
    shadowOffset: "2",
    fontWeight: "bold",
  },
  albumImage: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 22,
    color: "gray",
  },
  artist: {
    marginTop: 10,
    color: "gray",
    fontSize: 18,
  },
});

export default TrendingAlbumSection;
