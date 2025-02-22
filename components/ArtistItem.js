import React, {useEffect, memo} from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions, Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {  useState } from "react";
const { height, width } = Dimensions.get("window");
import CreateAlert from "@/components/AlertComponent";
import getSize from "./AdjustSizeByScreenSize";
import {useUserContext} from "@/context/UserContext";
const ArtistItem = ({
  artistData,
  allowFollowButton = false,
  imageWidth,
                      updateFollowedArtists,
                      followedArtists,
  imageHeight,
  shownOnResultList = false,
  displayFollower = false,
                      setFollowedArtists,
    navigation
}) => {

  const {token, userId, fetchUserData} = useUserContext();
  const { followerCount, imageUrl, name, _id } = artistData;
  const [hasFollowed, setHasFollow] = useState(followedArtists != undefined && followedArtists.includes(_id));

  const formatFollowerCount = (count) => {
    if (count < 1000) return count.toString();
    if (count >= 1000 && count < 1000000) return (count / 1000).toFixed(1) + "K";
    if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
    return count.toString();
  };

  useEffect(() => {
    if (followedArtists != undefined && followedArtists.includes(_id) !== hasFollowed) {
      setHasFollow(followedArtists.includes(_id));
    }
  }, [followedArtists]);

  const fetchFollowAction = async (artistId) => {
    const url = Platform.OS === "ios"
        ? process.env.EXPO_PUBLIC_BASE_URL + `user/follow/${artistId}`
        : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `user/follow/${artistId}`;
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
        updateFollowedArtists(data.userData);
      }
    }
      catch (err) {
        console.log(err);
    }
  }

  const navigateToArtistInfoPage = (selectedArtistData) => {
    navigation.navigate("ArtistInfo", {
      artistData: { selectedArtistData },
      followParam: hasFollowed,
      followedArtistListParam: followedArtists,
      setFollowParam: setHasFollow,
      setFollowedArtistListParam: setFollowedArtists
    });
  };

  const handleFollow = (artistId) => {
    if (token.length === 0) {
      CreateAlert("Authentication Error", "Require login to follow artist", "authIssue", navigation);
    } else {
      fetchFollowAction(artistId);
    }
  }

  return (
      <Pressable onPress={() => navigateToArtistInfoPage(artistData)}>
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
        {followerCount != null && displayFollower ? (
          <View style={shownOnResultList ? styles.followerRow : null}>
            <FontAwesome name="user" size={15} style={styles.user} />
            <Text style={styles.followerCount}>{formatFollowerCount(followerCount)} Followers </Text>
          </View>
        ) : null}
      </View>
      {allowFollowButton ? <View style={styles.space}></View> : null}
      {allowFollowButton && userId ? (
        <Pressable onPress={() => handleFollow(artistData._id)}>
            <View style={[styles.followBtn, {borderColor: hasFollowed ? "rgba(255, 0, 0, 0.8)" : "grey"}]}>
              <Text style={[styles.followText, {color: hasFollowed ? "red" : "grey"}]}>
                {hasFollowed ? "Unfollow" : "Follow"}
              </Text>
            </View>
        </Pressable>
      ) : null}
    </View>
      </Pressable>
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

export default memo(ArtistItem);
