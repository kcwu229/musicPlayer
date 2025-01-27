import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";

const mockSuggestionData = [
  {
    id: 1,
    author: "Taylor Swift",
    theme: "Love Story",
    image: require("../../assets/images/taylor_swift.png"),
  },
  {
    id: 2,
    author: "Ed Sheeran",
    theme: "Shape of You",
    image: require("../../assets/images/ed_sheeran.jpeg"),
  },
  {
    id: 3,
    author: "Adele",
    theme: "Hello",
    image: require("../../assets/images/adele.jpeg"),
  },
];

const SuggectionSection = () => (
  <View>
    <Text style={styles.heading}>Suggestions For You</Text>
    <ScrollView
      style={styles.suggestionList}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {mockSuggestionData.map((data) => {
        return (
          <Pressable onPress={() => console.log(data.author)} key={data.id}>
            <View style={styles.suggestItem}>
              <Image source={data.image} style={styles.image} />
              <View style={styles.description}>
                <Text style={styles.theme}>{data.theme}</Text>
                <Text style={styles.author}>{data.author}</Text>
              </View>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
    marginTop: 40,
  },
  image: {
    height: 350,
    width: 200,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 1, height: -1 },
    shadowRadius: 1,
  },
  spacing: {
    flexGrow: 2,
  },
  suggestionList: {
    flexDirection: "row",
  },
  suggestItem: {
    flexDirection: "column",
    marginRight: 20,
    marginTop: 20,
  },
  author: {
    fontSize: 20,
    color: "white",
  },
  theme: {
    fontSize: 28,
    color: "white",
    fontWeight: 10,
  },
  description: {
    position: "absolute",
    bottom: "0%",
    width: "100%",
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    borderRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    shadowColor: "black",
    shadowOffset: { width: 1, height: -1 },
    shadowRadius: 1,
  },
});

export default SuggectionSection;
