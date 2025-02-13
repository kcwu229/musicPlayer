import {
    View,
    Text,
    Button,
    ImageBackground,
    StyleSheet,
    Dimensions,
    TextInput,
    Pressable,
    Modal,
    Platform
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, {useState, useEffect} from "react";

const backgroundImage = require("../assets/images/loginBg.jpg");
import randomColor from "@/components/RandomColor";
import getSize from "../components/AdjustSizeByScreenSize";
const { height, width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({username: "", password: ""})
    const [usernameFail, setUsernameFail] = useState(false);
    const [passwordFail, setPasswordFail] = useState(false);

    const [isUsernameFocused, setUsernameFocused] = useState(false);
    const [isPasswordFocused, setPasswordFocused] = useState(false);

    const handleUsernameFocus = () => setUsernameFocused(true);
    const handleUsernameBlur = () => setUsernameFocused(false);

    const handlePasswordFocus = () => setPasswordFocused(true);
    const handlePasswordBlur = () => setPasswordFocused(false);


    const handleInputUsername = (text) => {
        setUsername(text)
    }

    const handleInputPassword = (text) => {
        setPassword(text)
    }

    const formValidation = () => {
        setPasswordFail(false)
        setUsernameFail(false)
        console.log("ssss")
        if (username === "") {
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
        console.log("ssss")
        const {usernameFail, passwordFail} = formValidation();
        if (!usernameFail && !passwordFail ) {
            console.log("well done")

            const loginData = {
                username: username,
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
                }
            }

            catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.imageBg} >
                <View style={{ flex: 1, justifyContent: 'center', flexDirection: "row" }}>
                    <View style={{flexGrow: 1}}></View>
                    <View>
                        <View style={{ flexGrow: 4 }}></View>
                        <Text style={styles.heading}>Login</Text>
                        <View style={{flexGrow: 1}}></View>
                        <View>
                            <View style={[styles.fieldBackground, { zIndex: 1 }]}>
                                <Text style={[styles.fieldLabel, { zIndex: 1 }]}>Username</Text>
                            </View>
                            <TextInput
                                style={[styles.textField, { backgroundColor: isUsernameFocused ? "rgba(128, 128, 128, 0.25)" : undefined, zIndex: 2 }]}
                                placeholder="Type your username"
                                placeholderTextColor="grey"
                                value={username}
                                onChangeText={handleInputUsername}
                                onFocus={handleUsernameFocus}
                                onBlur={handleUsernameBlur}
                            />
                            <FontAwesome
                                name="user-o"
                                size={getSize(12, 18, 30)}
                                style={[styles.icon, { zIndex: 2 }]}
                            />
                            {usernameFail ? <Text style={[styles.subHeading, { color: "red", zIndex: 2 }]}>*{errors.username}</Text> : null}
                        </View>
                        <View style={{marginTop: 20}}>
                            <View style={styles.fieldBackground}>
                                <Text style={styles.fieldLabel}>Password</Text>
                            </View>
                            <TextInput style={[styles.textField, {backgroundColor: isPasswordFocused ? "rgba(128, 128, 128, 0.25)" : undefined}]} placeholder="Type your password" placeholderTextColor="grey"
                                           value={password} onChangeText={handleInputPassword} secureTextEntry
                                            onFocus={handlePasswordFocus} onBlur={handlePasswordBlur}/>
                            <FontAwesome
                                    name="lock"
                                    size={getSize(12,18,30)}
                                    style={styles.icon}
                                />
                            { passwordFail ? <Text style={[styles.subHeading,{color: "red"}]}>*{errors.password}</Text> : null }
                        </View>
                        <View style={{ flexGrow: 1 }}></View>

                        <LinearGradient
                            colors={[
                                "rgba(255, 0, 0, 0.85)",  // Red
                                "rgba(0, 0, 255, 0.85)"   // Blue
                            ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{borderRadius: 20}}
                            >
                            <Pressable style={{ zIndex: 2}} onPress={() => submitLoginForm()}>
                                <Text style={styles.submitBtn}>Login</Text>
                            </Pressable>
                        </LinearGradient>


                        <View style={{ flexGrow: 3 }}></View>
                    </View>
                    <View style={{flexGrow: 1}}></View>
                </View>
            </ImageBackground>
            <LinearGradient
                colors={["rgba(0, 0, 0, 0.85)", "rgba(64, 64, 64, 0.85)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.colorFilter}>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    fieldBackground: {
        backgroundColor: "white",
        zIndex:1,
        flex: 1,
        height: 20,
    },
    icon: {
        top: 10,
        left: 10,
        color: "grey",
        position: "absolute",
        zIndex: 2,
    },
    fieldLabel: {
        position: "absolute",
        fontWeight: "200",
        color: "white",
        top: -10,
        left: 10,
        fontSize: getSize(10, 14, 20),
        zIndex: 1,
    },

    heading: {
        color: 'white',
        textAlign: "center",
        fontWeight: "300",
        fontSize: getSize(25, 35, 70),
        zIndex: 2,
    },
    subHeading: {
        color: 'white',
        fontWeight: "200",
        fontSize: getSize(10, 18,30),
        zIndex: 2
    },
    submitBtn: {
        textTransform: "uppercase",
        color: 'white',
        fontWeight: "200",
        textAlign: "center", // Add this line
        fontSize: getSize(15,17, 30),
        zIndex: 2,
        borderRadius: 20,
        paddingVertical: getSize(7, 7, 15),
        paddingHorizontal: getSize(14, 19,30),
    },
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBg: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: "relative"
    },
    textField: {
        color: 'gray',
        paddingLeft: getSize(18,30,40),
        position: "relative",
        fontSize: getSize(14,18,30),
        zIndex: 2,
        fontWeight: "200",
        width: getSize("100%", "100%", "100%"),
        borderColor: "white",
        borderWidth:1,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10
    },
    colorFilter: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.8
    },
    loginBtn: {
        color: 'white',
        fontWeight: "200",
        fontSize: getSize(20,18,50),
        marginTop: getSize(10, 30,50), zIndex: 2
    }
});

export default LoginScreen;