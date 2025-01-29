import React, { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";

import ArtistItem from "@/components/ArtistItem";
import AlbumItem from "@/components/AlbumItem";
const albumResultData = [
  {
    id: 1,
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    image: require("../../assets/images/future_nostalgia.jpeg"),
    viewCount: 20000,
    duration: "3:03",
  },
  {
    id: 2,
    title: "After Hours",
    artist: "The Weeknd",
    image: require("../../assets/images/after_hour.jpeg"),
    viewCount: 20000,
    duration: "3:03",
  },
  {
    id: 3,
    title: "Fine Line",
    artist: "Harry Styles",
    image: require("../../assets/images/fine_line.jpg"),
    viewCount: 20000,
    duration: "3:03",
  },
];

const artistResultData = [
  {
    id: 1,
    name: "Ariana Grande",
    image: require("../../assets/images/ariana_grande.png"),
    followerCount: 20000,
  },
  {
    id: 2,
    name: "Beyoncé",
    image: require("../../assets/images/beyonce.jpeg"),
    followerCount: 20000,
  },
  {
    id: 3,
    name: "Ed Sheeran",
    image: require("../../assets/images/ed_sheeran.jpeg"),
    followerCount: 20000,
  },
];

const SearchResultPage = ({ setSelectedAlbum }) => {
  const handleArtist = () => {
    console.log(`Artist`);
  };
  return (
    <View style={styles.container}>
      {artistResultData &&
        artistResultData.map((artist) => (
          <Pressable key={artist.id} onPress={handleArtist}>
            <ArtistItem
              artistData={artist}
              imageWidth={60}
              imageHeight={60}
              shownOnResultList={true}
              allowFollowButton={true}
            />
          </Pressable>
        ))}

      {albumResultData &&
        albumResultData.map((album) => (
          <Pressable key={album.id} onPress={() => setSelectedAlbum(album)}>
            <AlbumItem
              key={album.id}
              albumData={album}
              imageWidth={60}
              imageHeight={60}
              shownOnResultList={true}
              setSelectedAlbum={setSelectedAlbum}
              showViewAndDuration={true}
            />
          </Pressable>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
  },
});

export default SearchResultPage;
