import {View, StyleSheet, Pressable, Text, Dimensions, Platform} from "react-native";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
const {height, width} = Dimensions.get("window");
import {useUserContext} from "@/context/UserContext";


const CommentSection = ({likeUserId, trackId, likeCount}) => {
  const {userId, token} = useUserContext();
  const [isLiked, setIsLiked] = useState(likeUserId.toString().includes(userId));
  const { commentCount, setCommentCount } = useMusicPlayer();
  const [_likeCount, setLikeCount] = useState(likeCount)

  // todo : call api to get like status
  const handleLike = (trackId) => {
    if (isLiked === true) {
      console.log("unlike");
      setIsLiked(!isLiked);
      setLikeCount(_likeCount - 1);
    } else {
      console.log("like !");
      setIsLiked(!isLiked);
      setLikeCount(_likeCount + 1);
    }
    fetchLikeAction(trackId);
  };

  const fetchLikeAction = async (trackId) => {
    const url = Platform.OS === "ios"
        ? process.env.EXPO_PUBLIC_BASE_URL + `user/like/${trackId}`
        : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `user/like/${trackId}`;

    console.log(url)

    try {
      await fetch(url, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
    }
    catch (err) {
      console.log();
    }
  }


  const handleShare = () => {
    console.log("share !");
  };

  const handleComment = () => {
    console.log("comment !");
  };

  return (
    <View style={styles.commentSection}>
      <Pressable onPress={() => handleLike(trackId)}>
            <FontAwesome
              name= {isLiked ? "heart" : "heart-o"}
              size={height > 100 && height < 800 ? 22 : 35}
              style={[styles.btnColor, { color: isLiked ? "red" : "white" }]}
            />
        </Pressable>
      <Text style={styles.likeText}>{_likeCount}</Text>
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
