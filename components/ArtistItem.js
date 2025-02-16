import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions, Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
const { height, width } = Dimensions.get("window");
import CreateAlert from "@/components/AlertComponent";
import getSize from "./AdjustSizeByScreenSize";
import {useUserContext} from "@/context/UserContext";

const ArtistItem = ({
  artistData,
  allowFollowButton = false,
  imageWidth,
  imageHeight,
  shownOnResultList = false,
  displayFollower = false,
    navigation
}) => {
  const {token, userId} = useUserContext();
  const { followerCount, imageUrl, name, _id, followerId } = artistData;
  const [hasFollowed, setHasFollow] = useState(followerId.toString().includes(userId));

  const formatFollowerCount = (count) => {
    if (count < 1000) return count.toString();
    if (count >= 1000 && count < 1000000) return (count / 1000).toFixed(1) + "K";
    if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
    return count.toString();
  };

  const fetchFollowAction = async (artistId) => {
    const url = Platform.OS === "ios"
        ? process.env.EXPO_PUBLIC_BASE_URL + `user/follow/${artistId}`
        : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `user/follow/${artistId}`;

    console.log(url)

    try {
      const result = await fetch(url, {
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


  const handleFollow = (artistName) => {
    if (token.length === 0) {
      CreateAlert("Authentication Error", "Require login to follow artist", "authIssue", navigation);
    } else {
      if (hasFollowed === true) {
        console.log(`You haved unfollow artist - ${artistName}`);
        setHasFollow(!hasFollowed);
      } else {
        console.log(`You haved follow artist - ${artistName}`);
        setHasFollow(!hasFollowed);
      }
      fetchFollowAction(_id)
    };
  }

  return (
    <View
      style={shownOnResultList ? styles.artistItemOnList : styles.artistItem}
    >
      <View style={shownOnResultList ? null : styles.description}>
        <Image
          source={{ uri: imageUrl}}
          style={[styles.image, { width: imageWidth, height: imageHeight }]}
        />
      </View>
      <View style={{ width: shownOnResultList ? "50%" : imageWidth}}>
        <Text
            style={shownOnResultList ? styles.nameOnList : styles.name}
            numberOfLines={1} ellipsizeMode={"tail"}>
          {name}
        </Text>
        {followerCount != null && displayFollower == true ? (
          <View style={shownOnResultList ? styles.followerRow : null}>
            <FontAwesome name="user" size={15} style={styles.user} />
            <Text style={styles.followerCount}>{formatFollowerCount(followerCount)} Followers </Text>
          </View>
        ) : null}
      </View>
      {allowFollowButton ? <View style={styles.space}></View> : null}
      {allowFollowButton ? (
        <Pressable onPress={() => handleFollow(name)}>
            <View style={[styles.followBtn, {borderColor: hasFollowed ? "rgba(255, 0, 0, 0.8)" : "grey"}]}>
              <Text style={[styles.followText, {color: hasFollowed ? "red" : "grey"}]}>
                {hasFollowed ? "Unfollow" : "Follow"}
              </Text>
            </View>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  followText: {
    color: "grey",
    fontSize: getSize(15, 16,22),
  },
  unfollowText: {
    color: "red",
    fontSize: getSize(15, 16,22),
  },
  space: {
    flexGrow: 2,
  },
  user: {
    marginLeft: 10,
    color: "purple"
  },
  followerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  artistItemOnList: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    paddingVertical: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  followerCount: {
    color: "grey",
    fontSize: 15,
    marginLeft: 10,
  },
  followBtn: {
    borderRadius: 20,
    borderColor: "grey",
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 20,
  },
  unfollowBtn: {
    borderRadius: 20,
    borderColor: "red",
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 20,
  },
  image: {
    borderRadius: 100,
    backgroundColor: "black",
    marginTop: 15,
    shadowColor: "black",
    shadowOffset: { width: 1, height: -1 },
    shadowRadius: 1,
    shadowOpacity: 0.8, // Add shadowOpacity for better control
    elevation: 5,
  },

  artistItem: {
    flexDirection: "column",
    marginRight: getSize(10, 15,20),
    marginTop: getSize(5, 13,20),
    alignItems: "center",
  },
  nameOnList: {
    fontSize: 20,
    margin: 10,
    color: "black",
    marginLeft: 10,
  },
  name: {
    fontSize: getSize(13, 18,25),
    margin: 10,
    color: "black",
    textAlign: "center"
  },

  description: {
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    width: "auto",
  },
});

export default ArtistItem;
