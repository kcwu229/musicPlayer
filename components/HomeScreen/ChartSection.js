import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import RandomColor from "../../components/RandomColor";
import { LinearGradient } from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";
import getSize from "../AdjustSizeByScreenSize";


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
      try {
        const itemDisplayed = 8;
        const url = Platform.OS === "ios"
            ? process.env.EXPO_PUBLIC_BASE_URL + `track/country?limit=${itemDisplayed}`
            : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `track/country?limit=${itemDisplayed}`;

        const result = await fetch(url);
        if (result.ok) {
          const data = await result.json();
          const resultData = data.data;
          if (data && Array.isArray(resultData)) {
            setTopTrackByCountryList(resultData);
            setChartColor(resultData.map(data => RandomColor()));
          } else {
              console.error('Invalid data structure:', data);
          }
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
                        <View
                            style={[styles.chartItem, { backgroundColor: chartColor[index] }]}
                        >
                              <View style={[styles.chartImage, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                                  <Text style={styles.title}>Top 50</Text>
                                  <Text style={styles.region}>
                                    { data.countryItem}
                                  </Text>
                              </View>
                          </View>
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
    fontSize: getSize(17,20,22),
    fontWeight: "thin",
  },
  heading: {
    fontSize: getSize(20,30,40),
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
    height: getSize(100,150,200),
    width: getSize(100,150,200),
    opacity: 0.5,
    marginTop: getSize(15,18,20),
    borderRadius: 20,
    shadowOpacity: 0.8, // Add shadowOpacity for better control
    elevation: 5,
  },
  title: {
    fontSize: getSize(14,16,20),
    color: "white",
    margin: 10,
    fontWeight: "bold",
  },
  region: {
    fontSize: getSize(18,24,30),
    color: "white",
    margin: 10,
    maxWidth: getSize(100,150,200),
    fontWeight: "bold",
  },
  chartImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    alignContent: "center",
    maxWidth: getSize(100,150,200),
    padding: 10,
  },
  subscription: {
    marginRight: 20,
    marginTop: 10,
    maxWidth: getSize(100,150,200),
    fontSize: getSize(13,15,20),
    color: "gray",
  },
  status: {
    marginRight: 20,
    marginTop: 10,
    color: "gray",
    fontSize: getSize(11,13,18),
  },
});

export default ChartSection;
