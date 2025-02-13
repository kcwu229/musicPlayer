import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
  Alert,
  Dimensions,
} from "react-native";
import getSize  from "../AdjustSizeByScreenSize";
const userIcon = require("../../assets/images/icon.jpg");
const { height, width } = Dimensions.get("window");
import FontAwesome from "react-native-vector-icons/FontAwesome";

const TopBanner = () => {
  const notificationData = [{ notification: "Welcome to Sam Music Player !" }];

  const checkForNotification = () => {
    if (notificationData) {
      return `You had received ${notificationData.length} notifications !`;
    } else {
      return "No notification received !";
    }
  };
  const handleNotification = () => {
    console.log("hello");
    Alert.alert("Notification", checkForNotification(), [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };
  return (
    <View style={styles.topBannerContainer}>
      <Text style={styles.Home}>Home</Text>
      <View style={styles.spacing}></View>
      <Pressable onPress={handleNotification}>
        <FontAwesome
          name="bell-o"
          size={getSize(28,32,45)}
          style={styles.notification}
        />
      </Pressable>
      {notificationData.length > 0 && (
        <View style={styles.notificationCount}>
          <Text style={styles.notificationCountText}>
            {notificationData.length}
          </Text>
        </View>
      )}
      <Pressable onPress={() => console.log("click the user")}>
        <Image source={userIcon} style={styles.userIcon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationCount: {
    backgroundColor: "red",
    borderRadius: 100,
    height: getSize(18, 20, 25),
    width: getSize(18, 20, 25),
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: getSize(58, 70, 95),
    top: getSize(6, 7, 8),
  },
  notificationCountText: {
    color: "white",
  },
  Home: {
    fontSize: getSize(32,35, 50),
    fontWeight: "bold",
  },
  userIcon: {
    width: getSize(45,55,80),
    height: getSize(45,55,80),
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
    position: "relative",
    zIndex: 1,
  },
  spacing: {
    flexGrow: 2,
  },
});

export default TopBanner;
