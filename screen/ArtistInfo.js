import FontAwesome from "react-native-vector-icons/FontAwesome";
import MusicPlayerScreen from "@/components/MusicPlayerPage/MusicPlayerScreen";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  ScrollView, Platform,
} from "react-native";
import TrackItem from "@/components/TrackItem";
import React, {useEffect, useState} from "react";
import AlbumItem from "@/components/AlbumItem";
const screenHeight = Dimensions.get("window").height;
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import CreateAlert from "@/components/AlertComponent";
import getSize from "../components/AdjustSizeByScreenSize";

const ArtistInfo = ({ route }) => {
  const { artistData } = route.params;
  const { selectedArtistData } = artistData;
  const artistId = selectedArtistData._id;
  const { imageUrl, followerCount, description, genres } = selectedArtistData;
  const artistName = selectedArtistData.name;
  const {
    selectedTrack,
    setSelectedTrack,
    isMinimized,
    handleMinimizedScreen,
      isPlaying,
      setIsPlaying,
      handlePlayTrack,
  } = useMusicPlayer();
  const [hasFollowed, setHasFollow] = useState(false);
  const [hasPlayedInthisPage, setHasPlayedInthisPage] = useState(false);

  const handleFollow = (name) => {
    if (true) {
      CreateAlert("Authentication Error", "Require login to follow artist");
    }

    else {
      if (hasFollowed === true) {
        console.log(`You haved unfollow artist - ${name}`);
        setHasFollow(!hasFollowed);
      } else {
        console.log(`You haved follow artist - ${name}`);
        setHasFollow(!hasFollowed);
      }
    }
  };

  const formatFollowerCount = (count) => {
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
    //console.log(trackListItems);
    if (trackListItems.length > 1) {
      let data = trackListItems[0]
      setIsPlaying(!isPlaying);
      setSelectedTrack(data);
      setHasPlayedInthisPage(true);
      handlePlayTrack(data.soundTrackUrl);
    }

    else if (trackListItems.length === 1) {
      let data = trackListItems[0]
      setIsPlaying(!isPlaying);
      setSelectedTrack(data);
      setHasPlayedInthisPage(true);
      handlePlayTrack(data.soundTrackUrl);
    }
    else {
      console.error("Error: trackList is null or undefined");
    }

  };

  const handleSelectSong = (trackData) => {
    setSelectedTrack(trackData);
    setIsPlaying(!isPlaying);
    setHasPlayedInthisPage(true);
    handlePlayTrack(trackData.soundTrackUrl);
  };

  const [albumList, setAlbumList] = useState([]);
  const [trackList, setTrackList] = useState([]);
  const [seeMoreTrack, setSeeMoreTrack] = useState(false);
  const [seeMoreAlbum, setSeeMoreAlbum] = useState(false);


  const handleSeeMoreAlbum = () => {
    setSeeMoreAlbum(!seeMoreAlbum);
  }

  const handleSeeMoreTrack = () => {
    setSeeMoreTrack(!seeMoreAlbum);
  }

  useEffect(() => {
    const fetchAlbumList = async (artistId) => {
      const artistCount = 8;
      const getAlbumUrl = Platform.OS === "ios"
          ? process.env.EXPO_PUBLIC_BASE_URL + `album/artist/${artistId}?limit=${artistCount}`
          : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `album/artist/${artistId}?limit=${artistCount}`;


      try {
        const result = await fetch(getAlbumUrl);
        const data = await result.json();
        setAlbumList(data.data);

      } catch (err) {
        console.log(err)
      }
    }

    const fetchTrackList = async (artistId) => {
      const trackCount = 8;

      const getTrackUrl = Platform.OS === "ios"
          ? process.env.EXPO_PUBLIC_BASE_URL + `track/artist/${artistId}?limit=${trackCount}`
          : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `track/artist/${artistId}?limit=${trackCount}`;

      try {
        const result = await fetch(getTrackUrl);
        const data = await result.json();
        //console.log(data.data)
        setTrackList(data.data);
        //console.log(data.data)

      } catch (err) {
        console.log(err)
      }
    }

    fetchAlbumList(artistId);
    fetchTrackList(artistId)
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
              <Text style={styles.name}>{artistName}</Text>
              <Text style={styles.followerCount}>
                {formatFollowerCount(followerCount)} Followers
              </Text>
            </View>

            <View style={styles.tagContainer}>
              {genres.length > 0 && (
                  genres.map((genre) => (
                      <View key={genre._id} style={[styles.genreBadge]}>
                        <Text style={[styles.followText, {color: "orange"}]}>{genre.name}</Text>
                      </View>
                  ))
              )}
            </View>

            <View style={styles.buttonContainer}>
              <Pressable onPress={() => handleFollow(artistName)}>
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
              <View style={{ width: "10%" }}></View>
              <Pressable onPress={handleRandomPlaying}>
                <FontAwesome name="random" size={getSize(18, 26, 34)} style={styles.btn} />
              </Pressable>

              <Pressable onPress={() => handlePlaying(trackList)}>
              {isPlaying === true && hasPlayedInthisPage === true ? (
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
              <Text style={styles.popularText}>Albums</Text>
              <View style={{ flexGrow: 1}}></View>
              <Pressable onPress={() => handleSeeMoreAlbum()}>
                <Text style={styles.seeAll}>See all</Text>
              </Pressable>
            </View>
            <ScrollView
              style={([styles.albumList], { overflow: "visible" })}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {albumList &&
                  albumList.slice(0, seeMoreAlbum ? albumList.length : 6).map((album) => (
                  <Pressable
                    key={album._id}
                    onPress={() => navigateToAlbumInfoPage(album)}
                  >
                    <AlbumItem
                      albumData={album}
                      imageWidth={getSize(100,100,140)}
                      imageHeight={getSize(100,100,140)}
                      artistFontSize={12}
                      titleFontSize={getSize(14,18,22)}
                      shownOnResultList={false}
                      setSelectedTrack={setSelectedTrack}
                    />
                  </Pressable>
                ))}
            </ScrollView>
          </View>

          <View style={{ margin: 24 }}>
            <View style={{ flexDirection: "row", alignItems:"center"}}>
              <Text style={styles.popularText}>Popular</Text>
              <View style={{ flexGrow: 1}}></View>
              <Pressable onPress={() => handleSeeMoreTrack()}>
                <Text style={styles.seeAll}>See all</Text>
              </Pressable>
            </View>
            { trackList &&
                trackList.slice(0, seeMoreTrack? trackList.length: 6).map((track, index) => (
                    <Pressable
                        key={track._id}
                        onPress={() => handleSelectSong(track)}
                    >
                      <TrackItem
                          trackData={track}
                          selectedTrack={selectedTrack}
                          imageWidth={getSize(100 , 100, 140)}
                          imageHeight={getSize(100 , 100, 140)}
                          shownOnResultList={true}
                          showViewAndDuration={true}
                          setSelectedTrack={setSelectedTrack}
                      />
                    </Pressable>)
                )}
          </View>

          <View style={{ margin: 24 }}>
            <Text style={styles.popularText}>About</Text>
            <Image source={{uri: imageUrl}} style={styles.aboutImage} />
            <Text style={styles.descriptionText}>{description}</Text>
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
              setIsPlaying={setIsPlaying}
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
  descriptionText: {
    color: "grey",
    fontSize: getSize(17,20,25),
    marginTop: 15,
    lineHeight: getSize(30,32,35),
  },
  aboutImage: {
    marginTop: 20,
    width: "100%",
    borderRadius: 15,
    height: screenHeight * 0.3,
  },
  seeAll: {
    color: "gray",
    marginTop: 10,
    fontSize: getSize(17, 22, 25),
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
    fontSize: getSize(26, 30,35),
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  tagContainer: {
    flexWrap: "wrap",
    gap: 3,
    justifyContent:"center",
    marginHorizontal: "2%",
    marginTop: "2%",
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
    marginTop: getSize(10,15,20),
    fontSize: getSize(30,31,45)
  },

  followerCount: {
    fontWeight: "200",
    marginTop: 10,
    fontSize: getSize(16,22,34),
  },

  space: {
    flexGrow: 4,
  },

  btn: {
    margin: 15,
  },

  image: {
    marginTop: "8%",
    height: getSize(160,180,200),
    width: getSize(160,180,200),
    borderRadius: 100,
  },

  followText: {
    color: "grey",
    fontSize: getSize(14,16,24),
    textTransform: "uppercase"
  },
  unfollowText: {
    color: "red",
    fontSize: getSize(14,16,24),
  },
  genreBadge: {
    borderRadius: 10,
    borderColor: "orange",
    borderWidth: 2,
    padding: 10,
    paddingHorizontal: 20,
    margin: "1%"
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
