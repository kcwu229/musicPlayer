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
import { BASE_URL } from "@env"

const ArtistInfo = ({ route }) => {
  const { artistData } = route.params;
  const { selectedArtistData } = artistData;
  //console.log(selectedArtistData)
  const artistId = selectedArtistData._id;
  const { imageUrl, followerCount, description, genres } = selectedArtistData;
  const artistName = selectedArtistData.name;
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

  const formatFollowerCount = (count) => {
    if (count < 1000) return count.toString();
    if (count >= 1000 && count < 1000000) return (count / 1000).toFixed(1) + "K";
    if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
    return count.toString();
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
      const getAlbumUrl = BASE_URL + `album/artist/${artistId}?limit=${artistCount}`

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
      const getTrackUrl = BASE_URL + `track/artist/${artistId}?limit=${trackCount}`
      //console.log(url)
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
                <FontAwesome name="random" size={screenHeight > 800 ? 34 : 18} style={styles.btn} />
              </Pressable>
              {isPlaying ? (
                <Pressable onPress={handlePlaying}>
                  <FontAwesome
                    name="pause-circle"
                    size={screenHeight > 800 ? 80 : 50}
                    style={styles.btn}
                  />
                </Pressable>
              ) : (
                <Pressable onPress={handlePlaying}>
                  <FontAwesome
                    name="play-circle"
                    size={screenHeight > 800 ? 80 : 50}
                    style={styles.btn}
                  />
                </Pressable>
              )}
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
                      imageWidth={screenHeight > 800 ? 140 :100}
                      imageHeight={screenHeight > 800 ? 140 :100}
                      artistFontSize={12}
                      titleFontSize={screenHeight > 800 ? 22 : 14}
                      shownOnResultList={false}
                      setSelectedAlbum={setSelectedAlbum}
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
                          imageWidth={screenHeight > 800 ? 140 :100}
                          imageHeight={screenHeight > 800 ? 140 :100}
                          shownOnResultList={true}
                          showViewAndDuration={true}
                          setSelectedAlbum={setSelectedAlbum}
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
    fontSize: screenHeight > 800 ? 25 : 17,
    marginTop: 15,
    lineHeight: screenHeight > 800 ? 35 : 30,
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
  tagContainer: {
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
    marginTop: screenHeight > 800 ? 20 : 10,
    fontSize: screenHeight > 800 ? 45 : 30,
  },

  followerCount: {
    fontWeight: "200",
    marginTop: 10,
    fontSize: screenHeight > 800 ? 34 : 16,
  },

  space: {
    flexGrow: 4,
  },

  btn: {
    margin: 15,
  },

  image: {
    marginTop: "8%",
    height: screenHeight > 800 ? 200 : 160,
    width: screenHeight > 800 ? 200 : 160,
    borderRadius: 100,
  },

  followText: {
    color: "grey",
    fontSize: screenHeight > 800 ? 24 : 14
  },
  unfollowText: {
    color: "red",
    fontSize: screenHeight > 800 ? 24 : 14
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
