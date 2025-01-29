import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Pressable,
} from "react-native";
const { height, width } = Dimensions.get("window");
const screenHeight = Dimensions.get("window").height;
console.log("height" + screenHeight);
import { MinimizedMusicPlayerHeader } from "@/components/MusicPlayerPage/MusicPlayerHeader";
import MusicPlayerContent from "@/components/MusicPlayerPage/MusicPlayerContent";
import SlidingPanel from "react-native-sliding-up-down-panels";

const MusicPlayerScreen = ({
  albumData,
  isMinimized,
  handleMinimizedScreen,
}) => {
  const headerHeight = 80;

  return (
    <View style={[styles.container]}>
      <SlidingPanel
        headerLayoutHeight={headerHeight}
        headerLayout={() => {
          return (
            isMinimized && (
              <Pressable
                onPress={handleMinimizedScreen}
                pointerEvents="box-none"
              >
                <View style={styles.headerLayoutStyle}>
                  <MinimizedMusicPlayerHeader albumData={albumData} />
                </View>
              </Pressable>
            )
          );
        }}
        slidingPanelLayout={() => {
          return isMinimized === true ? null : (
            <View
              style={
                ([styles.slidingPanelLayoutStyle],
                { height: height, width: width })
              }
            >
              <Pressable
                onPress={handleMinimizedScreen}
                pointerEvents="box-none"
              ></Pressable>
              <MusicPlayerContent albumData={albumData} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
  },
  bodyViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerLayoutStyle: {
    height: 80,
    width,
    backgroundColor: "black",
    position: "absolute",
    top: 0,
    zIndex: 2,
  },
  slidingPanelLayoutStyle: {
    flex: 1,
    justifyContent: "center",
  },
  commonTextStyle: {
    color: "white",
    fontSize: 18,
  },
});

export default MusicPlayerScreen;
