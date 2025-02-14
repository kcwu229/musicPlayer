import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import getSize from "@/components/AdjustSizeByScreenSize";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";

const Stack = createStackNavigator();

const LoginScreenNavigator = () => {
  return (
          <Stack.Navigator initialRouteName="LoginScreen">
              <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
          </Stack.Navigator>
  );
};

export default LoginScreenNavigator;
