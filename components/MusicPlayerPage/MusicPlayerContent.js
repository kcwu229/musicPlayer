import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Modal,
  Animated,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import AlbumInfo from "@/components/MusicPlayerPage/AlbumInfo";
import ButtonGroup from "@/components/MusicPlayerPage/ButtonGroup";
import CommentSection from "@/components/MusicPlayerPage/CommentSection";
import { FullScreenMusicPlayerHeader } from "@/components/MusicPlayerPage/MusicPlayerHeader";

const { height, width } = Dimensions.get("window");

const MusicPlayerContent = ({
  albumData,
  handleMinimizedScreen,
  isVisible,
}) => {
  const { title, artist, likeCount, commentCount, image } = albumData;
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
          <FullScreenMusicPlayerHeader
            handleMinimizedScreen={handleMinimizedScreen}
          />
          <ImageBackground
            source={image}
            resizeMethod="cover"
            style={[styles.image, { height: height, width: width }]}
          >
            <View style={{ height: height * 0.54 }}></View>
            <AlbumInfo title={title} artist={artist} />
            <ButtonGroup />
            <CommentSection likeCount={likeCount} commentCount={commentCount} />
          </ImageBackground>
        </Animated.View>
      </PanGestureHandler>
    </Modal>
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
  likeText: { fontSize: 15, color: "white" },
  commentText: { fontSize: 15, color: "white" },
});

export default MusicPlayerContent;
