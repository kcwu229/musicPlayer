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
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Search"
            screenOptions={{
              tabBarActiveTintColor: "white",
              tabBarInactiveTintColor: "grey",
              tabBarStyle: {
                height: 70,
                paddingVertical: 5,
                backgroundColor: "black",
              },
              sceneStyle: {
                backgroundColor: "white",
              },
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name="home"
                    size={30}
                    color={focused ? "white" : "grey"}
                  />
                ),
                tabBarLabel: "Home",
                headerShown: false,
                tabBarLabelStyle: {
                  fontSize: 12,
                  margin: 5,
                },
              }}
            />
            <Tab.Screen
              name="Search"
              component={SearchScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name="search"
                    size={30}
                    color={focused ? "white" : "grey"}
                  />
                ),
                tabBarLabel: "Search",
                headerShown: false,
                tabBarLabelStyle: {
                  fontSize: 12,
                  margin: 5,
                },
              }}
            />
            <Tab.Screen
              name="Feed"
              component={FeedScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name="disc"
                    size={30}
                    color={focused ? "white" : "grey"}
                  />
                ),
                tabBarLabel: "Feed",
                headerShown: false,
                tabBarLabelStyle: {
                  fontSize: 12,
                  margin: 5,
                },
              }}
            />
            <Tab.Screen
              name="Library"
              component={LibraryScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name="library"
                    size={30}
                    color={focused ? "white" : "grey"}
                  />
                ),
                tabBarLabel: "Library",
                headerShown: false,
                tabBarLabelStyle: {
                  fontSize: 12,
                  margin: 5,
                },
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({});
