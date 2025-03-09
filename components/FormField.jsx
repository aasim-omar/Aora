import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

export default function FormField({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placeholder,
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <View className={`mt-8 ${otherStyles}}`}>
      <Text className="text-gray-100 font-pmedium mb-2">{title}</Text>
      <View>
        <TextInput
          className="border-2 border-black-200  rounded-xl bg-black-200 flex-row items-center justify-between text-white font-psemibold px-4 py-6 focus:border-secondary-200 "
          secureTextEntry={title === "Password" && !showPassword}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          value={value}
          onChangeText={handleChangeText}
          keyboardType={keyboardType}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              className="w-10 h-10 absolute right-[10px] bottom-[16px]"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
