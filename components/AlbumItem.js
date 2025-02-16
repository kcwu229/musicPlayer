import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions, Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {useNavigation} from "@react-navigation/native";
import getSize from "./AdjustSizeByScreenSize";
import {useUserContext} from "@/context/UserContext";
import CreateAlert from "@/components/AlertComponent";
const { height, width } = Dimensions.get("window");
const AlbumItem = ({
                     albumData,
                     allowOptionButton = false,
                     shownOnResultList = false,
                     showViewAndDuration = false,
                     imageWidth,
                     imageHeight,
                     artistFontSize,
                     titleFontSize,
                   }) => {
  const { name, viewCount, imageUrl, duration, likedUserId} = albumData;

  const {token, userId} = useUserContext();
  const [hasLiked,setHasLiked] = useState(likedUserId.includes(userId))

  const navigation = useNavigation();
  const navigateToAlbumInfoPage = (selectedAlbumData) => {
    navigation.navigate("AlbumInfo", {
      albumData: { selectedAlbumData },
    });
  };


  const handleLike= (albumData) => {
    console.log("ccc")
    if (token.length === 0) {
      CreateAlert("Authentication Error", "Require login to follow artist", "authIssue", navigation);
    } else {
      console.log(hasLiked ? `You have unlike track - ${albumData.name}` : `You have like track - ${albumData.name}`);
      setHasLiked(!hasLiked)
      fetchLikeAction(albumData._id)
    }
  }

  const fetchLikeAction = async (albumId) => {
    const url = Platform.OS === "ios"
        ? process.env.EXPO_PUBLIC_BASE_URL + `user/like/album/${albumId}`
        : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `user/like/album/${albumId}`;

    try {
      await fetch(url, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
    }
    catch (err) {
      console.log();
    }
  }


  return (
      <Pressable
          onPress={() => navigateToAlbumInfoPage(albumData)}
      >
        <View style={shownOnResultList ? styles.albumItemOnList : styles.albumItem}>
          <View style={styles.albumImage}>
            <Image
                source={{ uri: imageUrl}}
                style={[
                  styles.albumImage,
                  {
                    width: imageWidth,
                    height: imageHeight,
                    borderRadius: 20,
                    shadowColor: "black",
                    shadowOffset: { width: 1, height: -1 },
                    shadowRadius: 1,
                  },
                ]}
            />
          </View>
          <View style={shownOnResultList ? [styles.viewOnList,  { width: "50%"} ]: null}>
            <Text
                numberOfLines={1}
                ellipsizeMode={"tail"}
                style={
                  shownOnResultList
                      ? [styles.titleOnList]
                      : titleFontSize > 0
                          ? { fontSize: titleFontSize, marginTop: 10, fontWeight: "bold", width: imageWidth }
                          : [styles.title, { width: imageWidth}]
                }
            >
              {name}
            </Text>
            <Text
                style={
                  shownOnResultList
                      ? styles.artistOnList
                      : artistFontSize > 0
                          ? { fontSize: artistFontSize, marginTop: 10, color: "gray" }
                          : styles.artist
                }
            >
              {albumData.artistId.name}
            </Text>
            <View style={shownOnResultList ? styles.viewCountAndDuration : null}>
              {viewCount != null && showViewAndDuration && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesome name="play" size={15} style={styles.play} />
                    <Text style={styles.viewCount}>{viewCount}</Text>
                  </View>
              )}
              {duration != null && showViewAndDuration && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesome name="circle" size={6} style={styles.circle} />
                    <Text style={styles.duration}>{duration}</Text>
                  </View>
              )}
            </View>
          </View>
          {shownOnResultList && <View style={{ flexGrow: 3 }}></View> }
          {shownOnResultList && (
              <Pressable onPress={() => handleLike(albumData)}>
                <View style={[styles.followBtn, {borderColor: hasLiked ? "red" : "grey"}]}>
                  <Text style={[styles.followText, {color: hasLiked ? "red" : "grey"}]}>{ hasLiked ? "Unlike" : "Like"}</Text>
                </View>
              </Pressable>
          )}
        </View>
      </Pressable>
  );
};

const styles = StyleSheet.create({
  circle: {
    marginLeft: 10,
    color: "blue",
  },
  artistOnList: {
    marginVertical: 3,
    color: "grey",
  },
  viewCountAndDuration: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewOnList: {
    marginLeft: 10,
    marginTop: 10,
  },
  viewCount: {
    color: "grey",
    marginLeft: 8,
    fontSize: 15,
  },
  duration: {
    marginLeft: 10,
  },

  albumItem: {
    flexDirection: "column",
    marginRight: 20,
    marginTop: 100 && height < 800 ? 3 : 8,
  },

  albumItemOnList: {
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
    paddingVertical: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  name: {
    fontSize: getSize(15, 20,25),
    margin: 10,
    color: "black",
  },

  title: {
    fontSize: getSize(15, 20,25),
    color: "black",
    marginTop: 10,
  },

  titleOnList: {
    fontSize: 18,
    color: "black",
  },

  artist: {
    marginTop: 10,
    color: "gray",
    fontSize: getSize(12, 16,20),
  },

  albumImage: {
    marginTop: 10,
    shadowColor: "black",
    shadowOffset: { width: 1, height: -1 },
    shadowRadius: 1,
    shadowOpacity: 0.8, // Add shadowOpacity for better control
    elevation: 5,
  },
  followBtn: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 20,
  },
  followText: {
    fontSize: getSize(15, 16,22),
  },
});

export default AlbumItem;
