import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const userIcon = require("../../assets/images/icon.jpg");

const TopBanner = () => (
  <View style={styles.topBannerContainer}>
    <Ionicons name="mic" size={40} style={styles.logo} />
    <View style={styles.spacing}></View>
    <Ionicons name="mail" size={40} style={styles.notification} />
    <Image source={userIcon} style={styles.userIcon} />
  </View>
);

const styles = StyleSheet.create({
  logo: {
    margin: 5,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    margin: 5,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  topBannerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notification: {
    margin: 15,
  },
  spacing: {
    flexGrow: 2,
  },
});

export default TopBanner;
