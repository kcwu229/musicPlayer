import {View, Text, Button, ImageBackground, StyleSheet, Dimensions, TextInput, Pressable} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import React, {useState, useEffect} from "react";

const backgroundImage = require("../assets/images/signUpBG.jpg");
import randomColor from "@/components/RandomColor";
import getSize from "../components/AdjustSizeByScreenSize";
const { height, width } = Dimensions.get("window");

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({username: "", password: ""})
    const [usernameFail, setUsernameFail] = useState(false);
    const [passwordFail, setPasswordFail] = useState(false);

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
        const {usernameFail, passwordFail} = formValidation();
        if (!usernameFail && !passwordFail ) {
            console.log("well done")

            const loginData = {
                username: username,
                password: password
            }

            const url =  process.env.EXPO_PUBLIC_BASE_URL + "auth/sign-up";
            console.log(url)

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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexGrow: 4 }}></View>
                    <Text style={styles.heading}>SignUp</Text>
                    <Text style={styles.subHeading}>Enjoy your musical journey</Text>
                    <TextInput style={styles.textField} placeholder="Username" placeholderTextColor="white" value={username} onChangeText={handleInputUsername} />
                    { usernameFail ? <Text style={[styles.subHeading, {color: "white"}]}>*{errors.username}</Text> : null }
                    <TextInput style={styles.textField} placeholder="Password" placeholderTextColor="white" value={password} onChangeText={handleInputPassword}/>
                    { passwordFail ? <Text style={[styles.subHeading,{color: "white"}]}>*{errors.password}</Text> : null }

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

                    <View style={{ flexGrow: 2 }}></View>
                </View>
            </ImageBackground>
            <LinearGradient
                colors={["rgba(128, 0, 128, 0.7)", "rgba(255, 165, 0, 0.7)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.colorFilter}>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        color: 'white',
        fontWeight: "300",
        fontSize: getSize(25, 35, 70),
        zIndex: 2,
    },
    subHeading: {
        color: 'white',
        fontWeight: "200",
        fontSize: getSize(10, 20,30),
        zIndex: 2
    },
    submitBtn: {
        color: 'white',
        fontWeight: "200",
        textAlign: "left", // Add this line
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
        color: 'white',
        fontSize: getSize(14,18,30),
        zIndex: 2,
        fontWeight: "200",
        marginTop: getSize(15,25,40),
        backgroundColor: "rgba(128, 128, 128, 0.33)",
        width: getSize("45%", "50%", "50%"),
        borderColor: "white",
        borderWidth:1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10
    },
    colorFilter: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.4
    },
    loginBtn: {
        color: 'white',
        fontWeight: "200",
        fontSize: getSize(20,18,50),
        marginTop: getSize(10, 30,50), zIndex: 2
    }
});

export default SignUpScreen;