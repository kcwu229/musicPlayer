import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import getSize from "@/components/AdjustSizeByScreenSize";

const { height, width } = Dimensions.get("window");
import {useMusicPlayer} from "@/context/MusicPlayerContext";
import {useEffect} from "react";

const ButtonGroup = ({trackData}) => {
  const {
    isPlaying,
    setIsPlaying,
    handlePlayTrack,
      selectedTrack,
  } = useMusicPlayer();

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

  const handlePlaying = (url) => {
    if (!url) {
      console.error("Error: trackUrl is null or undefined");
      return;
    }
    setIsPlaying(!isPlaying);
    handlePlayTrack(url);
  };

  return (
    <View style={styles.musicControlList}>
      <Pressable onPress={handlePreviousSong}>
        <FontAwesome
          name="step-backward"
          size={getSize(15,25, 35)}
          style={styles.btnColor}
        />
      </Pressable>

      <Pressable onPress={ () => handlePlaying(trackData.soundTrackUrl)}>
        {isPlaying === true ? (
          <AntDesign
            name="pausecircle"
            size={getSize(60,80, 80)}
            style={styles.btnColor}
          />
        ) : (
          <AntDesign
            name="playcircleo"
            size={getSize(60,80, 80)}
            style={styles.btnColor}
          />
        )}
      </Pressable>

      <Pressable onPress={handleNextSong}>
        <FontAwesome
          name="step-forward"
          size={getSize(15,25, 35)}
          style={[styles.btnColor]}
        />
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginHorizontal: width > 500 ? width * 0.01 : width * 0.001,
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
    color: "rgb(236, 236, 236)",
    margin: 15,
  },
  likeText: { fontSize: 15, color: "white" },
  commentText: { fontSize: 15, color: "white" },
  image: {
    flexGrow: 8,
  },
});

export default ButtonGroup;
