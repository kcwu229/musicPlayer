import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const clearSearch = (value) => {
    setSearchValue("");
  };

  return (
    <View style={styles.searchBar}>
      <FontAwesome name="search" size={20} style={styles.searchIcon} />
      <TextInput
        placeholder="What you want to listen to ..."
        placeholderTextColor="grey"
        marginLeft="8%"
        value={searchValue}
        onChangeText={handleSearchChange}
        style={styles.searchField}
      ></TextInput>
      {searchValue.length > 0 ? (
        <Pressable onPress={clearSearch} style={styles.closeIcon}>
          <AntDesign name="closecircle" size={20} />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignContent: "center",
    borderTopColor: "black",
    borderWidth: 1,
    borderRadius: 30,
    height: 50,
    alignItems: "center",
    marginTop: 15,
  },
  searchIcon: {
    left: "5%",
  },
  closeIcon: {
    right: "5%",
    position: "absolute",
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
