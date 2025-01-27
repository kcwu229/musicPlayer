import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Button,
} from "react-native";

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

const SearchResultPage = () => {
  return (
    <View>
      {artistResultData &&
        artistResultData.map((artist) => (
          <ArtistItem
            key={artist.id}
            artistData={artist}
            imageWidth={60}
            imageHeight={60}
            shownOnResultList={true}
            allowFollowButton={true}
          />
        ))}

      {albumResultData &&
        albumResultData.map((album) => (
          <AlbumItem
            key={album.id}
            albumData={album}
            imageWidth={60}
            imageHeight={60}
            shownOnResultList={true}
          />
        ))}
    </View>
  );
};

export default SearchResultPage;
