import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import getSize from "@/components/AdjustSizeByScreenSize";

const ChartComponent = ({ content }) => {
  return (
    <ScrollView
      style={([styles.chartList], { overflow: "visible" })}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        {content.topTrackByCountryList.map((data, index) => {
          return (
            <View key={data._id}>
              <Pressable
                onPress={() =>
                  navigateToAlbumInfoPage(
                    data.countryItem,
                    content.chartColor[index]
                  )
                }
              >
                <View
                  style={[
                    styles.chartItem,
                    { backgroundColor: content.chartColor[index] },
                  ]}
                >
                  <View
                    style={[
                      styles.chartImage,
                      {
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                      },
                    ]}
                  >
                    <Text style={styles.title}>Top 50</Text>
                    <Text style={styles.region}>{data.countryItem}</Text>
                  </View>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap", // Allows wrapping of items
  },
  // charts
  topHeading: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
  heading: {
    fontSize: getSize(20, 30, 40),
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  chartList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  chartItem: {
    height: getSize(100, 120, 160),
    width: getSize(100, 120, 160),
    opacity: 0.5,
    marginTop: getSize(15, 18, 20),
    marginHorizontal: 15,
    borderRadius: 20,
    shadowOpacity: 0.8, // Add shadowOpacity for better control
    elevation: 5,
  },
  title: {
    fontSize: getSize(14, 16, 20),
    color: "white",
    margin: 10,
    fontWeight: "bold",
  },
  region: {
    fontSize: getSize(18, 20, 22),
    color: "white",
    margin: 10,
    maxWidth: getSize(100, 120, 160),
    fontWeight: "bold",
  },
  chartImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    maxWidth: getSize(100, 120, 160),
  },
  subscription: {
    marginRight: 20,
    marginTop: 10,
    maxWidth: getSize(100, 120, 160),
    fontSize: getSize(13, 15, 20),
    color: "gray",
  },
  status: {
    marginRight: 20,
    marginTop: 10,
    color: "gray",
    fontSize: getSize(11, 13, 18),
  },
});

export default ChartComponent;
