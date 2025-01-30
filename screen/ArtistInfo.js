import FontAwesome from "react-native-vector-icons/FontAwesome";
import MusicPlayerScreen from "@/components/MusicPlayerPage/MusicPlayerScreen";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import AlbumItem from "../components/AlbumItem";
const screenHeight = Dimensions.get("window").height;
import { useMusicPlayer } from "../context/MusicPlayerContext";

const popularAlbumData = [
  {
    id: 1,
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    image: require("@/assets/images/future_nostalgia.jpeg"),
  },
  {
    id: 2,
    title: "After Hours",
    artist: "The Weeknd",
    image: require("@/assets/images/after_hour.jpeg"),
  },
  {
    id: 3,
    title: "Fine Line",
    artist: "Harry Styles",
    image: require("@/assets/images/fine_line.jpg"),
  },
];

const albumData = [
  {
    id: 2,
    title: "After Hours",
    artist: "The Weeknd",
    image: require("@/assets/images/after_hour.jpeg"),
  },
  {
    id: 1,
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    image: require("@/assets/images/future_nostalgia.jpeg"),
  },

  {
    id: 3,
    title: "Fine Line",
    artist: "Harry Styles",
    image: require("@/assets/images/fine_line.jpg"),
  },
];

const ArtistInfo = ({ route }) => {
  const { artistData } = route.params;
  const { selectedArtistData } = artistData;
  const { artist, image, followerCount, description } = selectedArtistData;
  const {
    selectedAlbum,
    setSelectedAlbum,
    isMinimized,
    handleMinimizedScreen,
  } = useMusicPlayer();
  const [initialPlayMusic, setInitialPlayMusic] = useState(false);
  const [hasFollowed, setHasFollow] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFollow = (name) => {
    if (hasFollowed === true) {
      console.log(`You haved unfollow artist - ${name}`);
      setHasFollow(!hasFollowed);
    } else {
      console.log(`You haved follow artist - ${name}`);
      setHasFollow(!hasFollowed);
    }
  };

  const handleMoreOption = () => {
    console.log("more option !");
  };

  const handleRandomPlaying = () => {
    console.log("random playing");
  };

  const handlePlaying = () => {
    isPlaying === true ? console.log("now play") : console.log("paused !");
    setIsPlaying(!isPlaying);
  };

  const handleSelectSong = (album) => {
    setSelectedAlbum(album);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={styles.container}>
            <Image source={image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{artist}</Text>
              <Text style={styles.followerCount}>
                {followerCount} Followers{" "}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <Pressable onPress={() => handleFollow(artist)}>
                {hasFollowed === true ? (
                  <View style={[styles.unfollowBtn]}>
                    <Text style={styles.unfollowText}>Unfollow</Text>
                  </View>
                ) : (
                  <View style={styles.followBtn}>
                    <Text style={styles.followText}>Follow</Text>
                  </View>
                )}
              </Pressable>

              <Pressable onPress={handleMoreOption}>
                <FontAwesome name="ellipsis-h" size={18} style={styles.btn} />
              </Pressable>
              <View style={{ width: "10%" }}></View>
              <Pressable onPress={handleRandomPlaying}>
                <FontAwesome name="random" size={18} style={styles.btn} />
              </Pressable>
              {isPlaying ? (
                <Pressable onPress={handlePlaying}>
                  <FontAwesome
                    name="pause-circle"
                    size={50}
                    style={styles.btn}
                  />
                </Pressable>
              ) : (
                <Pressable onPress={handlePlaying}>
                  <FontAwesome
                    name="play-circle"
                    size={50}
                    style={styles.btn}
                  />
                </Pressable>
              )}
            </View>
          </View>

          <View style={{ margin: 24 }}>
            <Text style={styles.popularText}>Popular</Text>
            {popularAlbumData &&
              popularAlbumData.map((album) => (
                <Pressable
                  key={album.id}
                  onPress={() => handleSelectSong(album)}
                >
                  <AlbumItem
                    key={album.id}
                    albumData={album}
                    imageWidth={60}
                    imageHeight={60}
                    shownOnResultList={true}
                    setSelectedAlbum={setSelectedAlbum}
                  />
                </Pressable>
              ))}
          </View>

          <View style={{ margin: 24 }}>
            <Text style={styles.popularText}>Albums</Text>
            <ScrollView
              style={([styles.albumList], { overflow: "visible" })}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {albumData &&
                albumData.map((album) => (
                  <Pressable
                    key={album.id}
                    onPress={() => handleSelectSong(album)}
                  >
                    <AlbumItem
                      albumData={album}
                      imageWidth={100}
                      imageHeight={100}
                      artistFontSize={12}
                      titleFontSize={14}
                      shownOnResultList={false}
                      setSelectedAlbum={setSelectedAlbum}
                    />
                  </Pressable>
                ))}
            </ScrollView>
          </View>

          <View style={{ margin: 24 }}>
            <Text style={styles.popularText}>About</Text>
            <Image source={image} style={styles.aboutImage} />
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
        </View>
      </ScrollView>

      {selectedAlbum && (
        <View
          style={
            isMinimized
              ? styles.minimizedScreenContainer
              : styles.fullScreenContainer
          }
        >
          <MusicPlayerScreen
            albumData={selectedAlbum}
            isMinimized={isMinimized}
            handleMinimizedScreen={handleMinimizedScreen}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionText: {
    color: "grey",
    fontSize: 17,
    marginTop: 15,
    lineHeight: 30,
  },
  aboutImage: {
    marginTop: 20,
    width: "100%",
    borderRadius: 15,
    height: screenHeight * 0.3,
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
    flex: 1,
    zIndex: 1,
  },
  minimizedScreen: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
    flex: 1,
    zIndex: 1,
  },
  popularText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },

  textContainer: {
    flex: 1,
    alignItems: "center",
  },

  name: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 30,
  },

  followerCount: {
    fontWeight: "200",
    marginTop: 10,
    fontSize: 16,
  },

  space: {
    flexGrow: 4,
  },

  btn: {
    margin: 15,
  },

  image: {
    marginTop: "8%",
    height: 160,
    width: 160,
    borderRadius: 100,
  },

  followText: {
    color: "grey",
  },
  unfollowText: {
    color: "red",
  },
  followBtn: {
    borderRadius: 20,
    borderColor: "grey",
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 20,
  },
  unfollowBtn: {
    borderRadius: 20,
    borderColor: "red",
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 20,
  },
});

export default ArtistInfo;
