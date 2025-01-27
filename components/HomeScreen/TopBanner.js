import React from "react";
import { View, StyleSheet, Image, Pressable, Text } from "react-native";
const userIcon = require("../../assets/images/icon.jpg");
import FontAwesome from "react-native-vector-icons/FontAwesome";

const TopBanner = () => {
  const handleNotification = () => {
    console.log("Check the notification");
  };
  return (
    <View style={styles.topBannerContainer}>
      <Text style={styles.Home}>Home</Text>
      <View style={styles.spacing}></View>
      <Pressable onPress={handleNotification}>
        <FontAwesome name="bell-o" size={28} style={styles.notification} />
      </Pressable>
      <Image source={userIcon} style={styles.userIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  Home: {
    fontSize: 35,
    fontWeight: "bold",
  },
  userIcon: {
    width: 45,
    height: 45,
    borderRadius: 100,
    margin: 5,
    borderColor: "purple",
    borderWidth: 2,
  },
  topBannerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notification: {
    margin: 15,
    color: "grey",
  },
  spacing: {
    flexGrow: 2,
  },
  logo: {
    width: 60,
    height: 30,
  },
});

export default TopBanner;
