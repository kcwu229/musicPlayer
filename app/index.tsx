import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screen/HomeScreen";
import FeedScreen from "../screen/FeedScreen";
import LibraryScreen from "../screen/LibraryScreen";
import SearchScreen from "../screen/SearchScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Page() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Feed"
          screenOptions={{
            tabBarActiveTintColor: "red",
            tabBarInactiveTintColor: "grey",
            sceneStyle: {
              backgroundColor: "white",
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: () => <Ionicons name="home" size={20} />,
              headerShown: false,
            }}
          ></Tab.Screen>
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
              tabBarIcon: () => <Ionicons name="search" size={20} />,
              headerShown: false,
            }}
          ></Tab.Screen>
          <Tab.Screen
            name="Feed"
            component={FeedScreen}
            options={{
              tabBarIcon: () => <Ionicons name="disc" size={20} />,
              headerShown: false,
            }}
          ></Tab.Screen>
          <Tab.Screen
            name="Library"
            component={LibraryScreen}
            options={{
              tabBarIcon: () => <Ionicons name="library" size={20} />,
              headerShown: false,
            }}
          ></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({});
