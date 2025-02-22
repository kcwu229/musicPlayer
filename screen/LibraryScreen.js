import React, {useEffect, useState} from "react";
import {View, StyleSheet, Text, Platform, StatusBar, Image, Pressable} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import SearchBar from "@/components/HomeScreen/SearchBar";
import SearchResultPage from "@/components/SearchScreen/SearchResultPage";
import MusicPlayerScreen from "@/components/MusicPlayerPage/MusicPlayerScreen";
import {useMusicPlayer} from "@/context/MusicPlayerContext";
import getSize from "@/components/AdjustSizeByScreenSize";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import userIcon from "@/assets/images/icon.jpg";
import {useUserContext} from "@/context/UserContext";
import unknownUserIcon from "@/assets/images/unknown.png";

const LibraryScreen = ({navigation}) => {

  const screenList = ["Playlists", "Artists", "Albums", "Tracks", "Genres"];
  const navigateScreenList = ["Playlists", "Artists","Albums","Tracks","Genres"]
  const logoList = ["list", "microphone", "cube", "music", "tags"];
  const [recentAddedList, setRecentAddedList] = useState(null);

  const {
    selectedTrack,
    setSelectedTrack,
    isMinimized,
    handleMinimizedScreen,
    handlePlayTrack,
    setTrackUrl,
    isPlaying,
    setIsPlaying
  } = useMusicPlayer();

  const {token, logout, username} = useUserContext()

  useEffect(() => {
    try {
      const url = "";
    }
    catch (err) {
      throw new Error(err)
    }
  }, [])


  return (
      <View style={styles.container}>
        <ScrollView style={{ padding: 24 }} showsVerticalScrollIndicator={false}>
          <View style={styles.topBannerContainer}>
            <Text style={styles.libraryText}>Library</Text>
            <View style={{flexGrow:1}}></View>
            <Pressable onPress={() => token.length === 0  ? navigation.navigate("LoginScreen") : logout()}>
              {token
                  ? <View style={[styles.userIcon, { justifyContent: "center", alignItems: "center" }]}><Text style={{fontSize: 28}}>{username.substring(0, 1)}</Text></View>
                  : <Image source={unknownUserIcon} style={styles.userIcon} />
             }
            </Pressable>
          </View>
          {screenList.map((screenName, index) => {
            return (
                <View style={styles.screenItemOnList} key={index}>
                  <Pressable onPress={() => navigation.navigate(navigateScreenList[index])}>
                    <View style={styles.screenList}>
                      <View style={{width: getSize(14, 20, 24)}}>
                        <FontAwesome name={logoList[index]} size={getSize(10, 18, 22)} style={styles.icon} />
                      </View>
                      <Text style={styles.nameOnList}>{screenName}</Text>
                      <View style={{ flexGrow: 1}}></View>
                      <FontAwesome name="chevron-right" size={getSize(10, 15, 15)} />
                    </View>
                  </Pressable>
            </View>)
          })}

        </ScrollView>
        {selectedTrack && (
            <View
                style={
                  isMinimized
                      ? styles.minimizedScreenContainer
                      : styles.fullScreenContainer
                }
            >
              <MusicPlayerScreen
                  trackData={selectedTrack}
                  isMinimized={isMinimized}
                  handleMinimizedScreen={handleMinimizedScreen}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
              />
            </View>
        )}
      </View>
  );
};


const styles = StyleSheet.create({
  topBannerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userIcon: {
    width: getSize(45,55,70),
    height: getSize(45,55,70),
    borderRadius: 100,
    margin: 5,
    borderColor: "purple",
    borderWidth: 2,
  },
  NoFoundText: {
    marginTop: "25%",
    fontSize: getSize(15, 20, 30),
    fontWeight: "300",
  },
  libraryText: {
    marginTop: Platform.OS === "ios" ? StatusBar.currentHeight + 20 : 0,
    fontSize: getSize(32, 35, 50),
    fontWeight: "bold",
  },
  minimizedScreen: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    padding: 0,
  },
  icon: {
    color: "purple",
    textAlign: "center"
  },
  recentlyAdded: {
    fontSize: getSize(26, 30, 40),
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor:"white"
  },
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
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    flex: 1,
    zindex: 1,
    backgroundColor: "black",
  },
  screenItemOnList: {
    flex: 1,
    marginLeft: 5,
    paddingTop: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: StyleSheet.hairlineWidth,
  },
  nameOnList: {
    fontSize: 20,
    margin: 10,
    color: "black",
    marginLeft: 10,
    textAlign: "left"
  },
  screenList: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default LibraryScreen;
