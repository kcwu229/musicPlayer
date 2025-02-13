import React, {useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {useNavigation} from "@react-navigation/native";
import getSize from "./AdjustSizeByScreenSize";
const { height, width } = Dimensions.get("window");
const AlbumItem = ({
  albumData,
  allowOptionButton = false,
  shownOnResultList = false,
  showViewAndDuration = false,
  imageWidth,
  imageHeight,
  artistFontSize,
  titleFontSize,
}) => {
  const { name, viewCount, imageUrl, duration } = albumData;
  const handleOption = () => {
    console.log("handleOption !");
  };

  const navigation = useNavigation();
  const navigateToAlbumInfoPage = (selectedAlbumData) => {
    navigation.navigate("AlbumInfo", {
      albumData: { selectedAlbumData },
    });
  };

  return (
    <View style={shownOnResultList ? styles.albumItemOnList : styles.albumItem}>
      <Pressable
        onPress={() => {
          navigateToAlbumInfoPage(albumData);
        }}
      >
        <View style={styles.albumImage}>
          <Image
            source={{ uri: imageUrl}}
            style={[
              styles.albumImage,
              {
                width: imageWidth,
                height: imageHeight,
                borderRadius: 20,
                shadowColor: "black",
                shadowOffset: { width: 1, height: -1 },
                shadowRadius: 1,
              },
            ]}
          />
        </View>
      </Pressable>
      <View style={shownOnResultList ? styles.viewOnList : null}>
        <Text
          style={
            shownOnResultList
              ? styles.titleOnList
              : titleFontSize > 0
              ? { fontSize: titleFontSize, marginTop: 10, fontWeight: "bold" }
              : styles.title
          }
        >
          {name.length > 10 ? name.substring(0, 10) : name}
        </Text>
        <Text
          style={
            shownOnResultList
              ? styles.artistOnList
              : artistFontSize > 0
              ? { fontSize: artistFontSize, marginTop: 10, color: "gray" }
              : styles.artist
          }
        >
          {albumData.artistId.name}
        </Text>
        <View style={shownOnResultList ? styles.viewCountAndDuration : null}>
          {viewCount != null && showViewAndDuration ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="play" size={15} style={styles.play} />
              <Text style={styles.viewCount}>{viewCount}</Text>
            </View>
          ) : null}
          {duration != null && showViewAndDuration ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="circle" size={6} style={styles.circle} />
              <Text style={styles.duration}>{duration}</Text>
            </View>
          ) : null}
        </View>
      </View>
      {shownOnResultList ? <View style={{ flexGrow: 3 }}></View> : null}
      {shownOnResultList ? (
        <Pressable onPress={handleOption}>
          <FontAwesome name="ellipsis-h" size={20} />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    marginLeft: 10,
    color: "blue",
  },
  artistOnList: {
    marginVertical: 3,
    color: "grey",
  },
  viewCountAndDuration: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewOnList: {
    marginLeft: 10,
    marginTop: 10,
  },
  viewCount: {
    color: "grey",
    marginLeft: 8,
    fontSize: 15,
  },
  duration: {
    marginLeft: 10,
  },

  albumItem: {
    flexDirection: "column",
    marginRight: 20,
    marginTop: 100 && height < 800 ? 3 : 8,
  },

  albumItemOnList: {
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
    paddingVertical: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: StyleSheet.hairlineWidth,
  },

  name: {
    fontSize: getSize(15, 20,25),
    margin: 10,
    color: "black",
  },

  title: {
    fontSize: getSize(15, 20,25),
    color: "black",
    marginTop: 10,
  },

  titleOnList: {
    fontSize: 18,
    color: "black",
  },

  artist: {
    marginTop: 10,
    color: "gray",
    fontSize: getSize(12, 16,20),
  },

  albumImage: {
    marginTop: 10,
    shadowColor: "black",
    shadowOffset: { width: 1, height: -1 },
    shadowRadius: 1,
    shadowOpacity: 0.8, // Add shadowOpacity for better control
    elevation: 5,
  },
});

export default AlbumItem;
