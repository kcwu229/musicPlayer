import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useState } from "react";
import AntDesign from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

exports.MinimizedMusicPlayerHeader = ({ albumData }) => {
  const { title, artist, image } = albumData;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleShare = () => {
    console.log("share !");
  };

  const handleMoreOption = () => {
    console.log("more option !");
  };

  const handleRandomPlaying = () => {
    console.log("random playing");
  };

  const handleNextSong = () => {
    console.log("Next song ");
  };

  const handlePreviousSong = () => {
    console.log("previous song");
  };

  const handleCollapse = () => {
    if (isMinimized === true) {
      console.log("expand !");
      setIsMinimized(!isMinimized);
    } else {
      console.log("collapse");
      setIsMinimized(!isMinimized);
    }
  };

  const handleLike = () => {
    if (isLiked === true) {
      console.log("unlike");
      setisLiked(!isLiked);
      setLikeCount(likeCount - 1);
    } else {
      console.log("like !");
      setisLiked(!isLiked);
      setLikeCount(likeCount + 1);
    }
  };

  const handlePlaying = () => {
    isPlaying === true ? console.log("now play") : console.log("paused !");
    setIsPlaying(!isPlaying);
  };

  return (
    <Pressable onPress={handleCollapse}>
      <View style={styles.minimizedTopBanner}>
        <Image source={image} style={styles.minimizedImage} />
        <Text style={styles.minimizedTitle}>{title.toUpperCase()}</Text>
        <View style={styles.space}></View>
        {isPlaying ? (
          <Pressable onPress={handlePlaying}>
            <FontAwesome name="play" size={22} style={styles.btnColor} />
          </Pressable>
        ) : (
          <Pressable onPress={handlePlaying}>
            <FontAwesome name="pause" size={22} style={styles.btnColor} />
          </Pressable>
        )}
        <Pressable onPress={handleNextSong}>
          <FontAwesome name="step-forward" size={22} style={styles.btnColor} />
        </Pressable>
      </View>
    </Pressable>
  );
};

exports.FullScreenMusicPlayerHeader = () => {
  return (
    <Pressable onPress={handleCollapse}>
      <View style={styles.topBanner}>
        <Text style={styles.playText}>Play</Text>
        <FontAwesome name="chevron-down" size={10} style={styles.btnColor} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  minimizedTopBanner: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },

  playText: { color: "white", fontSize: 13 },
  topBanner: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "black",
    alignItems: "center",
    padding: 10,
  },
  artist: {
    color: "white",
    fontSize: 20,
  },
  title: {
    color: "white",
    fontSize: 30,
  },
  minimizedTitle: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
  },
  space: {
    flexGrow: 2,
  },

  playBtn: {
    backgroundColor: "white",
    borderRadius: 100,
    width: 70,
    alignItems: "center",
    alignContent: "center",
    height: 70,
    justifyContent: "center",
    margin: 10,
  },
  btnColor: {
    color: "white",
    margin: 15,
  },

  minimizedImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
});
