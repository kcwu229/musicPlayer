import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions, Text,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";

const { height, width } = Dimensions.get("window");

const SearchBar = (
    {  inputting, setInputting }
) => {
  const [isInputting, setIsInputting] = useState(inputting)
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const clearSearch = (value) => {
    setSearchValue("");
  };

  const maginLeftCalculator = () => {
    let marginLeftPercentage = "3%";
    if (width > 100 && width < 600) marginLeftPercentage = "8%";
    return marginLeftPercentage;
  };

  return (
    <View style={styles.searchBar}>
      {isInputting ? (
          <>
            <FontAwesome name="search" size={20} style={styles.searchIcon} />
            <TextInput
                onFocus={() => {
                  console.log(inputting)
                  setIsInputting(!inputting)
                  setInputting(!inputting)
                }}
                onBlur={() => console.log("focus lost") }
                placeholder="What you want to listen to ..."
                placeholderTextColor="grey"
                marginLeft={maginLeftCalculator()}
                value={searchValue}
                onChangeText={handleSearchChange}
                style={styles.searchField}
            ></TextInput>
          </>
      ) : (
          <>
            <FontAwesome name="search" size={20} style={styles.searchIcon} />
            <TextInput
                onFocus={() => setIsInputting(!isInputting)}
                onBlur={() => console.log("focus lost") }
                placeholder="What you want to listen to ..."
                placeholderTextColor="grey"
                marginLeft={maginLeftCalculator()}
                value={searchValue}
                onChangeText={handleSearchChange}
                style={styles.searchField}
            ></TextInput>
            {searchValue.length > 0 ? (
                <Pressable onPress={clearSearch} style={styles.closeIcon}>
                  <AntDesign name="closecircle" size={20} />
                </Pressable>
            ) : null}
          </>
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
