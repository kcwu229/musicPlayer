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
import TrackItem from "@/components/TrackItem";
import React, {useEffect, useState} from "react";
import AlbumItem from "@/components/AlbumItem";
const screenHeight = Dimensions.get("window").height;
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import {useNavigation} from "@react-navigation/native";
import CreateAlert from "@/components/AlertComponent";

const AlbumInfo = ({ route }) => {
  const { albumData } = route.params;
  const { selectedAlbumData } = albumData;
  const selectedAlbumId = selectedAlbumData._id;
  const { imageUrl, playCount } = selectedAlbumData;
  const albumName = selectedAlbumData.name;

  const {
    selectedTrack,
    setSelectedTrack,
    isMinimized,
    handleMinimizedScreen,
    isPlaying,
    setIsPlaying,
      setTrackUrl,
      handlePlayTrack,
  } = useMusicPlayer();
  const [isLiked, setIsLiked] = useState(false);
  const [trackList, setTrackList] = useState([]);
  const [seeMoreTrack, setSeeMoreTrack] = useState(false);
  const [hasPlayedInthisPage, setHasPlayedInthisPage] = useState(false);

  const handleLike = (name) => {

    if (true) {
      CreateAlert("Authentication Error", "Require login to follow artist");
    }
    else {
      if (isLiked === true) {
        console.log(`You haved unliked artist - ${albumName}`);
        setIsLiked(!isLiked);
      } else {
        console.log(`You haved liked artist - ${albumName}`);
        setIsLiked(!isLiked);
      }
    }
  };

  const formatplayCount = (count) => {
    if (count < 1000) return count.toString();
    if (count >= 1000 && count < 1000000) return (count / 1000).toFixed(1) + "K";
    if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
    return count.toString();
  };

  const handleRandomPlaying = () => {
    console.log("random playing");
  };

  const handlePlaying = (trackData) => {
    //console.log(trackData)
    isPlaying === true ? console.log("now play") : console.log("paused !");
    setIsPlaying(!isPlaying);
    if (trackData.length === 1){
      let data = trackData[0];
      setSelectedTrack(data);
      setHasPlayedInthisPage(true);
      handlePlayTrack(data.soundTrackUrl);
    }

    // todo: handle playing multiple tracks
    else if (trackData.length > 1) {
      let data = trackData[0];
      setSelectedTrack(data);
      setHasPlayedInthisPage(true);
      handlePlayTrack(data.soundTrackUrl);
    }
    else {
      console.error("Error: trackList is null or undefined");
    }

  };

  const handlePlayMusic = (data) => {
    setIsPlaying(!isPlaying);
    setSelectedTrack(data);
    setTrackUrl(data.soundTrackUrl);
    handlePlayTrack(data.soundTrackUrl);
  }

  const handleSeeMoreTrack = () => {
    setSeeMoreTrack(!seeMoreTrack);
  }
  const handleSeeMoreAlbum = () => {
    setSeeMoreAlbum(!seeMoreAlbum);
  }

  useEffect(() => {
    const fetchTrackList = async (albumId) => {
      const trackCount = 8;
      const url = process.env.EXPO_PUBLIC_BASE_URL + `track/album/${albumId}`
      //console.log(url)
      try {
        const result = await fetch(url);
        const data = await result.json();
        //console.log(data.data)
        setTrackList(data.data);
        //console.log(data.data)

      } catch (err) {
        console.log(err)
      }
    }

    fetchTrackList(selectedAlbumId)
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={styles.container}>
            <Image source={{uri: imageUrl}} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{albumName}</Text>
              <Text style={styles.playCount}>
                {formatplayCount(playCount)} Play Count
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Pressable onPress={() => handleLike(albumName)}>
                  {isLiked === true ? (
                      <View style={[styles.unLikeBtn]}>
                        <Text style={styles.unLikeText}>
                          UNLIKE
                        </Text>
                      </View>
                  ) : (
                      <View style={styles.likeBtn}>
                        <Text style={styles.likeText}>
                          LIKE
                        </Text>
                      </View>
                  )}
                </Pressable>
              </View>
              
              <View style={{ width: "10%" }}></View>
              <Pressable onPress={handleRandomPlaying}>
                <FontAwesome name="random" size={screenHeight > 800 ? 30 : 18} style={styles.btn} />
              </Pressable>

              <Pressable onPress={() => handlePlaying(trackList)}>
              {isPlaying === true && hasPlayedInthisPage === true?  (
                  <FontAwesome
                    name="pause-circle"
                    size={screenHeight > 800 ? 80 : 50}
                    style={styles.btn}
                  />
              ) : (
                  <FontAwesome
                    name="play-circle"
                    size={screenHeight > 800 ? 80 : 50}
                    style={styles.btn}
                  />
              )}
              </Pressable>
            </View>
          </View>


          <View style={{ margin: 24 }}>
            <View style={{ flexDirection: "row", alignItems:"center"}}>
              <Text style={styles.popularText}>Tracks</Text>
              <View style={{ flexGrow: 1}}></View>
              <Pressable onPress={() => handleSeeMoreTrack()}>
                <Text style={styles.seeAll}>See all</Text>
              </Pressable>
            </View>

            { trackList &&
                trackList.slice(0, seeMoreTrack? trackList.length: 6).map((track) => (
                    <Pressable
                        key={track._id}
                        onPress={() => handlePlayMusic(track)}
                    >
                        <View>
                          <TrackItem
                              trackData={track}
                              selectedTrack={selectedTrack}
                              imageWidth={screenHeight > 800 ? 140 : 60}
                              imageHeight={screenHeight > 800 ? 140 : 60}
                              shownOnResultList={true}
                              showViewAndDuration={true}

                              setSelectedTrack={setSelectedTrack}
                          />
                        </View>
                    </Pressable>)
                )}

          </View>

        </View>
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
              isPlaying={isPlaying}
            trackData={selectedTrack}
            isMinimized={isMinimized}
            handleMinimizedScreen={handleMinimizedScreen}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  seeAll: {
    color: "gray",
    marginTop: 10,
    fontSize: screenHeight > 100 && screenHeight < 800 ? 17 : 25,
    fontWeight: "thin",
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
    fontSize: screenHeight > 800 ? 35 :26,
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
    alignSelf: "center",
    justifyContent: "center"
  },

  name: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: screenHeight > 800 ? 45 : 30
  },

  playCount: {
    fontWeight: "200",
    marginTop: screenHeight > 800 ? 20 : 10,
    fontSize: screenHeight > 800 ? 28 : 16
  },

  space: {
    flexGrow: 4,
  },

  btn: {
    margin: 15,
  },

  image: {
    marginTop: "8%",
    height: screenHeight > 800 ? 250 : 160,
    width: screenHeight > 800 ? 250 : 160,
    borderRadius: 20,
    marginBottom: "3%",
  },

  likeText: {
    color: "grey",
    fontSize: screenHeight > 800 ? 22 : 16
  },
  unLikeText: {
    color: "red",
    fontSize: screenHeight > 800 ? 22 : 16
  },
  likeBtn: {
    borderRadius: 20,
    borderColor: "grey",
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 20,
  },
  unLikeBtn: {
    borderRadius: 20,
    borderColor: "red",
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 20,
  },
});



export default AlbumInfo;
