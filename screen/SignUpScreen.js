import { View, Text, Button, ImageBackground, StyleSheet, Dimensions, TextInput } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import {useState, useEffect} from "react";

const backgroundImage = require("../assets/images/signUpBG.png");
import randomColor from "@/components/RandomColor";
const { height, width } = Dimensions.get("window");

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({username: "", password: ""})

    const handleInputUsername = (text) => {
        setUsername(text)
    }

    const handleInputPassword = (text) => {
        setPassword(text)
    }

    const formValidation = () => {
        let usernameFail = false;
        let passwordFail = false;

        if (username === "") {
            console.log("Username is empty")
            setErrors(errors.username = "Username is empty")
            console.log(errors)
            usernameFail = true;
        }

        if (password === "") {
            console.log("Password is empty")
            setErrors(errors.password = "Password is empty")
            console.log(errors)
            passwordFail = true;
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
                    <View style={{ flexGrow: 3 }}></View>
                    <Text style={styles.heading}>Signup</Text>
                    <Text style={styles.subHeading}>Enjoy your musical journey</Text>
                    <TextInput style={styles.username} placeholder="Username" placeholderTextColor="white" value={username} onChangeText={handleInputUsername} />
                    { 1 ? <Text>{errors.username}</Text> : null }
                    <TextInput style={styles.password} placeholder="Password" placeholderTextColor="white" value={password} onChangeText={handleInputPassword}/>
                    { 1 ? <Text>{errors.password}</Text> : null }

                    <View style={{ flexGrow: 1 }}></View>
                    <View style={{ zIndex: 1 }}>
                        <Button title={"Login"} onPress={() => submitLoginForm()}/>
                    </View>
                    <View style={{ flexGrow: 1 }}></View>
                </View>
            </ImageBackground>
            <LinearGradient
                colors={["rgba(128, 0, 128, 0.7)", "rgba(255, 165, 0, 0.5)"]}
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
        fontWeight: "400",
        fontSize: height > 800 ? 70 : 30,
        zIndex: 2,
    },
    subHeading: {
        color: 'white',
        fontWeight: "300",
        textAlign: "left", // Add this line
        fontSize: height > 800 ? 30 : 20,
        zIndex: 2
    },
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBg: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: "relative"
    },
    username: {
        color: 'white', fontSize: height > 800 ? 30 : 20,
        zIndex: 2, marginTop: height > 800 ? 40 : 15,
        backgroundColor: "rgba(128, 128, 128, 0.33)",
        width: "35%",
        borderColor: "white",
        borderWidth:1,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    password: {
        color: 'white',
        fontSize: height > 800 ? 30 : 20,
        zIndex: 2, marginTop: height > 800 ? 30 : 10 ,
        backgroundColor: "rgba(128, 128, 128, 0.33)",
        width: "35%",
        borderColor: "white",
        borderWidth:1,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    colorFilter: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.6
    },
    loginBtn: {
        color: 'white', fontSize: height > 800 ? 50 : 30, marginTop: height > 800 ? 50 : 10, zIndex: 2
    }
});

export default SignUpScreen;