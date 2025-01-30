import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

const FeedScreen = () => {
  const data = {
    id: 1,
    name: "Taylor Swift",
    followerCount: 2000000,
    //theme: "Love Story",
    image: require("@/assets/images/taylor_swift.png"),
    viewCount: 20000,
    duration: "3:03",
    likeCount: 20000,
    commentCount: 20000,
  };
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedScreen;
