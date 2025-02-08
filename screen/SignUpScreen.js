import { View, Text, Button, ImageBackground, StyleSheet, Dimensions, TextInput } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import {useState, useEffect} from "react";

const backgroundImage = require("../assets/images/loginBg.jpg");
import randomColor from "@/components/RandomColor";
const { height, width } = Dimensions.get("window");

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({username: "", password: ""})
    const [backgroundColor] = useState(randomColor());

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
            <ImageBackground source={null} resizeMode="cover" style={styles.imageBg} />
            <LinearGradient
                colors={backgroundColor}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.colorFilter}>
            </LinearGradient>

            <View style={{ position: "absolute", flex: 1 }}>
                <Text style={{ color: 'white', fontWeight: "bold", fontSize: height > 800 ? 70 : 30, zIndex: 2 }}>Sign Up Screen</Text>
                <Text style={{ color: 'white', fontWeight: "extra-light", fontSize: height > 800 ? 30 : 20, zIndex: 2 }}>Enjoy your musical journey</Text>
                <View style={{ flexGrow: 2 }}></View>

                <TextInput style={styles.username} placeholder="Username" placeholderTextColor="white" value={username} onChangeText={handleInputUsername} />
                { 1 ? <Text>{errors.username}</Text> : null }
                <TextInput style={styles.password} placeholder="Password" placeholderTextColor="white" value={password} onChangeText={handleInputPassword}/>
                { 1 ? <Text>{errors.password}</Text> : null }

                <View style={{ flexGrow: 2 }}></View>
                <View style={{ zIndex: 2 }}>
                    <Button title={"Login"} onPress={() => submitLoginForm()}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    username: { color: 'white', fontSize: height > 800 ? 40 : 30, zIndex: 2, marginTop: height > 800 ? 30 : 10 },
    password: { color: 'white', fontSize: height > 800 ? 40 : 30, zIndex: 2, marginTop: height > 800 ? 30 : 10 },
    colorFilter: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.7
    },
    loginBtn: {
        color: 'white', fontSize: height > 800 ? 50 : 30, marginTop: height > 800 ? 50 : 10, zIndex: 2
    }
});

export default SignUpScreen;