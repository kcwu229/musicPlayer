import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = () => (
  <View style={styles.searchBar}>
    <Ionicons name="search" size={20} style={styles.searchIcon} />
    <TextInput
      placeholder="What you want to listen to"
      marginLeft={10}
      style={styles.searchField}
    ></TextInput>
  </View>
);

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignContent: "center",
    borderTopColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    height: 50,
    alignItems: "center",
    marginTop: 15,
  },
  searchIcon: {
    marginLeft: 20,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  searchField: {
    height: 46,
  },
});

export default SearchBar;
