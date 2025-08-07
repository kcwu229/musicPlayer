import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
  Text,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";

const { height, width } = Dimensions.get("window");

const SearchBar = ({ inputting, setInputting, setSearchKeyWord }) => {
  const [isInputting, setIsInputting] = useState(inputting);
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (value) => {
    setSearchKeyWord(value);
    setSearchValue(value);
  };

  const clearSearch = (value) => {
    setSearchKeyWord("");
    setSearchValue("");
  };

  const maginLeftCalculator = () => {
    let marginLeftPercentage = "3%";
    if (width > 100 && width < 600) marginLeftPercentage = "8%";
    return marginLeftPercentage;
  };

  return (
    <View style={styles.searchBar}>
      <FontAwesome name="search" size={20} style={styles.searchIcon} />
      <TextInput
        onFocus={() => setIsInputting(true)} // Set to true only
        onBlur={() => console.log("focus lost")}
        placeholder="What you want to listen to ..."
        placeholderTextColor="grey"
        marginLeft={maginLeftCalculator()}
        value={searchValue}
        onChangeText={handleSearchChange}
        style={styles.searchField}
      />
      {searchValue.length > 0 && (
        <Pressable onPress={clearSearch} style={styles.closeIcon}>
          <AntDesign name="closecircle" size={20} />
        </Pressable>
      )}
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
    left: width > 100 && width < 600 ? "5%" : "2%",
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
