import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import AlbumItem from "@/components/AlbumItem";
import { BASE_URL } from "@env";

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

];

const { height, width } = Dimensions.get("window");

const TrendingAlbumSection = ({ setSelectedAlbum }) => {
  const handlePlayMusic = (data) => {
    setSelectedAlbum(data);
  };

  const [albumList, setAlbumList] = useState([]);
  useEffect(() => {
    const albumCount = 8;
    const url = BASE_URL + `album?limit=${albumCount}`;

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
