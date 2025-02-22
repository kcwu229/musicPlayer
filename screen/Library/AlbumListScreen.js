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
import {useMusicPlayer} from "@/context/MusicPlayerContext";
import AlbumItem from "@/components/AlbumItem";
import MusicPlayerScreen from "@/components/MusicPlayerPage/MusicPlayerScreen";

// todo
const AlbumListScreen = ({ navigation }) => {
    const [likedAlbumList, setLikedAlbumList] = useState([]);
    console.log(likedAlbumList)
    const [albumNameList, setAlbumNameList] = useState([]);
    const {userId, token} = useUserContext();

    const {
        selectedTrack,
        setSelectedTrack,
        isMinimized,
        handleMinimizedScreen,
        isPlaying,
        setIsPlaying,
        setTrackUrl,
        handlePlayTrack,
    } = useMusicPlayer();

    const handlePlayMusic = (data) => {
        setIsPlaying(!isPlaying);
        setSelectedTrack(data);
        setTrackUrl(data.soundTrackUrl);
        handlePlayTrack(data.soundTrackUrl);
    }

    useEffect(() => {
        const fetchLikeAlbums = async (userId) => {
            try {
                const url = Platform.OS === "ios"
                    ? process.env.EXPO_PUBLIC_BASE_URL + `user/likedAlbums`
                    : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `user/likedAlbums`;

                const result = await fetch(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (result.ok) {
                    const data = await result.json();
                    setAlbumNameList(data.data.map((album) => {
                        return album.name
                    }))
                    setLikedAlbumList(data.data)
                }
            }
            catch (err) {
                console.log();
            }
        }
        fetchLikeAlbums();
    }, [])

    return(
        <View style={{flex: 1, backgroundColor: "white"}}>
            <FlatList
                data={likedAlbumList}
                contentContainerStyle={{paddingBottom: 100}}
                style={{backgroundColor: "white", paddingHorizontal: 20}}
                renderItem={({ item, index }) => (
                    <Pressable
                        onPress={() => handlePlayMusic(item)}
                    >
                        <View>
                            <AlbumItem
                                       albumData={item}
                                       imageWidth={getSize(60, 70, 100)}
                                       imageHeight={getSize(60, 70, 100)}
                                       shownOnResultList={true}
                                       setSelectedTrack={setSelectedTrack}
                                       showViewAndDuration={true}
                            />
                        </View>
                    </Pressable>)}
            />
            <View style={{flexGrow: 2}}></View>
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
        </View>

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

export default AlbumListScreen;