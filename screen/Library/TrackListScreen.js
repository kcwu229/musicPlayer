import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TextInput,
    Pressable,
    Platform, FlatList, Image
} from 'react-native';
import React, {useEffect, useState} from "react";
const backgroundImage = require("../../assets/images/loginBg.jpg");
import getSize from "../../components/AdjustSizeByScreenSize";
import {useUserContext} from "@/context/UserContext";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import CreateAlert from "@/components/AlertComponent";
import TrackItem from "@/components/TrackItem";
import MusicPlayerScreen from "@/components/MusicPlayerPage/MusicPlayerScreen";

// todo
const TrackListScreen = ({ navigation }) => {
    const [likedTrackList, setLikedTrackList] = useState([]);
    const [trackNameList, setTrackNameList] = useState([]);
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
        const fetchLikeTracks = async (userId) => {
            try {
                const url = Platform.OS === "ios"
                    ? process.env.EXPO_PUBLIC_BASE_URL + `user/likedTracks`
                    : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `user/likedTracks`;

                const result = await fetch(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (result.ok) {
                    const data = await result.json();
                    setTrackNameList(data.data.map((track) => {
                        return track.name
                    }))
                    setLikedTrackList(data.data)
                }
            }
            catch (err) {
                console.log();
            }
        }
        fetchLikeTracks();
    }, []) // todo find a more effective and less waste resource method

    return(
        <View style={{flex: 1, backgroundColor: "white"}}>
            <View style={{backgroundColor: "white"}}>
                <FlatList
                    data={likedTrackList}
                    style={{backgroundColor: "white", paddingHorizontal: 20}}
                    contentContainerStyle={{paddingBottom: 100}}
                    renderItem={({ item, index }) => (
                        <Pressable onPress={() => handlePlayMusic(item)}>
                            <View>
                                <TrackItem
                                    trackData={item}
                                    selectedTrack={selectedTrack}
                                    imageWidth={getSize(60, 80, 100)}
                                    imageHeight={getSize(60, 80, 100)}
                                    shownOnResultList={true}
                                    showViewAndDuration={true}
                                    setSelectedTrack={selectedTrack}
                                />
                            </View>
                        </Pressable>
                    )}
                />
            </View>
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
    fullScreenContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        width: "100%",
    },
    minimizedScreenContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        width: "100%",
        flex: 1,
        zindex: 1,
        backgroundColor: "black",
    },
});

export default TrackListScreen;