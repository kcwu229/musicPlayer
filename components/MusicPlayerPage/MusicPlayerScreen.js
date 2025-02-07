import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Animated } from "react-native";
import MusicPlayerContent from "@/components/MusicPlayerPage/MusicPlayerContent";
import { MinimizedMusicPlayerHeader } from "@/components/MusicPlayerPage/MusicPlayerHeader";

const MusicPlayerScreen = ({
  trackData,
  isMinimized,
  handleMinimizedScreen,
    isPlaying,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const screenHeight = Dimensions.get("window").height;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isMinimized ? screenHeight : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isMinimized, isPlaying]);

  return (
    <View style={{ flex: 1 }}>
      {isMinimized && (
        <MinimizedMusicPlayerHeader
          trackData={trackData}
          handleMinimizedScreen={handleMinimizedScreen}
          style={styles.minimizedScreenContainer}
        />
      )}
      <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
        {!isMinimized && (
          <View>
            <MusicPlayerContent
              trackData={trackData}
              handleMinimizedScreen={handleMinimizedScreen}
              visible={isMinimized}
              style={styles.fullScreenContainer}
            />
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    width: "100%",
  },
  minimizedScreenContainer: {
    backgroundColor: "rgb(31, 30, 30)",
    bottom: 0,
    position: "absolute",
    left: 0,
    right: 0,
    flex: 1,
    width: "100%",
    // Add styles for minimized screen container if needed
  },
});

export default MusicPlayerScreen;
