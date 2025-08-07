import { View, StyleSheet, ScrollView } from "react-native";
import getSize from "@/components/AdjustSizeByScreenSize";

const TopArtistComponent = ({ content }) => {
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
});

export default TopArtistComponent;
