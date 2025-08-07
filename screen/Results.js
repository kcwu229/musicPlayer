import MusicPlayerScreen from "@/components/MusicPlayerPage/MusicPlayerScreen";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { useNavigation } from "expo-router";
import ChartComponent from "@/components/SeeAll/ChartComponent";
import TopArtistComponent from "@/components/SeeAll/TopArtistComponent";
import TrendingTrackComponent from "@/components/SeeAll/TrendingTrackComponent";
import { View, StyleSheet } from "react-native";
import { useState } from "react";

const Results = ({ route }) => {
  const {
    selectedTrack,
    isMinimized,
    handleMinimizedScreen,
    isPlaying,
    setIsPlaying,
  } = useMusicPlayer();
  const { item, content } = route.params;
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);

  const componentMap = {
    chart: <ChartComponent content={content} />,
    trendingAlbum: <TrendingTrackComponent content={content} />,
    popularArtists: <TopArtistComponent content={content} />,
  };

  const navigateToAlbumInfoPage = (countryData, colorData) => {
    navigation.navigate("ChartInfo", {
      countryData: countryData,
      colorData: colorData,
    });
  };

  return (
    <>
      {componentMap[item]}
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
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default Results;
