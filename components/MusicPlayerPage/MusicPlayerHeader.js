import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useMusicPlayer } from "@/context/MusicPlayerContext";

const { height, width } = Dimensions.get("window");

exports.MinimizedMusicPlayerHeader = ({
  trackData,
  handleMinimizedScreen,
  style,
}) => {
  const { name, imageUrl } = trackData;
  const artistName = trackData.artistId.name;

  const { isPlaying, setIsPlaying, handlePlayTrack } = useMusicPlayer();

  const handleNextSong = () => {
    console.log("Next song ");
  };

  const handlePlaying = (url) => {
    isPlaying ? console.log("paused !") : console.log("now play");
    setIsPlaying(!isPlaying);
    handlePlayTrack(url);
  };

  return (
    <Pressable onPress={handleMinimizedScreen}>
      <View style={[styles.minimizedTopBanner, style, {width: width}]}>
        <Image source={{uri: imageUrl}} style={styles.minimizedImage} />
        <Text style={[styles.minimizedTitle, {width: width * 0.5}]} numberOfLines={1} ellipsizeMode={"tail"}>{name.toUpperCase()}</Text>
        <View style={styles.space}></View>
        <Pressable onPress={() => handlePlaying(trackData.soundTrackUrl)}>
        {isPlaying ? (
            <FontAwesome
              name="pause"
              size={width > 100 && width < 600 ? 22 : 30}
              style={styles.btnColor}
            />
        ) : (
            <FontAwesome
              name="play"
              size={width > 100 && width < 600 ? 22 : 30}
              style={styles.btnColor}
            />
        )}
        </Pressable>
        <Pressable onPress={handleNextSong}>
          <FontAwesome
            name="step-forward"
            size={width > 100 && width < 600 ? 22 : 30}
            style={styles.btnColor}
          />
        </Pressable>
      </View>
    </Pressable>
  );
};

exports.FullScreenMusicPlayerHeader = ({ handleMinimizedScreen }) => {
  return (
    <View>
      <View
        style={{
          paddingTop: height < 800 ? 40 : 80,
        }}
      >
        <View
          style={[
            styles.horizontalBar,
            { width: width * 0.13, height: height * 0.01 },
          ]}
        ></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  minimizedTopBanner: {
    flexDirection: "row",
    height: height > 100 && width < 800 ? 75 : 120,
    padding: height > 100 && width < 800 ? 10 : 30,
    alignItems: "center",
  },
  horizontalBar: {
    backgroundColor: "rgb(204, 200, 200)",
    alignSelf: "center",
    borderRadius: 20,
  },
  playText: {
    color: "white",
    fontSize: width > 800 ? 30 : 18,
  },
  topBanner: {
    flexDirection: "row",
    padding: width > 500 ? 22 : 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: width * 0.1,
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
    fontSize: width > 100 && width < 600 ? 16 : 26,
    color: "white",
    marginLeft: 20,
    fontWeight: "bold",
  },
  space: {
    flexGrow: 6,
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
    width: width > 100 && width < 600 ? 40 : 80,
    height: width > 100 && width < 600 ? 40 : 80,
    borderRadius: 5,
  },
});
