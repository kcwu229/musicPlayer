import React, {useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Button,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const { height, width } = Dimensions.get("window");

const formatDuration = (durationInSeconds) => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const formatplayCount = (count) => {
  if (count < 1000) return count.toString();
  if (count >= 1000 && count < 1000000) return (count / 1000).toFixed(1) + "K";
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  return count.toString();
};

const TrackItem = ({
  trackData,
  allowOptionButton = false,
  shownOnResultList = false,
  showViewAndDuration = false,
  imageWidth,
  imageHeight,
  artistFontSize,
  titleFontSize,
  setSelectedAlbum,
}) => {
  const { name, playCount, imageUrl, duration } = trackData;
  const handleOption = () => {
    console.log("handleOption !");
  };
  return (
    <View style={shownOnResultList ? styles.TrackItemOnList : styles.TrackItem}>
      <Pressable
        onPress={() => {
          console.log(name);
          setSelectedAlbum(trackData);
        }}
      >
        <View style={styles.trackImage}>
          <Image
            source={{ uri: imageUrl}}
            style={[
              styles.trackImage,
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
          {trackData.artistId.name}
        </Text>
        <View style={shownOnResultList ? styles.playCountAndDuration : null}>
          {playCount != null && showViewAndDuration ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="play" size={height > 800? 20 :15} style={styles.play} />
              <Text style={styles.playCount}>{formatplayCount(playCount)}</Text>
            </View>
          ) : null}
          {duration != null && showViewAndDuration ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="circle" size={height > 800? 15 : 10} style={styles.circle} />
              <Text style={styles.duration}>{formatDuration(duration)}</Text>
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
    fontSize: height > 800 ? 23 : 10
  },
  playCountAndDuration: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewOnList: {
    marginLeft: height > 800 ? 20 : 10,
    marginTop: 10,
    gap: height > 800 ? 4 : 1
  },
  playCount: {
    color: "grey",
    marginLeft: 8,
    fontSize: height > 800 ? 20 : 15,
  },
  duration: {
    marginLeft: 10,
    fontSize: height > 800 ? 20 : 15,
  },

  TrackItem: {
    flexDirection: "column",
    marginRight: 20,
    marginTop: 100 && height < 800 ? 3 : 8,
  },

  TrackItemOnList: {
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
    paddingVertical: 4,
  },

  name: {
    fontSize: 20,
    margin: 10,
    color: "black",
  },

  title: {
    fontSize: height > 100 && height < 800 ? 14 : 22,
    color: "black",
    marginTop: 10,
  },

  titleOnList: {
    fontSize: height > 800 ? 32: 25,
    color: "black",
  },

  artist: {
    marginTop: 10,
    color: "gray",
    fontSize: height > 100 && height < 800 ? 12 : 18,
  },

  trackImage: {
    marginTop: 10,
    shadowColor: "black",
    shadowOffset: { width: 1, height: -1 },
    shadowRadius: 1,
    shadowOpacity: 0.8, // Add shadowOpacity for better control
    elevation: 5,
  },
});

export default TrackItem;
