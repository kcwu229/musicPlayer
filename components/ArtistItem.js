import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Button,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
const { height, width } = Dimensions.get("window");
const ArtistIcon = ({
  artistData,
  allowFollowButton = false,
  imageWidth,
  imageHeight,
  shownOnResultList = false,
  displayFollower = false,
}) => {
  const { followerCount, imageUrl, artist, name } = artistData;
  console.log(imageUrl)
  const [hasFollowed, setHasFollow] = useState(false);

  const handleFollow = (name) => {
    if (hasFollowed === true) {
      console.log(`You haved unfollow artist - ${name}`);
      setHasFollow(!hasFollowed);
    } else {
      console.log(`You haved follow artist - ${name}`);
      setHasFollow(!hasFollowed);
    }
  };

  useEffect(()=> {
    console.log(artistData)
  })
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
      <View>
        <Text style={shownOnResultList ? styles.nameOnList : styles.name}>
          {name}
        </Text>
        {followerCount != null && displayFollower == true ? (
          <View style={shownOnResultList ? styles.followerRow : null}>
            <FontAwesome name="user" size={15} style={styles.user} />
            <Text style={styles.followerCount}>{followerCount} Followers </Text>
          </View>
        ) : null}
      </View>
      {allowFollowButton ? <View style={styles.space}></View> : null}
      {allowFollowButton ? (
        <Pressable onPress={() => handleFollow(artist)}>
          {hasFollowed === true ? (
            <View style={styles.unfollowBtn}>
              <Text style={styles.unfollowText}>Unfollow</Text>
            </View>
          ) : (
            <View style={styles.followBtn}>
              <Text style={styles.followText}>Follow</Text>
            </View>
          )}
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  followText: {
    color: "grey",
  },
  unfollowText: {
    color: "red",
  },
  space: {
    flexGrow: 2,
  },
  user: {
    marginLeft: 10,
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
    marginBottom: StyleSheet.hairlineWidth,
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
    marginRight: height > 100 && height < 800 ? 10 : 20,
    marginTop: height > 100 && height < 800 ? 5 : 20,
    alignItems: "center",
  },
  nameOnList: {
    fontSize: 20,
    margin: 10,
    color: "black",
    marginLeft: 10,
  },
  name: {
    fontSize: height > 100 && height < 800 ? 13 : 20,
    margin: 10,
    color: "black",
  },

  description: {
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    width: "auto",
  },
});

export default ArtistIcon;
