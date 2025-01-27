import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import RandomColor from "../../components/RandomColor";
import { LinearGradient } from "expo-linear-gradient";

const chartData = [
  {
    id: 1,
    title: "Top 50",
    region: "Canada",
    subscription: "Subscribe for more",
    status: "update",
  },
  {
    id: 2,
    title: "Top 50",
    region: "Global",
    subscription: "Subscribe for more",
    status: "update",
  },
  {
    id: 3,
    title: "Top 50",
    region: "Taiwan",
    subscription: "Subscribe for more",
    status: "update",
  },
];

const ChartSection = () => {
  return (
    <View>
      <View style={styles.topHeading}>
        <Text style={styles.heading}>Charts</Text>
        <Pressable onPress={() => console.log("See More")}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>
      <ScrollView
        style={styles.chartList}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {chartData.map((data) => {
          return (
            <View key={data.id}>
              <Pressable onPress={() => console.log(data.title)}>
                <LinearGradient colors={RandomColor()} style={styles.chartItem}>
                  <View style={styles.chartImage}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.region}>{data.region}</Text>
                  </View>
                </LinearGradient>
              </Pressable>
              <View>
                <Text style={styles.subscription}>{data.subscription}</Text>
                <Text style={styles.status}>{data.status}</Text>
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
    fontSize: 16,
    fontWeight: "thin",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  chartList: {
    flexDirection: "row",
  },
  chartItem: {
    flexDirection: "column",
    margin: 10,
    height: 200,
    width: 200,
    opacity: 0.5,
  },
  title: {
    fontSize: 20,
    color: "white",
    margin: 10,
    shadowColor: "black",
    shadowOffset: "2",
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  region: {
    fontSize: 40,
    color: "white",
    margin: 10,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  chartImage: {
    position: "absolute",
    top: "20%",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    width: "auto",
  },
  subscription: {
    marginLeft: 10,
    fontSize: 22,
    color: "gray",
  },
  status: {
    marginLeft: 10,
    marginTop: 10,
    color: "gray",
    fontSize: 18,
  },
});

export default ChartSection;
