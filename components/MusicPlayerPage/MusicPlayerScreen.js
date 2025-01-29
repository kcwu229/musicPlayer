import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Pressable,
} from "react-native";
const { width, height } = Dimensions.get("window");
import {
  MinimizedMusicPlayerHeader,
  FullScreenMusicPlayerHeader,
} from "@/components/MusicPlayerPage/MusicPlayerHeader";
import MusicPlayerContent from "@/components/MusicPlayerPage/MusicPlayerContent";
import SlidingPanel from "react-native-sliding-up-down-panels";

const MusicPlayerScreen = ({ albumData }) => {
  const [panelPosition, setPanelPosition] = useState(0);
  const headerHeight = 80;

  const handleDrag = (position) => {};

  const handleEndReached = () => {
    if (panelPosition <= 0) {
      setPanelPosition(0);
    }
  };

  const handleOnDragStart = () => {};

  const handleOnDragStop = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SlidingPanel
          onDrag={handleDrag}
          onDragStart={handleOnDragStart}
          onDragStop={handleOnDragStop}
          onEndReached={handleEndReached}
          headerLayoutHeight={headerHeight}
          headerLayout={() => (
            <View style={styles.headerLayoutStyle}>
              <MinimizedMusicPlayerHeader albumData={albumData} />
            </View>
          )}
          slidingPanelLayout={() => (
            <View
              style={
                ([styles.slidingPanelLayoutStyle],
                { height: height - headerHeight, width: width })
              }
            >
              <MusicPlayerContent albumData={albumData} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    justifyContent: "center",
    alignItems: "center",
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
