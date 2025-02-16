import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TextInput,
    Pressable,
    Platform
} from 'react-native';
import {BlurView} from "expo-blur";
import {useUserContext} from "@/context/UserContext";
import { LinearGradient } from "expo-linear-gradient";
import React, {useState, useEffect} from "react";
const backgroundImage = require("../assets/images/loginBg.jpg");
import getSize from "../components/AdjustSizeByScreenSize";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation, route }) => {
    const [_username, _setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({username: "", password: ""})
    const [usernameFail, setUsernameFail] = useState(false);
    const [passwordFail, setPasswordFail] = useState(false);
    const [serverError, setServerError] = useState("");
    const { setToken, setUsername} = useUserContext();

    useEffect(() => {
        if (route.params && route.params.loginData) {
            const loginData = route.params.loginData;
            setPassword(loginData.password);
            _setUsername(loginData.username);
        }
    }, []);

    const storeData = async (keyName, value) => {
        try {
            await AsyncStorage.setItem(keyName, value);
        } catch (e) {
            // saving error
        }
    };

    const handleNavigateToSignUpPage = () => {
        navigation.navigate("SignUpScreen", {
            signUpData: {}
        })
    }
    const handleInputUsername = (text) => {
        _setUsername(text)
    }

    const handleInputPassword = (text) => {
        setPassword(text)
    }

    const formValidation = () => {
        setPasswordFail(false)
        setUsernameFail(false)
        if (_username === "") {
            console.log("Username is empty")
            setErrors(prevErrors => ({ ...prevErrors, username: "Username is empty" }));
            setUsernameFail(true)
        }

        if (password === "") {
            console.log("Password is empty")
            setErrors(prevErrors => ({ ...prevErrors, password: "Password is empty" }));
            setPasswordFail(true)
        }

        return {usernameFail, passwordFail};
    }
    const submitLoginForm = async () => {
        const {usernameFail, passwordFail} = formValidation();
        if (!usernameFail && !passwordFail ) {
            _setUsername("");
            setPassword("");
            setServerError("");

            const loginData = {
                username: _username,
                password: password
            }

            const url = Platform.OS === "ios"
                ? process.env.EXPO_PUBLIC_BASE_URL + `auth/login`
                : process.env.EXPO_PUBLIC_ANDROID_BASE_URL + `auth/login`;

            try {
                const result = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(loginData)
                })
                if (result.ok) {
                    const data = await result.json();
                    const token = data.data.token;
                    const username = data.data.username;
                    const userId = data.data.userId;
                    setToken(token);
                    setUsername(username);
                    storeData("@accessToken", token);
                    storeData("@username", username);
                    storeData("@userId", userId);

                    if (route.params && route.params.name) {
                        navigation.navigate(route.params.name)
                    }
                    else {
                        navigation.navigate("Library");
                    }
                }

                else if (result.status === 403) {
                    const data = await result.json();
                    setServerError(data.message);
                }

                else if (result.status === 404) {
                    const data = await result.json();
                    setServerError(data.message);
                }
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.imageBg} blurRadius={Platform === "ios" ? 6 : 3 } >
            </ImageBackground>
            <LinearGradient
                colors={["rgba(128, 0, 128, 0.3)", "rgba(255, 165, 0, 0.21)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.colorFilter}>
            </LinearGradient>
            <View style={styles.container}>
                <View style={{ flexGrow: 3 }}></View>
                <BlurView intensity={10} style={{ overflow: "hidden", borderRadius: 20}}>
                    <View style={styles.blurContainer}>
                    <View style={{ flexGrow: 1 }}></View>
                    <Text style={styles.heading}>LOGIN</Text>
                        <View style={{ flexGrow: 2 }}></View>
                        <View>
                            <TextInput style={styles.textField} placeholder="Username" placeholderTextColor="white" value={_username} onChangeText={handleInputUsername} />
                            { usernameFail ? <Text style={[styles.errorText, {color: "pink"}]}>* {errors.username}</Text> : null }
                        </View>
                        <View style={{marginTop: 20}}>
                            <TextInput style={styles.textField} placeholder="Password" placeholderTextColor="white"
                                       value={password} onChangeText={handleInputPassword} secureTextEntry/>
                            { passwordFail ? <Text style={[styles.errorText,{color: "pink"}]}>* {errors.password}</Text> : null }
                        </View>
                        { serverError.length > 0 ? <Text style={[styles.errorText,{color: "pink", marginTop: 10}]}>* {serverError}</Text> : null }
                        <View style={{ flexGrow: 1 }}></View>

                        <View style={{borderRadius: 20, overflow: "hidden"}}>
                            <Pressable style={{ zIndex: 2}} onPress={() => submitLoginForm()}>
                                <Text style={styles.submitBtn}>LOGIN</Text>
                            </Pressable>
                        </View>
                        <View style={{flexDirection: "row", marginTop: 30}}>
                            <Text style={styles.smallFont}>No account yet ? </Text>
                            <View style={{ flexGrow: 1 }}></View>
                            <Pressable onPress={() => handleNavigateToSignUpPage()}>
                                <Text style={[styles.smallFont, {fontWeight: "bold"}]}>Sign Up</Text>
                            </Pressable>
                        </View>
                        <View style={{ flexGrow: 2 }}></View>
                    </View>
                </BlurView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: "10%",
        left: "2%",
        right: "2%",
        bottom: "10%"

    },
    blurContainer: {
        justifyContent: 'center',
        backgroundColor: "rgba(195,80,143,0.14)",
        alignItems: 'center',
        paddingHorizontal: 40,
        borderColor: "rgba(255,255,255,0.25)",
        borderWidth: 2,
        borderRadius: 20,
    },
    heading: {
        color: 'white',
        fontWeight: "bold",
        fontSize: getSize(25, 40, 40),
        zIndex: 2,
    },
    smallFont: {
        color: 'white',
        fontWeight: "300",
        fontSize: getSize(12, 18, 18),
        zIndex: 2,
    },
    errorText: {
        fontWeight: "400",
        fontSize: getSize(10, 16,16),
        zIndex: 2
    },
    subHeading: {
        color: 'white',
        fontWeight: "200",
        fontSize: getSize(10, 16,30),
        zIndex: 2
    },
    submitBtn: {
        color: 'black',
        fontWeight: "bold", // Add this line
        fontSize: getSize(15,17, 17),
        zIndex: 2,
        borderRadius: 20,
        backgroundColor: "white",
        paddingVertical: getSize(9, 10, 10),
        paddingHorizontal: getSize("20%", "20%","20%"),
    },
    imageBg: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: "relative"
    },
    textField: {
        color: 'white',
        position: "relative",
        fontSize: getSize(20,18,18),
        zIndex: 2,
        fontWeight: "200",
        backgroundColor: "rgba(128, 128, 128, 0.18)",
        width: getSize("98%", "98%", "98%"),
        borderColor: "white",
        borderWidth:1,
        paddingHorizontal:getSize(30,80,80) ,
        paddingVertical: 5,
        borderRadius: 10,
    },
    colorFilter: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.8
    },
});

export default LoginScreen;