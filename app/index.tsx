import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "@/screen/HomeStackNavigator";
import FeedScreen from "@/screen/FeedScreen";
import LibraryScreen from "@/screen/LibraryScreen";
import SearchScreen from "@/screen/SearchScreen";
import { Ionicons } from "@expo/vector-icons";
import { MusicPlayerProvider } from "@/context/MusicPlayerContext";

const Tab = createBottomTabNavigator();
const { height } = Dimensions.get("window");

export default function Page() {
  return (
    <NavigationIndependentTree>
      <GestureHandlerRootView>
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
          <MusicPlayerProvider>
            <NavigationContainer>
              <Tab.Navigator
                initialRouteName="Library"
                screenOptions={{
                  tabBarActiveTintColor: "white",
                  tabBarInactiveTintColor: "grey",
                  tabBarStyle: {
                    height: height > 800 ? 130 : 70,
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
                  component={HomeStackNavigator}
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
                      fontSize: height > 800 ? 20 : 12,
                      margin: height > 800 ? 2 : 5,
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
                      fontSize: height > 800 ? 20 : 12,
                      margin: height > 800 ? 2 : 5,
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
                      fontSize: height > 800 ? 20 : 12,
                      margin: height > 800 ? 2 : 5,
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
                      fontSize: height > 800 ? 20 : 12,
                      margin: height > 800 ? 2 : 5,
                    },
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </MusicPlayerProvider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({});
