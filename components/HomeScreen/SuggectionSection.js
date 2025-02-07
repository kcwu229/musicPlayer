import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";

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
      const url = process.env.EXPO_PUBLIC_BASE_URL + `track?limit=${itemDisplayed}`;
      //console.log(url);
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
    fontSize: height > 100 && height < 800 ? 20 : 40,
    fontWeight: "bold",
    color: "black",
    marginTop: height > 100 && height < 800 ? 25 : 40,
  },
  image: {
    height: height > 100 && height < 800 ? height * 0.33 : height * 0.25,
    width: width > 100 && width < 600 ? width * 0.4 : width * 0.2,
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
    marginTop: height > 100 && height < 800 ? 15 : 20,
  },
  artist: {
    fontSize: height > 100 && height < 800 ? 13 : 18,
    color: "white",
    marginVertical: 3,
  },
  title: {
    fontSize: height > 100 && height < 800 ? 17 : 26,
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
