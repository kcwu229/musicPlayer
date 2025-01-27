import React from "react";
import { View, Text, StyleSheet, Pressable, Image, Button } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ArtistIcon = ({
  artistData,
  allowFollowButton = false,
  imageWidth,
  imageHeight,
  shownOnResultList = false,
}) => {
  const { name, followerCount, image } = artistData;
  const handleFollow = () => {
    console.log("You Follow ");
  };
  return (
    <View
      style={shownOnResultList ? styles.artistItemOnList : styles.artistItem}
    >
      <Pressable onPress={() => console.log(name)}>
        <View style={shownOnResultList ? null : styles.description}>
          <Image
            source={image}
            style={[styles.image, { width: imageWidth, height: imageHeight }]}
          />
        </View>
      </Pressable>
      <View>
        <Text style={shownOnResultList ? styles.nameOnList : styles.name}>
          {name}
        </Text>
        {followerCount != null ? (
          <View style={shownOnResultList ? styles.followerRow : null}>
            <FontAwesome name="user" size={15} style={styles.user} />
            <Text style={styles.followerCount}>{followerCount} Followers </Text>
          </View>
        ) : null}
      </View>
      {allowFollowButton ? <View style={styles.space}></View> : null}
      {allowFollowButton ? (
        <Pressable onPress={handleFollow}>
          <View style={styles.followBtn}>
            <Text>Follow</Text>
          </View>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
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
  image: {
    borderRadius: 100,
    backgroundColor: "black",
    marginTop: 15,
  },

  artistItem: {
    flexDirection: "column",
    marginRight: 20,
    marginTop: 20,
    alignItems: "center",
  },
  nameOnList: {
    fontSize: 20,
    margin: 10,
    color: "black",
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
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
