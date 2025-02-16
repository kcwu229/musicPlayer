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
import getSize from "../../components/AdjustSizeByScreenSize";
import {useUserContext} from "@/context/UserContext";
import CreateAlert from "@/components/AlertComponent";

// todo
const GenreList = ({ navigation }) => {
    const [followedArtist, setFollowedArtist] = useState([]);
    const [hasFollowed, setHasFollowed] = useState([])
    const {userId, token} = useUserContext();

    const handleNavigateToSignUpPage = () => {
        navigation.navigate("SignUpScreen", {
            signUpData: {}
        })
    }

    const handleNavigateToArtistInfo = (artistData) => {
        navigation.navigate("ArtistInfo", {
            artistData: {
                selectedArtistData: artistData
            }
        });

    }

    const handleFollow = (artistData, index) => {
        if (token.length === 0) {
            CreateAlert("Authentication Error", "Require login to follow artist", "authIssue", navigation);
        } else {
            if (hasFollowed) {
                console.log(`You haved unfollow artist - ${artistData.name}`);
                setHasFollowed(prevState => {
                    const newFollowState = [...prevState];
                    newFollowState[index] = !newFollowState[index];
                    return newFollowState;
                })
                fetchFollowAction(artistData._id)
            }
        };
    }

    const fetchFollowAction = async (artistId) => {
        const url = Platform.OS === "ios"
            ? process.env.EXPO_PUBLIC_BASE_URL + `user/follow/${artistId}`
            : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `user/follow/${artistId}`;

        try {
            await fetch(url, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
        }
        catch (err) {
            console.log();
        }
    }

    useEffect(() => {
        const fetchFollowedArtist = async (userId) => {
            try {
                const url = Platform.OS === "ios"
                    ? process.env.EXPO_PUBLIC_BASE_URL + `user/followedArtists`
                    : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `user/followedArtists`;

                const result = await fetch(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (result.ok) {
                    const data = await result.json();
                    const hasFollowList = data.data.map(followedData => {
                        return true;
                    })
                    setHasFollowed(hasFollowList)
                    setFollowedArtist(data.data)
                }
            }
            catch (err) {
                console.log();
            }
        }

        fetchFollowedArtist();
    }, [])

    return(
        <FlatList
            data={followedArtist}
            style={{backgroundColor: "white"}}
            renderItem={({ item, index }) => (
                <Pressable onPress={() => handleNavigateToArtistInfo(item)}>
                    <View style={styles.artistItemOnList}>
                        <View>
                            <Image
                                source={{uri: item.imageUrl}}
                                style={[styles.image, {
                                    width: getSize(60, 70, 100),
                                    height: getSize(60, 70, 100)
                                }]}
                            />
                        </View>
                        <View>
                            <Text style={styles.nameOnList}>
                                {item.name}
                            </Text>
                        </View>
                        {<View style={styles.space}></View>}
                        {
                            <Pressable onPress={() => handleFollow(item, index)}>
                                {hasFollowed[index] && (
                                    <View style={styles.unfollowBtn}>
                                        <Text style={styles.unfollowText}>Unfollow</Text>
                                    </View>
                                )}
                            </Pressable>
                        }
                    </View>
                </Pressable>
            )}
            keyExtractor={item => item._id} />
    );
};

const styles = StyleSheet.create({
    followText: {
        color: "grey",
        fontSize: getSize(15, 16,22),
    },
    unfollowText: {
        color: "red",
        fontSize: getSize(15, 16,22),
    },
    space: {
        flexGrow: 2,
    },
    user: {
        marginLeft: 10,
    },
    followerRow: {
        flexDirection: "row",
        alignItems: "center",
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
    followBtn: {
        borderRadius: 20,
        borderColor: "grey",
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 20,
    },
    unfollowBtn: {
        borderRadius: 20,
        borderColor: "red",
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 20,
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

    artistItem: {
        flexDirection: "column",
        marginRight: getSize(10, 15,20),
        marginTop: getSize(5, 13,20),
        alignItems: "center",
    },
    nameOnList: {
        fontSize: 20,
        margin: 10,
        color: "black",
        marginLeft: 10,
    },
    name: {
        fontSize: getSize(13, 18,25),
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

export default GenreList;