import { View, StyleSheet, Pressable, Text, Dimensions } from "react-native";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
const {height, width} = Dimensions.get("window");


const CommentSection = () => {
  const [isLiked, setisLiked] = useState(false);
  const { commentCount, likeCount, setCommentCount, setLikeCount } = useMusicPlayer();

  // todo : call api to get like status
  const handleLike = () => {
    if (isLiked === true) {
      console.log("unlike");
      setisLiked(!isLiked);
      setLikeCount(likeCount - 1);
      // call api to unlike
    } else {
      console.log("like !");
      setisLiked(!isLiked);
      setLikeCount(likeCount + 1);
      // call api unlike
    }
  };

  const handleShare = () => {
    console.log("share !");
  };

  const handleComment = () => {
    console.log("comment !");
  };

  return (
    <View style={styles.commentSection}>
      {isLiked === true ? (
        <Pressable onPress={handleLike}>
          <FontAwesome
            name="heart"
            size={height > 100 && height < 800 ? 22 : 35}
            style={[styles.btnColor, { color: "red" }]}
          />
        </Pressable>
      ) : (
        <Pressable onPress={handleLike}>
          <FontAwesome name="heart-o"  size={height > 100 && height < 800 ? 22 : 35} style={styles.btnColor} />
        </Pressable>
      )}
      <Text style={styles.likeText}>{likeCount}</Text>
      <Pressable onPress={handleComment}>
        <FontAwesome name="comments" size={height > 100 && height < 800 ? 22 : 35} style={styles.btnColor} />
      </Pressable>
      <Text style={styles.commentText}> {commentCount}</Text>
      <View style={styles.space}></View>
      <Pressable onPress={handleShare}>
        <FontAwesome name="share-alt" size={height > 100 && height < 800 ? 22 : 35} style={styles.btnColor} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  commentSection: {
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    height: "10%",
  },
  btnColor: {
    color: "white",
    margin: 15,
  },
  likeText: { fontSize: height > 100 && height < 800 ? 15 : 20, color: "white" },
  commentText: { fontSize: height > 100 && height < 800 ? 15 : 20, color: "white" },
  space: {
    flexGrow: 1,
  },
});

export default CommentSection;
