import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
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
  {
    id: 4,
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    image: require("../../assets/images/future_nostalgia.jpeg"),
    viewCount: 20000,
    duration: "3:03",
    likeCount: 20000,
    commentCount: 20000,
  },
  {
    id: 5,
    title: "After Hours",
    artist: "The Weeknd",
    image: require("../../assets/images/after_hour.jpeg"),
    viewCount: 20000,
    duration: "3:03",
    likeCount: 20000,
    commentCount: 20000,
  },
  {
    id: 6,
    title: "Fine Line",
    artist: "Harry Styles",
    image: require("../../assets/images/fine_line.jpg"),
    viewCount: 20000,
    duration: "3:03",
    likeCount: 20000,
    commentCount: 20000,
  },
];

const { height, width } = Dimensions.get("window");

const TrendingAlbumSection = ({ setSelectedAlbum }) => {
  const handlePlayMusic = (data) => {
    setSelectedAlbum(data);
  };
  return (
    <View>
      <View style={styles.topHeading}>
        <Text style={styles.heading}>Trending albums</Text>
        <Pressable onPress={() => console.log("See More")}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>
      <ScrollView
        style={([styles.artistList], { overflow: "visible" })}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {trendingAlbumData.map((data) => {
          return (
            <Pressable
              key={data.id}
              onPress={() => {
                () => handlePlayMusic(data);
              }}
            >
              <AlbumItem
                albumData={data}
                imageWidth={height > 100 && height < 800 ? 100 : 200}
                imageHeight={height > 100 && height < 800 ? 100 : 200}
                setSelectedAlbum={setSelectedAlbum}
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
    fontSize: height > 100 && height < 800 ? 17 : 22,
    fontWeight: "thin",
  },
  heading: {
    fontSize: height > 100 && height < 800 ? 20 : 26,
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

export default TrendingAlbumSection;
