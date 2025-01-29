import { View, StyleSheet, Pressable, Text } from "react-native";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const CommentSection = ({ likeCount, commentCount }) => {
  const [isLiked, setisLiked] = useState(false);
  const [_likeCount, setLikeCount] = useState(likeCount || 200);
  const [_commentCount, setCommentCount] = useState(commentCount || 200);

  const handleLike = () => {
    if (isLiked === true) {
      console.log("unlike");
      setisLiked(!isLiked);
      setLikeCount(_likeCount - 1);
    } else {
      console.log("like !");
      setisLiked(!isLiked);
      setLikeCount(_likeCount + 1);
    }
  };

  const handleShare = () => {
    console.log("share !");
  };

  return (
    <View style={styles.commentSection}>
      {isLiked === true ? (
        <Pressable onPress={handleLike}>
          <FontAwesome
            name="heart"
            size={22}
            style={[styles.btnColor, { color: "red" }]}
          />
        </Pressable>
      ) : (
        <Pressable onPress={handleLike}>
          <FontAwesome name="heart-o" size={22} style={styles.btnColor} />
        </Pressable>
      )}
      <Text style={styles.likeText}>{_likeCount}</Text>
      <Pressable onPress={handleShare}>
        <FontAwesome name="comments" size={22} style={styles.btnColor} />
      </Pressable>
      <Text style={styles.commentText}> {_commentCount}</Text>
      <View style={styles.space}></View>
      <Pressable onPress={handleShare}>
        <FontAwesome name="share-alt" size={22} style={styles.btnColor} />
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
  likeText: { fontSize: 15, color: "white" },
  commentText: { fontSize: 15, color: "white" },
});

export default CommentSection;
