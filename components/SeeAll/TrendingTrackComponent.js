import { View, StyleSheet, ScrollView } from "react-native";
import AlbumItem from "@/components/AlbumItem";
import getSize from "@/components/AdjustSizeByScreenSize";
import LoadingScreen from "@/components/LoadingScreen";
import { useEffect, useState } from "react";

const TrendingTrackComponent = ({ content }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Simulate a loading delay
      await new Promise((resolve) => setTimeout(resolve, 500)); // Adjust time as needed
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (content.albumList.length > 0) {
      setLoading(false);
    }
  }, [content.albumList]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap", // Allows wrapping of items
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

export default TrendingTrackComponent;
