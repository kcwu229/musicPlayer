import {View, StyleSheet, Pressable, Text, Dimensions, Platform} from "react-native";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
const {height, width} = Dimensions.get("window");
import {useUserContext} from "@/context/UserContext";
import getSize from "@/components/AdjustSizeByScreenSize";


const CommentSection = ({likeUserId, trackId, likeCount}) => {
  const {userId, token, followedTracks, updateFollowedTracks} = useUserContext();
  const [isLiked, setIsLiked] = useState(followedTracks !== undefined && followedTracks.includes(trackId));
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
        ? process.env.EXPO_PUBLIC_BASE_URL + `user/like/track/${trackId}`
        : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `user/like/track/${trackId}`;

    try {
      const result = await fetch(url, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
     if (result.ok) {
       const data = await result.json();
       updateFollowedTracks(data.userData)
     }
    }
    catch (err) {
      console.log(err);
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
              size={getSize(22, 25, 30)}
              style={[styles.btnColor, { color: isLiked ? "red" : "white" }]}
            />
        </Pressable>
      <Text style={styles.likeText}>{_likeCount}</Text>
      <Pressable onPress={handleComment}>
        <FontAwesome name="comments" size={getSize(22, 25, 30)} style={styles.btnColor} />
      </Pressable>
      <Text style={styles.commentText}> {commentCount}</Text>
      <View style={styles.space}></View>
      <Pressable onPress={handleShare}>
        <FontAwesome name="share-alt" size={getSize(22, 25, 30)} style={styles.btnColor} />
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
  likeText: {
    fontSize: getSize(10, 15, 20),
    color: "white" },
  commentText: {
    fontSize: getSize(10, 15, 20),
    color: "white" },
  space: {
    flexGrow: 1,
  },
});

export default CommentSection;
