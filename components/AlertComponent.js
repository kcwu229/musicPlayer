import { Alert } from "react-native";
import React from 'react';

const CreateAlert = (title, content, authIssue, navigation=null) => {

    if (authIssue === "authIssue") {
        return Alert.alert(title, content, [
            {
                text: 'Login',
                // todo: swipe up to show login screen
                onPress: () => navigation.navigate("LoginScreen",{
                        name: "Home "
                    }),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
    } else {
        return Alert.alert(title, content, [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
            },
        ]);
    }
}

export default CreateAlert;