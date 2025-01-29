import { View, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import AntDesign from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ButtonGroup = () => {
  const [isPlaying, setIsPlaying] = useState(false);

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

  const handlePlaying = () => {
    isPlaying === true ? console.log("now play") : console.log("paused !");
    setIsPlaying(!isPlaying);
  };
  return (
    <View style={styles.musicControlList}>
      <Pressable onPress={handleRandomPlaying}>
        <FontAwesome name="random" size={25} style={styles.btnColor} />
      </Pressable>
      <Pressable onPress={handlePreviousSong}>
        <FontAwesome name="step-backward" size={25} style={styles.btnColor} />
      </Pressable>
      <Pressable onPress={handlePlaying}>
        {isPlaying === true ? (
          <AntDesign name="play-circle" size={80} style={styles.btnColor} />
        ) : (
          <AntDesign name="pause-circle" size={80} style={styles.btnColor} />
        )}
      </Pressable>

      <Pressable onPress={handleNextSong}>
        <FontAwesome name="step-forward" size={25} style={[styles.btnColor]} />
      </Pressable>

      <Pressable onPress={handleMoreOption}>
        <FontAwesome name="ellipsis-h" size={25} style={styles.btnColor} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
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
    flexGrow: 3,
  },

  musicControlList: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent: "space-evenly",
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
  likeText: { fontSize: 15, color: "white" },
  commentText: { fontSize: 15, color: "white" },
  image: {
    flexGrow: 8,
  },
});

export default ButtonGroup;
