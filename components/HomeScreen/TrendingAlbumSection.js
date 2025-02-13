import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions, Platform,
} from "react-native";
import AlbumItem from "@/components/AlbumItem";
import getSize from "../AdjustSizeByScreenSize";

const { height, width } = Dimensions.get("window");

const TrendingAlbumSection = () => {

  const [albumList, setAlbumList] = useState([]);
  useEffect(() => {
    const albumCount = 8;
    const url = Platform.OS === "ios"
        ? process.env.EXPO_PUBLIC_BASE_URL + `album?limit=${albumCount}`
        : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `album?limit=${albumCount}`;

   try {
     const fetchTrendingAlbums = async () => {
     const result = await fetch(url)
       if (result.ok) {
         const data = await result.json();
         setAlbumList(data.data)
       }
     }
     fetchTrendingAlbums();
   }
    catch (err) {
     console.log(err)
    }
  }, [])

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
        {albumList.map((data) => {
          return (
            <Pressable
              key={data._id}
              onPress={() => {
                () => handlePlayMusic(data);
              }}
            >
              <AlbumItem
                albumData={data}
                imageWidth={getSize(100, 150, 200)}
                imageHeight={getSize(100, 150, 200)}
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

export default TrendingAlbumSection;
