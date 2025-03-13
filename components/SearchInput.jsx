import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { icons } from "../constants";
import { useState } from "react";
import { router, usePathname } from "expo-router";

export default function SearchInput({ initialQuery }) {
  const [focus, setFocus] = useState(false);
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View
      className={`flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 ${
        focus ? "border-secondary" : ""
      }`}
    >
      <TextInput
        className="mt-0.5 text-white flex-1 font-pregular"
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        value={query}
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Empty Search Field", "Please Enter Something To Search");
          }
          if (pathname.startsWith("/search")) {
            router.setParams({query})
          } else {
            router.push(`/search/${query}`)
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}
