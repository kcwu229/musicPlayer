import {View, Text, Button, ImageBackground, StyleSheet, Dimensions, TextInput, Pressable, Modal} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import {useState, useEffect} from "react";

const backgroundImage = require("../assets/images/loginBg.jpg");
import randomColor from "@/components/RandomColor";
const { height, width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
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
        console.log("ssss")
        const {usernameFail, passwordFail} = formValidation();
        if (!usernameFail && !passwordFail ) {
            console.log("well done")

            const loginData = {
                username: username,
                password: password
            }

            const url =  process.env.EXPO_PUBLIC_BASE_URL + "auth/login";
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
                    <Text style={styles.heading}>Login</Text>
                    <Text style={styles.subHeading}>Enjoy your musical journey</Text>
                    <TextInput style={styles.textField} placeholder="Username" placeholderTextColor="white" value={username} onChangeText={handleInputUsername} />
                    { usernameFail ? <Text style={[styles.subHeading, {color: "red"}]}>*{errors.username}</Text> : null }
                    <TextInput style={styles.textField} placeholder="Password" placeholderTextColor="white" value={password} onChangeText={handleInputPassword}/>
                    { passwordFail ? <Text style={[styles.subHeading,{color: "red"}]}>*{errors.password}</Text> : null }

                    <View style={{ flexGrow: 1 }}></View>

                    <Pressable style={{ zIndex: 1}} onPress={() => submitLoginForm()}>
                        <Text style={styles.submitBtn}>Login</Text>
                    </Pressable>

                    <View style={{ flexGrow: 2 }}></View>
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
    heading: {
        color: 'white',
        fontWeight: "400",
        fontSize: width > 800 ? 70 : 30,
        zIndex: 2,
    },
    subHeading: {
        color: 'white',
        fontWeight: "300",
        fontSize: width > 800 ? 30 : 20,
        zIndex: 2
    },
    submitBtn: {
        color: 'white',
        fontWeight: "300",
        textAlign: "left", // Add this line
        fontSize: width > 800 ? 30 : 20,
        zIndex: 2,
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 1,
        paddingVertical: width > 800 ? 15 : 5,
        paddingHorizontal: width > 800 ? 30 : 15,
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
        fontSize: width > 800 ? 30 : 20,
        zIndex: 2,
        marginTop: width > 800 ? 40 : 15,
        backgroundColor: "rgba(128, 128, 128, 0.33)",
        width: width > 800 ? "45%": "50%",
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
        opacity: 0.85
    },
    loginBtn: {
        color: 'white', fontSize: height > 800 ? 50 : 30, marginTop: height > 800 ? 50 : 10, zIndex: 2
    }
});

export default LoginScreen;