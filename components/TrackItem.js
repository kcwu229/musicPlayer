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
import getSize from "./AdjustSizeByScreenSize";
import {useMusicPlayer} from "@/context/MusicPlayerContext";
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
    selectedTrack,
  titleFontSize,
  setSelectedTrack,
}) => {

  const {
    isPlaying,
    setIsPlaying,
    handlePlayTrack,
  } = useMusicPlayer();

  const { name, playCount, imageUrl, duration } = trackData;

  const handlePlaying = (data) => {
    isPlaying === true ? console.log("now play") : console.log("paused !");
    setIsPlaying(!isPlaying);
    setSelectedTrack(data);
    handlePlayTrack(data.soundTrackUrl);
  }

  const handleOption = () => {
    console.log("handleOption !");
  };
  return (
    <View style={shownOnResultList ? styles.TrackItemOnList : styles.TrackItem}>
      <Pressable
        onPress={() => {
          handlePlaying(trackData);
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
        { (selectedTrack !== null) && (selectedTrack.name === name) ?
            (<View style={styles.isPlayingShield}>
              <Text style={{ color: "grey", textAlign: "center", fontSize: height * 0.02, fontWeight: "bold" }}>Now playing</Text>
            </View>)
            : null}
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
              <FontAwesome name="play" size={getSize(15, 18,20)} style={styles.play} />
              <Text style={styles.playCount}>{formatplayCount(playCount)}</Text>
            </View>
          ) : null}
          {duration != null && showViewAndDuration ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="circle" size={getSize(10, 12,15)} style={styles.circle} />
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
  isPlayingShield: {
    position: "absolute",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.76)",
    borderRadius: 20,
  },
  circle: {
    marginLeft: 10,
    color: "blue",
  },
  artistOnList: {
    marginVertical: 3,
    color: "grey",
    fontSize: getSize(10, 15,23),
  },
  playCountAndDuration: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewOnList: {
    marginLeft: getSize(10, 15,20),
    marginTop: 10,
    gap: getSize(1, 2,4),
  },
  playCount: {
    color: "grey",
    marginLeft: 8,
    fontSize: getSize(15, 18,20),
  },
  duration: {
    marginLeft: 10,
    fontSize: getSize(15, 18,20),
  },

  TrackItem: {
    flexDirection: "column",
    marginRight: 20,
    marginTop: getSize(3, 5,8),
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
    fontSize: getSize(14, 14,22),
    color: "black",
    marginTop: 10,
  },

  titleOnList: {
    fontSize: getSize(25, 21,32),
    color: "black",
  },

  artist: {
    marginTop: 10,
    color: "gray",
    fontSize: getSize(12, 14,18),
  },

  trackImage: {
    position: "relative",

    shadowColor: "black",
    shadowOffset: { width: 1, height: -1 },
    shadowRadius: 1,
    shadowOpacity: 0.8, // Add shadowOpacity for better control
    elevation: 5,
  },
});

export default TrackItem;
