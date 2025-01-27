import React from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import TopBanner from "@/components/HomeScreen/TopBanner";
import SearchBar from "@/components/HomeScreen/SearchBar";
import SuggestionSection from "@/components/HomeScreen/SuggectionSection";
import ChartSection from "@/components/HomeScreen/ChartSection";
import TrendingAlbumSection from "@/components/HomeScreen/TrendingAlbumSection";
import PopularArtistSection from "@/components/HomeScreen/PopularArtistSection";

const name = "Sam";

const HomeScreen = () => (
  <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    <View>
      <TopBanner />
      <Text style={styles.text}>Good morning,</Text>
      <Text style={styles.name}>{name}</Text>
      <SearchBar />
      <SuggestionSection />
      <ChartSection />
      <TrendingAlbumSection />
      <PopularArtistSection />
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "ultralight",
    color: "darkgrey",
  },
  name: { fontSize: 30, fontWeight: "normal" },
  container: {
    flex: 1,
    padding: 20,
  },
  main: {
    justifyContent: "center",
    marginHorizontal: "auto",
  },
});

export default HomeScreen;
