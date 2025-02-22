import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Dimensions, StatusBar, Platform, FlatList} from "react-native";
import SearchBar from "@/components/HomeScreen/SearchBar";
import SearchResultPage from "@/components/SearchScreen/SearchResultPage";
import MusicPlayerScreen from "@/components/MusicPlayerPage/MusicPlayerScreen";
import { useMusicPlayer } from "../context/MusicPlayerContext";
import { ScrollView } from "react-native-gesture-handler";
import getSize from "../components/AdjustSizeByScreenSize";
const { height } = Dimensions.get("window");
import {useUserContext} from "@/context/UserContext";

const SearchScreen = ({navigation}) => {
  const {
    selectedTrack,
    setSelectedTrack,
    isMinimized,
    handleMinimizedScreen,
  } = useMusicPlayer();

  const [inputting, setInputting] = useState(false);
  console.log(inputting)
  const data = [{ key: 'search' }, { key: 'searchBar' }, {key:"ttt"},{ key: 'searchResultPage' }, { key: 'spacer' }];

  const renderItem = ({ item }) => {
    switch (item.key) {
      case 'search':
        return <Text style={styles.search}>Search</Text>;
      case 'ttt':
        return <Text style={{color: "black"}}>{inputting ? "true" :" false"}</Text>;
      case 'searchBar':
        return <SearchBar inputting={inputting} setInputting={setInputting}/>;
      case 'searchResultPage':
        return <SearchResultPage setSelectedTrack={setSelectedTrack} navigation={navigation} />;
      case 'spacer':
        return <View style={{ marginTop: 150 }} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ padding: 24 }}
          showsVerticalScrollIndicator={false}
      />

      <View style={{ flex: 1 }}>
        {selectedTrack && (
          <View
            style={
              isMinimized
                ? styles.minimizedScreenContainer
                : styles.fullScreenContainer
            }
          >
            <MusicPlayerScreen
              trackData={selectedTrack}
              isMinimized={isMinimized}
              handleMinimizedScreen={handleMinimizedScreen}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  minimizedScreen: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    padding: 0,
  },
  search: {
    marginTop: Platform.OS === "ios" ? StatusBar.currentHeight + 20 : 0,
    fontSize: getSize(32, 35, 50),
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  fullScreenContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    width: "100%",
  },
  minimizedScreenContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    flex: 1,
    zindex: 1,
    backgroundColor: "black",
  },
});

export default SearchScreen;
