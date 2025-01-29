import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import AlbumItem from "@/components/AlbumItem";

const trendingAlbumData = [
  {
    id: 1,
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    image: require("../../assets/images/future_nostalgia.jpeg"),
    viewCount: 20000,
    duration: "3:03",
    likeCount: 20000,
    commentCount: 20000,
  },
  {
    id: 2,
    title: "After Hours",
    artist: "The Weeknd",
    image: require("../../assets/images/after_hour.jpeg"),
    viewCount: 20000,
    duration: "3:03",
    likeCount: 20000,
    commentCount: 20000,
  },
  {
    id: 3,
    title: "Fine Line",
    artist: "Harry Styles",
    image: require("../../assets/images/fine_line.jpg"),
    viewCount: 20000,
    duration: "3:03",
    likeCount: 20000,
    commentCount: 20000,
  },
];

const TrendingAlbumSection = ({ setSelectedAlbum }) => {
  const handlePlayMusic = (data) => {
    setSelectedAlbum(data);
  };
  return (
    <View>
      <View style={styles.topHeading}>
        <Text style={styles.heading}>Trending albums</Text>
        <Pressable onPress={() => console.log("See All")}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>
      <ScrollView
        style={([styles.albumList], { overflow: "visible" })}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {trendingAlbumData.map((data) => {
          return (
            <Pressable
              key={data.id}
              onPress={() => {
                console.log(`${data.artist - data.title}`);
                handlePlayMusic(data);
              }}
            >
              <AlbumItem
                albumData={data}
                imageWidth={200}
                imageHeight={200}
                style={styles.albumItem}
              />
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

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
    fontSize: 22,
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
    marginTop: 20,
    marginRight: 20,
  },
  albumImage: {
    width: 200,
    height: 200,
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

export default TrendingAlbumSection;
