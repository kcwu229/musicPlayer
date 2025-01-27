import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import SearchBar from "@/components/HomeScreen/SearchBar";
import SearchResultPage from "@/components/SearchScreen/SearchResultPage";

const SearchScreen = () => (
  <View style={styles.container}>
    <Text style={styles.Search}>Search</Text>
    <SearchBar />
    <SearchResultPage />
  </View>
);

const styles = StyleSheet.create({
  Search: {
    fontSize: 35,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});

export default SearchScreen;
