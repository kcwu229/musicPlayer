import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";

const mockSuggestionData = [
  {
    id: 1,
    artist: "Taylor Swift",
    title: "Love Story",
    image: require("../../assets/images/taylor_swift.png"),
    viewCount: 20000,
    duration: "3:03",
    likeCount: 20000,
    commentCount: 20000,
  },
  {
    id: 2,
    artist: "Ed Sheeran",
    title: "Shape of You",
    image: require("../../assets/images/ed_sheeran.jpeg"),
    viewCount: 20000,
    duration: "3:03",
    likeCount: 20000,
    commentCount: 20000,
  },
  {
    id: 3,
    artist: "Adele",
    title: "Hello",
    image: require("../../assets/images/adele.jpeg"),
    viewCount: 20000,
    duration: "3:03",
    likeCount: 20000,
    commentCount: 20000,
  },
];

const SuggectionSection = ({ setSelectedAlbum }) => {
  const handlePlayMusic = (data) => {
    setSelectedAlbum(data);
  };

  return (
    <View>
      <Text style={styles.heading}>Suggestions For You</Text>
      <ScrollView
        style={[styles.suggestionList, { overflow: "visible" }]}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {mockSuggestionData.map((data) => {
          return (
            <Pressable
              onPress={() => {
                console.log(data.artist);
                handlePlayMusic(data);
              }}
              key={data.id}
            >
              <View style={styles.suggestItem}>
                <Image source={data.image} style={styles.image} />
                <View style={styles.description}>
                  <Text style={styles.title}>{data.title}</Text>
                  <Text style={styles.artist}>{data.artist}</Text>
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
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
    marginTop: 40,
  },
  image: {
    height: 350,
    width: 200,
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
    marginTop: 20,
  },
  artist: {
    fontSize: 18,
    color: "white",
    marginVertical: 3,
  },
  title: {
    fontSize: 26,
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
