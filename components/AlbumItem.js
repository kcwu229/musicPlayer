import React from "react";
import { View, Text, StyleSheet, Pressable, Image, Button } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const AlbumItem = ({
  albumData,
  allowOptionButton = false,
  shownOnResultList = false,
  imageWidth,
  imageHeight,
}) => {
  const { title, artist, viewCount, image, duration } = albumData;
  const handleOption = () => {
    console.log("handleOption !");
  };
  return (
    <View style={shownOnResultList ? styles.albumItemOnList : styles.albumItem}>
      <Pressable onPress={() => console.log(title)}>
        <View style={styles.albumImage}>
          <Image
            source={image}
            style={[
              styles.albumImage,
              {
                width: imageWidth,
                height: imageHeight,
                borderRadius: 20,
                shadowColor: "black",
                shadowOffset: { width: 1, height: -1 },
                shadowRadius: 1,
              },
            ]}
          />
        </View>
      </Pressable>
      <View style={shownOnResultList ? styles.viewOnList : null}>
        <Text style={shownOnResultList ? styles.titleOnList : styles.title}>
          {title}
        </Text>
        <Text style={shownOnResultList ? styles.artistOnList : styles.artist}>
          {artist}
        </Text>
        <View style={shownOnResultList ? styles.viewCountAndDuration : null}>
          {viewCount != null ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="play" size={15} style={styles.play} />
              <Text style={styles.viewCount}>{viewCount}</Text>
            </View>
          ) : null}
          {duration != null ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="circle" size={6} style={styles.circle} />
              <Text style={styles.duration}>{duration}</Text>
            </View>
          ) : null}
        </View>
      </View>
      {shownOnResultList ? <View style={{ flexGrow: 3 }}></View> : null}
      {shownOnResultList ? (
        <Pressable onPress={handleOption}>
          <FontAwesome name="ellipsis-h" size={20} />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    marginLeft: 10,
    color: "blue",
  },
  artistOnList: {
    marginVertical: 3,
    color: "grey",
  },
  viewCountAndDuration: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewOnList: {
    marginLeft: 10,
    marginTop: 10,
  },
  viewCount: {
    color: "grey",
    marginLeft: 8,
    fontSize: 15,
  },
  duration: {
    marginLeft: 10,
  },

  albumItem: {
    flexDirection: "column",
    marginRight: 20,
    marginTop: 20,
  },

  albumItemOnList: {
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
  },

  name: {
    fontSize: 20,
    margin: 10,
    color: "black",
  },

  title: {
    fontSize: 22,
    color: "black",
    marginTop: 10,
  },

  titleOnList: {
    fontSize: 18,
    color: "black",
  },

  artist: {
    marginTop: 10,
    color: "gray",
    fontSize: 18,
  },

  albumImage: {
    marginTop: 10,
  },
});

export default AlbumItem;
