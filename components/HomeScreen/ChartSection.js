import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import RandomColor from "../../components/RandomColor";
import { LinearGradient } from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";

const { height, width } = Dimensions.get("window");


const ChartSection = () => {
  const navigation = useNavigation();
  const navigateToAlbumInfoPage = (countryData, colorData) => {
    navigation.navigate("ChartInfo", {
      countryData: countryData ,
      colorData: colorData
    });
  };


  const [topTrackByCountryList, setTopTrackByCountryList] = useState([]);
  const [chartColor, setChartColor] = useState([])

  useEffect(() => {
    const fetchChartTrack = async () => {
      const itemDisplayed = 8;
      const url = process.env.EXPO_PUBLIC_BASE_URL + `track/country?limit=${itemDisplayed}`;
      console.log(url);
      try {
        const result = await fetch(url);
        if (result.ok) {
          const data = await result.json();
          setTopTrackByCountryList(data.data);

          // save the color
          setChartColor(data.data.map(data => RandomColor()))
        }

      } catch (error) {
        console.log(error);
      }
    };
    fetchChartTrack();
  }, []);

  return (
    <View>
      <View style={styles.topHeading}>
        <Text style={styles.heading}>Charts</Text>
        <Pressable onPress={() => console.log("See More")}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>
      <ScrollView
        style={([styles.chartList], { overflow: "visible" })}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {topTrackByCountryList.map((data, index) => {
          return (
            <View key={data._id}>
              <Pressable onPress={() => navigateToAlbumInfoPage(data.countryItem, chartColor[index])}>
                <LinearGradient colors={chartColor[index]} style={styles.chartItem}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}>
                  <View style={[styles.chartImage, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                    <Text style={styles.title}>Top 50</Text>
                    <Text style={styles.region}>{data.countryItem}</Text>
                  </View>
                </LinearGradient>
              </Pressable>
              <View>
                <Text style={styles.subscription}>Monthly chart-toppers</Text>
                <Text style={styles.status}>update</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topHeading: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
  seeAll: {
    color: "gray",
    marginTop: 10,
    fontSize: height > 100 && height < 800 ? 17 : 22,
    fontWeight: "thin",
  },
  heading: {
    fontSize: height > 100 && height < 800 ? 20 : 40,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  chartList: {
    flexDirection: "row",
  },
  chartItem: {
    flexDirection: "column",
    marginRight: 20,
    height: height > 100 && height < 800 ? 100 : 200,
    width: height > 100 && height < 800 ? 100 : 200,
    opacity: 0.5,
    marginTop: height > 100 && height < 800 ? 15 : 20,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 1, height: -1 },
    shadowRadius: 1,
    shadowOpacity: 0.8, // Add shadowOpacity for better control
    elevation: 5,
  },
  title: {
    fontSize: height > 100 && height < 800 ? 14 : 20,
    color: "white",
    margin: 10,
    fontWeight: "bold",
  },
  region: {
    fontSize: height > 100 && height < 800 ? 18 : 30,
    color: "white",
    margin: 10,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  chartImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    alignContent: "center",
    padding: 10,
  },
  subscription: {
    marginRight: 20,
    marginTop: 10,
    fontSize: height > 100 && height < 800 ? 13 : 20,
    color: "gray",
  },
  status: {
    marginRight: 20,
    marginTop: 10,
    color: "gray",
    fontSize: height > 100 && height < 800 ? 11 : 18,
  },
});

export default ChartSection;
