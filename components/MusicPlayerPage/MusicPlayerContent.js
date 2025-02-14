import React, { useRef } from "react";
import { runOnJS, useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";

import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  Animated,
} from "react-native";
import { PanGestureHandler, State,GestureHandlerRootView, Gesture, GestureDetector } from "react-native-gesture-handler";
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
  const translateY = useSharedValue(0);

  const doubleTap = Gesture.Tap()
      .numberOfTaps(2)
      .onEnd((event, success) => {
        if (success) {
          console.log("Double tap detected");
          runOnJS(handleMinimizedScreen)();
          // Add your double-tap handling logic here
        }
      });

  const swipeDown = Gesture.Pan().onUpdate(
      (event) => {
    translateY.value = event.translationY;
  }).onEnd((event) => {
    if (event.translationY > height * 0.3) {
      runOnJS(handleMinimizedScreen)();
    } else {
      translateY.value = withSpring(0);
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleMinimizedScreen}
    >
      <GestureHandlerRootView style={{flex: 1}}>
        <GestureDetector gesture={Gesture.Simultaneous(doubleTap, swipeDown)}>
          <Animated.View style={[{ flex: 1 }, animatedStyle]}>
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
              <ButtonGroup  trackData={trackData}/>
              <View style={{ flexGrow: 1 }}></View>
              <CommentSection likeCount={likeCount} commentCount={commentCount} />
            </LinearGradient>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
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
