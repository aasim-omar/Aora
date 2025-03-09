import { View, Image, Text } from "react-native";
import { Redirect, Tabs } from "expo-router";
import { icons } from "../../constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#161622",
          height: 55
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={25} color={color} />
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="bookmark" size={25} color={color} />
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="plus" size={25} color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={25} color={color} />
        }}
      />
    </Tabs>
  );
}
