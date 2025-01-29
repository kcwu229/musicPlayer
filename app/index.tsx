import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import {
  NavigationContainer,
  NavigationIndependentTree,
  createStaticNavigation,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screen/HomeScreen";
import FeedScreen from "../Screen/FeedScreen";
import LibraryScreen from "../Screen/LibraryScreen";
import SearchScreen from "../Screen/SearchScreen";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Tab = createBottomTabNavigator();

export default function Page() {
  return (
    <NavigationIndependentTree>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
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
