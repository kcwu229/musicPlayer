import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TextInput,
    Pressable,
    Platform, FlatList, Image
} from 'react-native';
import {BlurView} from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, {useEffect, useState} from "react";
const backgroundImage = require("../../assets/images/loginBg.jpg");
import {useUserContext} from "@/context/UserContext";
import CreateAlert from "@/components/AlertComponent";

// todo
const GenreList = ({ navigation }) => {
    const [genreList, setGenreList] = useState([]);
    const {userId, token} = useUserContext();

    const handleNavigateToGenreResult = (genreItem) => {
        navigation.navigate("GenreResult", {
            genreItem: genreItem
        });
    }

    useEffect(() => {
        const fetchGenres = async () => {
            try {

                const url = Platform.OS === "ios"
                    ? process.env.EXPO_PUBLIC_BASE_URL + `user/genres`
                    : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `user/genres`;

                const result = await fetch(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (result.ok) {
                    const data = await result.json();
                    setGenreList(data.data)
                }
            }

            catch (err) {
                console.log();
            }
        }
        fetchGenres();
    }, [])

    return(
        <FlatList
            data={genreList}
            style={{backgroundColor: "white"}}
            renderItem={({ item, index }) => (
                <Pressable onPress={() => handleNavigateToGenreResult(item)}>
                    <View style={styles.artistItemOnList}>
                            <Text style={styles.nameOnList}>
                                 {item.name}
                            </Text>
                    </View>
                </Pressable>
            )}
            keyExtractor={item => item._id} />
    );
};

const styles = StyleSheet.create({
    genreItem: {
        flexDirection: "row",
        backgroundColor: "green",
        width: 100,
        height: 100,
        borderRadius: 20
    },
    space: {
        flexGrow: 2,
    },
    user: {
        marginLeft: 10,
    },
    artistItemOnList: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
        paddingVertical: 4,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: StyleSheet.hairlineWidth,
    },
    followerCount: {
        color: "grey",
        fontSize: 15,
        marginLeft: 10,
    },
    image: {
        borderRadius: 100,
        backgroundColor: "black",
        marginTop: 15,
        shadowColor: "black",
        shadowOffset: { width: 1, height: -1 },
        shadowRadius: 1,
        shadowOpacity: 0.8, // Add shadowOpacity for better control
        elevation: 5,
    },
    nameOnList: {
        fontSize: 20,
        margin: 10,
        color: "black",
        marginLeft: 10,
        textTransform: "uppercase"
    },
});

export default GenreList;