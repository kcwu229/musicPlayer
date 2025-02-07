import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  Animated,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import AlbumInfo from "@/components/MusicPlayerPage/AlbumInfo";
import ButtonGroup from "@/components/MusicPlayerPage/ButtonGroup";
import CommentSection from "@/components/MusicPlayerPage/CommentSection";
import { FullScreenMusicPlayerHeader } from "@/components/MusicPlayerPage/MusicPlayerHeader";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

const MusicPlayerContent = ({
  trackData,
  handleMinimizedScreen,
  isVisible,
    isPlaying,
    setIsPlaying
}) => {
  //console.log(JSON.stringify(trackData))
  const {name, likeCount, commentCount, imageUrl } = trackData;
  const artistName = trackData.artistId.name;
  const translateY = useRef(new Animated.Value(0)).current;

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationY > height * 0.3) {
        handleMinimizedScreen();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleMinimizedScreen}
    >
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={{ flex: 1, transform: [{ translateY }] }}>
          <LinearGradient
            colors={["rgb(104, 97, 97)", "rgb(33, 31, 31)"]}
            style={{ flex: 1, alignContent: "center" }}
          >
            <FullScreenMusicPlayerHeader
              handleMinimizedScreen={handleMinimizedScreen}
            />

            <View style={{ flexGrow: 1 }}></View>
            <Image
              source={{uri: imageUrl}}
              style={[
                styles.image,
                {
                  height:
                    width > 100 && width < 600 ? width * 0.45 : width * 0.4,
                  width:
                    width > 100 && width < 600 ? width * 0.45 : width * 0.4,
                },
              ]}
            />
            <View style={{ flexGrow: 1 }}></View>
            <AlbumInfo name={name} artistName={artistName} />
            <View style={{ flexGrow: 1 }}></View>
            <ButtonGroup/>
            <View style={{ flexGrow: 1 }}></View>
            <CommentSection likeCount={likeCount} commentCount={commentCount} />
          </LinearGradient>
        </Animated.View>
      </PanGestureHandler>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(64, 62, 62, 0.7)",
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
  likeText: { fontSize: 15, color: "white" },
  commentText: { fontSize: 15, color: "white" },
  image: {
    alignSelf: "center",
    borderRadius: 20,
  },
});

export default MusicPlayerContent;
