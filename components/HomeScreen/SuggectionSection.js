import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
    Platform
} from "react-native";
import getSize from "../AdjustSizeByScreenSize";
const { height, width } = Dimensions.get("window");

const SuggectionSection = ({ setSelectedTrack, handlePlayTrack, setTrackUrl, setIsPlaying, isPlaying }) => {
  const [trackList, setTrackList ] = useState([]);
  const handlePlayMusic =  (data) => {
    setIsPlaying(!isPlaying)
    setSelectedTrack(data);
    setTrackUrl(data.soundTrackUrl);
    handlePlayTrack(data.soundTrackUrl);
  };

  useEffect( ()=> {
    const fetchSuggestionTrack = async () => {
      const itemDisplayed = 8;
      const url = Platform.OS === "ios"
          ? process.env.EXPO_PUBLIC_BASE_URL + `track?limit=${itemDisplayed}`
          : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `track?limit=${itemDisplayed}`;

      try {
        const result = await fetch(url);
        if (result.ok) {
          const data = await result.json();
          setTrackList(data.data);
        }

      } catch (error) {
        console.log(error);
      }
    };
    fetchSuggestionTrack();
  }, [])

  return (
    <View>
      <Text style={styles.heading}>Suggestions For You</Text>
      <ScrollView
        style={[styles.suggestionList, { overflow: "visible" }]}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {trackList.map((data) => {
          return (
            <Pressable
              onPress={() => handlePlayMusic(data)}
              key={data._id}
            >
              <View style={styles.suggestItem}>
                <Image source={{uri: data.imageUrl}} style={styles.image} />
                <View style={styles.description}>
                  <Text style={styles.title}>{data.name.length > 10 ? data.name.substring(0, 10): data.name}</Text>
                  <Text style={styles.artist}>{data.artistId.name}</Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: getSize(20, 30,40),
    fontWeight: "bold",
    color: "black",
    marginTop: getSize(25, 30,40),
  },
  image: {
    height: getSize(height * 0.33, height * 0.25,height * 0.25),
    width: getSize(height * 0.4, height * 0.2,height * 0.2),
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 1, height: -1 },
    shadowRadius: 1,
    shadowOpacity: 0.8, // Add shadowOpacity for better control
    elevation: 5,
  },
  spacing: {
    flexGrow: 2,
  },
  suggestionList: {
    flexDirection: "row",
  },
  suggestItem: {
    flexDirection: "column",
    marginRight: 20,
    marginTop: getSize(15, 18, 20),
  },
  artist: {
    fontSize: getSize(13,15,18),
    color: "white",
    marginVertical: 3,
  },
  title: {
    fontSize: getSize(17,20,26),
    color: "white",
    fontWeight: "bold",
  },
  description: {
    position: "absolute",
    bottom: "0%",
    width: "100%",
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    borderRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    shadowColor: "black",
    shadowOffset: { width: 1, height: -1 },
    shadowRadius: 1,
  },
});

export default SuggectionSection;
