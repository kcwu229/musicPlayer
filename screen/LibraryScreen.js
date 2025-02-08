import React from "react";
import { View, StyleSheet, Text } from "react-native";
import SignUpScreen from "@/screen/SignUpScreen";

const LibraryScreen = () => {
  return <SignUpScreen />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});

export default LibraryScreen;
