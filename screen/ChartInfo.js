import FontAwesome from "react-native-vector-icons/FontAwesome";
import MusicPlayerScreen from "@/components/MusicPlayerPage/MusicPlayerScreen";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView, Platform,
} from "react-native";
import getSize from "../components/AdjustSizeByScreenSize";

import TrackItem from "@/components/TrackItem";
import React, {useEffect, useState} from "react";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import {LinearGradient} from "expo-linear-gradient";
import albumItem from "@/components/AlbumItem";

const ChartInfo = ({ route }) => {
  const { countryData, colorData } = route.params;
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
  const [trackList, setTrackList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [seeMoreTrack, setSeeMoreTrack] = useState(false);
  const [hasPlayedInthisPage, setHasPlayedInthisPage] = useState(false);

  const formatplayCount = (count) => {
    if (count < 1000) return count.toString();
    if (count >= 1000 && count < 1000000) return (count / 1000).toFixed(1) + "K";
    if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
    return count.toString();
  };

  const handleRandomPlaying = () => {
    console.log("random playing");
  };

  const handlePlaying = (trackListItems) => {
    isPlaying === true ? console.log("now play") : console.log("paused !");
    if (trackListItems.length === 1) {
      let data = trackListItems[0];
      setHasPlayedInthisPage(true);
      setIsPlaying(!isPlaying);
      setSelectedTrack(data);
      handlePlayTrack(data.soundTrackUrl);
    }
    else if (trackListItems.length > 1) {
      let data = trackListItems[0];
      setHasPlayedInthisPage(true);
      setIsPlaying(!isPlaying);
      setSelectedTrack(data);
      handlePlayTrack(data.soundTrackUrl);
    }
    else {
        console.error("Error: trackList is null or undefined");
    }

  };

  const handlePlayMusic = (data) => {
    setHasPlayedInthisPage(true);
    setIsPlaying(!isPlaying);
    setSelectedTrack(data);
    setTrackUrl(data.soundTrackUrl);
    handlePlayTrack(data.soundTrackUrl);
  }

  const handleLike = (name) => {
    if (isLiked === true) {
      console.log(`You haved unliked the Top 50 ${name} Tracks`);
      setIsLiked(!isLiked);
    } else {
      console.log(`You haved liked the Top 50 ${name} Tracks`);
      setIsLiked(!isLiked);
    }
  };


  useEffect(() => {
    const fetchTrackList = async (countryName) => {
      const resultLimit = 50;

      const url = Platform.OS === "ios"
          ? process.env.EXPO_PUBLIC_BASE_URL + `track/country/${countryName}?limit=${resultLimit}`
          : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `track/country/${countryName}?limit=${resultLimit}`;

      try {
        const result = await fetch(url);
        const data = await result.json();
        setTrackList(data.data);

      } catch (err) {
        console.log(err)
      }
    }

    fetchTrackList(countryData)
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={styles.container}>
            <View
                style={[styles.chartItem, { backgroundColor: colorData }]}
            >
              <View style={[styles.chartImage, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                <Text style={styles.title}>Top 50</Text>
                <Text style={styles.region}>{countryData}</Text>
              </View>
            </View>

            <Text style={styles.name}>Top 50 {countryData} Tracks</Text>

            <View style={styles.buttonContainer}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Pressable onPress={() => handleLike(albumItem)}>
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
                <FontAwesome name="random" size={getSize(18, 22, 30)} style={styles.btn} />
              </Pressable>

              <Pressable onPress={() => handlePlaying(trackList)}>
              {isPlaying === true && hasPlayedInthisPage === true? (
                  <FontAwesome
                    name="pause-circle"
                    size={getSize(50, 65, 80)}
                    style={styles.btn}
                  />

              ) : (

                  <FontAwesome
                    name="play-circle"
                    size={getSize(50, 65, 80)}
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
            </View>

            { trackList &&
                trackList.map((track) => (
                    <Pressable
                        key={track._id}
                        onPress={() => handlePlayMusic(track)}
                    >
                      <TrackItem
                          trackData={track}
                          selectedTrack={selectedTrack}
                          imageWidth={getSize(60, 90, 140)}
                          imageHeight={getSize(60, 89, 140)}
                          shownOnResultList={true}
                          showViewAndDuration={true}
                          setSelectedTrack={setSelectedTrack}
                      />
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
  title: {
    fontSize: getSize(14, 16, 20),
    color: "white",
    margin: 10,
    fontWeight: "bold",
  },
  region: {
    fontSize: getSize(18, 22, 30),
    color: "white",
    margin: 10,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  chartItem: {
    flexDirection: "column",
    marginRight: 20,
    height: getSize(100, 150, 200),
    width: getSize(100, 150, 200),
    opacity: 0.5,
    marginTop: getSize(15, 18, 20),
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 1, height: -1 },
    shadowRadius: 1,
    shadowOpacity: 0.8, // Add shadowOpacity for better control
    elevation: 5,
  },
  seeAll: {
    color: "gray",
    marginTop: 10,
    fontSize: getSize(17, 20 , 25),
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
    fontSize: getSize(26, 30, 35),
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
    marginTop: getSize(10,15,20),
    fontSize: getSize(30,35,45),
  },

  playCount: {
    fontWeight: "200",
    marginTop: getSize(10,15,20),
    fontSize: getSize(16, 22, 28),
  },

  space: {
    flexGrow: 4,
  },

  btn: {
    margin: 15,
  },
  image: {
    marginTop: "8%",
    height: getSize(160, 200,250),
    width: getSize(160, 200,250),
    borderRadius: 20,
    marginBottom: "3%",
  },

  likeText: {
    color: "grey",
    fontSize: getSize(16, 18,22)
  },
  unLikeText: {
    color: "red",
    fontSize: getSize(16, 18,22)
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



export default ChartInfo;
