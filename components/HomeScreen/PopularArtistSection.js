import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "@env"

import ArtistItem from "@/components/ArtistItem";

const { height, width } = Dimensions.get("window");

const PopularArtistSection = ({ artistData }) => {
  const navigation = useNavigation();
  const navigateToArtistInfoPage = (selectedArtistData) => {
    navigation.navigate("ArtistInfo", {
      artistData: { selectedArtistData },
    });
  };
  const [artistList, setArtistList] = useState([]);

  useEffect(() => {
    const fetchArtistList = async () => {
      const artistCount = 8;
      const url = BASE_URL + `artist?limit=${artistCount}`
      //console.log(url)
      try {
        const result = await fetch(url);
        //console.log(result)
        const data = await result.json();
        //console.log(data.data)
        setArtistList(data.data);

      } catch (err) {
        console.log(err)
      }
    }
    fetchArtistList();
  }, [])

  return (
    <View>
      <View style={styles.topHeading}>
        <Text style={styles.heading}>Popular artists</Text>
        <Pressable onPress={() => console.log("See More")}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>
      <ScrollView
        style={([styles.artistList], { overflow: "visible" })}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {artistList.map((data) => {
          return (
            <Pressable
              key={data._id}
              onPress={() => navigateToArtistInfoPage(data)}
            >
              <ArtistItem
                artistData={data}
                allowFollowButton={true}
                imageWidth={height > 100 && height < 800 ? 100 : 180}
                imageHeight={height > 100 && height < 800 ? 100 : 180}
                displayFollower={false}
              />
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  followBtn: {
    backgroundColor: "black",
    borderRadius: 20,
  },
  image: {
    borderRadius: 100,
    width: 180,
    height: 180,
    backgroundColor: "black",
  },
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
    fontSize: height > 100 && height < 800 ? 20 : 26,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  artistList: {
    flexDirection: "row",
  },
  artistItem: {
    flexDirection: "column",
    marginRight: 20,
    marginTop: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    margin: 10,
    color: "black",
  },
  description: {
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    width: "auto",
  },
});

export default PopularArtistSection;
