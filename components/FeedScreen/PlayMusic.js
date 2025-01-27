import { Ionicons } from "@expo/vector-icons";
import AntDesign from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  StyleSheet,
  DrawerLayoutAndroid,
  Pressable,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";

const songData = {
  title: "Flower",
  artist: "Jisoo",
  image: require("../../assets/images/bg.jpeg"),
  height: "100%",
};

const PlayMusicPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  // later need retrieve
  const [isLiked, setisLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(12000);
  const [commentCount, setCommentCount] = useState(200);
  const [isCollasped, setIsCollasped] = useState(false);

  const drawer = React.useRef(null);
  const screenWidth = Dimensions.get("window").width;

  const handleShare = () => {
    console.log("share !");
  };

  const handleMoreOption = () => {
    console.log("more option !");
  };

  const handleRandomPlaying = () => {
    console.log("random playing");
  };

  const handleNextSong = () => {
    console.log("Next song ");
  };

  const handlePreviousSong = () => {
    console.log("previous song");
  };

  const handleCollapse = () => {
    if (isCollasped === true) {
      console.log("expand !");
      setIsCollasped(!isCollasped);
    } else {
      console.log("collapse");
      setIsCollasped(!isCollasped);
    }
  };

  const handleLike = () => {
    if (isLiked === true) {
      console.log("unlike");
      setisLiked(!isLiked);
      setLikeCount(likeCount - 1);
    } else {
      console.log("like !");
      setisLiked(!isLiked);
      setLikeCount(likeCount + 1);
    }
  };

  const handlePlaying = () => {
    isPlaying === true ? console.log("now play") : console.log("paused !");
    setIsPlaying(!isPlaying);
  };

  const navigationView = () => (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerText}>Drawer Content</Text>
      {/* Add more drawer items here */}
    </View>
  );

  const openDrawer = () => {
    if (drawer.current) {
      drawer.current.openDrawer();
    }
  };

  const closeDrawer = () => {
    if (drawer.current) {
      drawer.current.closeDrawer();
    }
  };

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={screenWidth}
      drawerPosition="left"
      renderNavigationView={navigationView}
    >
      <Pressable onPress={openDrawer}>
        <Text>Open Drawer</Text>
      </Pressable>

      <ImageBackground
        source={songData.image}
        resizeMethod="cover"
        style={styles.image}
      >
        <View style={styles.topBanner}>
          <Pressable>
            <Text style={styles.playText}>Play</Text>
          </Pressable>
          <Pressable onPress={handleCollapse}>
            <FontAwesome
              name="chevron-down"
              size={10}
              style={styles.btnColor}
            />
          </Pressable>
        </View>

        <View style={styles.space}></View>

        <View style={styles.infoList}>
          <Text style={styles.title}>{songData.title.toUpperCase()}</Text>
          <Text style={styles.artist}>{songData.artist}</Text>
        </View>

        <View style={styles.musicControlList}>
          <Pressable onPress={handleRandomPlaying}>
            <FontAwesome name="random" size={25} style={styles.btnColor} />
          </Pressable>

          <Pressable onPress={handlePreviousSong}>
            <FontAwesome
              name="step-backward"
              size={25}
              style={styles.btnColor}
            />
          </Pressable>
          <Pressable onPress={handlePlaying}>
            {isPlaying === true ? (
              <AntDesign name="play-circle" size={80} style={styles.btnColor} />
            ) : (
              <AntDesign
                name="pause-circle"
                size={80}
                style={styles.btnColor}
              />
            )}
          </Pressable>

          <Pressable onPress={handleNextSong}>
            <FontAwesome
              name="step-forward"
              size={25}
              style={[styles.btnColor]}
            />
          </Pressable>

          <Pressable onPress={handleMoreOption}>
            <FontAwesome name="ellipsis-h" size={25} style={styles.btnColor} />
          </Pressable>
        </View>
        <View style={styles.commentSection}>
          {isLiked === true ? (
            <Pressable onPress={handleLike}>
              <FontAwesome
                name="heart"
                size={22}
                style={[styles.btnColor, { color: "red" }]}
              />
            </Pressable>
          ) : (
            <Pressable onPress={handleLike}>
              <FontAwesome name="heart-o" size={22} style={styles.btnColor} />
            </Pressable>
          )}
          <Text style={styles.likeText}>{likeCount}</Text>
          <Pressable onPress={handleShare}>
            <FontAwesome name="comments" size={22} style={styles.btnColor} />
          </Pressable>
          <Text style={styles.commentText}> {commentCount}</Text>
          <View style={styles.space}></View>
          <Pressable onPress={handleShare}>
            <FontAwesome name="share-alt" size={22} style={styles.btnColor} />
          </Pressable>
        </View>
      </ImageBackground>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  playText: { color: "white", fontSize: 13 },
  topBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
    padding: 10,
  },
  infoList: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  artist: {
    color: "white",
    fontSize: 20,
  },
  title: {
    color: "white",
    fontSize: 30,
  },
  space: {
    flexGrow: 3,
  },
  commentSection: {
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    height: "10%",
  },
  musicControlList: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  playBtn: {
    backgroundColor: "white",
    borderRadius: 100,
    width: 70,
    alignItems: "center",
    alignContent: "center",
    height: 70,
    justifyContent: "center",
    margin: 10,
  },
  btnColor: {
    color: "white",
    margin: 15,
  },
  likeText: { fontSize: 15, color: "white" },
  commentText: { fontSize: 15, color: "white" },
  image: {
    flexGrow: 8,
  },
});

export default PlayMusicPage;
