import AntDesign from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  ImageBackground,
  Animated,
  PanResponder,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

const MusicPlayerComponent = ({ albumData, isMinimized, setIsMinimized }) => {
  const { title, artist, image } = albumData;
  const [isPlaying, setIsPlaying] = useState(false);
  // later need retrieve
  const [isLiked, setisLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(12000);
  const [commentCount, setCommentCount] = useState(200);

  const screenWidth = Dimensions.get("window").width;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: Animated.event([null, { dy: slideAnim }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50) {
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setIsMinimized(true);
          });
        } else if (gestureState.dy < -50) {
          Animated.timing(slideAnim, {
            toValue: -Dimensions.get("window").height + 100,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setIsMinimized(false);
          });
        } else {
          Animated.spring(slideAnim, {
            toValue: isMinimized ? 0 : -Dimensions.get("window").height + 100,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

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
    if (isMinimized === true) {
      console.log("expand !");
      setIsMinimized(!isMinimized);
    } else {
      console.log("collapse");
      setIsMinimized(!isMinimized);
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

  return (
    <>
      {isMinimized ? (
        <Pressable onPress={handleCollapse}>
          <View style={styles.minimizedTopBanner}>
            <Image source={image} style={styles.minimizedImage} />
            <Text style={styles.minimizedTitle}>{name.toUpperCase()}</Text>
            <View style={styles.space}></View>
            {isPlaying ? (
              <Pressable onPress={handlePlaying}>
                <FontAwesome name="play" size={22} style={styles.btnColor} />
              </Pressable>
            ) : (
              <Pressable onPress={handlePlaying}>
                <FontAwesome name="pause" size={22} style={styles.btnColor} />
              </Pressable>
            )}
            <Pressable onPress={handleNextSong}>
              <FontAwesome
                name="step-forward"
                size={22}
                style={styles.btnColor}
              />
            </Pressable>
          </View>
        </Pressable>
      ) : (
        <ImageBackground
          source={image}
          resizeMethod="cover"
          style={styles.image}
        >
          <Pressable onPress={handleCollapse}>
            <View style={styles.topBanner}>
              <Text style={styles.playText}>Play</Text>
              <FontAwesome
                name="chevron-down"
                size={10}
                style={styles.btnColor}
              />
            </View>
          </Pressable>
          <View style={styles.space}></View>
          <View style={styles.infoList}>
            <Text style={styles.title}>{name.toUpperCase()}</Text>
            <Text style={styles.artist}>{artist}</Text>
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
                <AntDesign
                  name="play-circle"
                  size={80}
                  style={styles.btnColor}
                />
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
              <FontAwesome
                name="ellipsis-h"
                size={25}
                style={styles.btnColor}
              />
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  minimizedTopBanner: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },

  playText: { color: "white", fontSize: 13 },
  topBanner: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    padding: 10,
  },
  miniTopBanner: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    padding: 10,
    flexGrow: 1,
    height: 40,
  },
  infoList: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  artist: {
    color: "white",
    fontSize: 20,
  },
  title: {
    color: "white",
    fontSize: 30,
  },
  minimizedTitle: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
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
  minimizedImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
});

export default MusicPlayerComponent;
