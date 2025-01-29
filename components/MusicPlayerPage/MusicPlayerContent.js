import {
  View,
  StyleSheet,
  Pressable,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useState } from "react";
import AlbumInfo from "@/components/MusicPlayerPage/AlbumInfo";
import ButtonGroup from "@/components/MusicPlayerPage/ButtonGroup";
import CommentSection from "@/components/MusicPlayerPage/CommentSection";
const screenHeight = Dimensions.get("window").height;

const MusicPlayerContent = ({ albumData }) => {
  const { title, artist, likeCount, commentCount, image } = albumData;
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={image}
        resizeMethod="cover"
        style={([styles.image], { height: screenHeight - 150 })}
      >
        <View style={styles.space}></View>
        <AlbumInfo title={title} artist={artist} />
        <ButtonGroup />
        <CommentSection likeCount={likeCount} commentCount={commentCount} />
      </ImageBackground>
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
    flexGrow: 4,
  },

  likeText: { fontSize: 15, color: "white" },
  commentText: { fontSize: 15, color: "white" },
  image: {
    flexGrow: 8,
  },
});

export default MusicPlayerContent;
