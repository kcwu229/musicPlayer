import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Image } from "react-native";
import LoginScreenNavigator from "@/screen/LoginScreenNavigator";
import comingSoonImage from "@/assets/images/comingSoon.png"

const FeedScreen = () => {
    return <>
        <Image source={comingSoonImage} resizeMode="cover" style={{ flex: 1, width: "100%" }} />
    </>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedScreen;
