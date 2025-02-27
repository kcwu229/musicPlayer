import { StyleSheet, Text, View, SafeAreaView, Dimensions, StatusBar } from "react-native";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import "react-native-gesture-handler";
import {FollowProvider} from "@/context/UseFollowContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "@/screen/HomeStackNavigator";
import FeedScreen from "@/screen/FeedScreen";
import {UserProvider, useUserContext} from "@/context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { MusicPlayerProvider } from "@/context/MusicPlayerContext";
import getSize from "@/components/AdjustSizeByScreenSize";
import LibraryScreenNavigator from "@/screen/LibraryScreenNavigator";
import SearchScreenNavigator from "@/screen/SearchScreenNavigator";

const Tab = createBottomTabNavigator();

export default function Page() {
  return (
    <NavigationIndependentTree>
      <GestureHandlerRootView>
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <UserProvider>
                <FollowProvider>
              <MusicPlayerProvider>
                <NavigationContainer>
                        <Tab.Navigator
                            initialRouteName="Home"
                            screenOptions={{
                                tabBarActiveTintColor: "orange",
                                tabBarInactiveTintColor: "white",
                                tabBarStyle: {
                                    height: getSize(70, 90, 130),
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
                                                color={focused ? "orange" : "white"}
                                            />
                                        ),
                                        tabBarLabel: "Home",
                                        headerShown: false,
                                        tabBarLabelStyle: {
                                            fontSize: getSize(12,16,20),
                                            margin: getSize(2,3,5),
                                        },
                                    }}
                                />
                            <Tab.Screen
                                name="Search"
                                component={SearchScreenNavigator}
                                options={{
                                    tabBarIcon: ({ focused }) => (
                                        <Ionicons
                                            name="search"
                                            size={30}
                                            color={focused ? "orange" : "white"}
                                        />
                                    ),
                                    tabBarLabel: "Search",
                                    headerShown: false,
                                    tabBarLabelStyle: {
                                        fontSize: getSize(12,16,20),
                                        margin: getSize(2,3,5),
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
                                            color={focused ? "orange" : "white"}
                                        />
                                    ),
                                    tabBarLabel: "Feed",
                                    headerShown: false,
                                    tabBarLabelStyle: {
                                        fontSize: getSize(12,16,20),
                                        margin: getSize(2,3,5),
                                    },
                                }}
                            />
                            <Tab.Screen
                                name="Library"
                                component={LibraryScreenNavigator}
                                options={{
                                    tabBarIcon: ({ focused }) => (
                                        <Ionicons
                                            name="library"
                                            size={30}
                                            color={focused ? "orange" : "white"}
                                        />
                                    ),
                                    tabBarLabel: "Library",
                                    headerShown: false,
                                    tabBarLabelStyle: {
                                        fontSize: getSize(12,16,20),
                                        margin: getSize(2,3,5),
                                    },
                                }}
                            />
                        </Tab.Navigator>
                </NavigationContainer>
              </MusicPlayerProvider>
                </FollowProvider>
            </UserProvider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({});
