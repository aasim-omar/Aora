import { View, Image, Text } from "react-native";
import { images } from "../constants";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

export default function EmptyState({title, subtitle}) {
  return (
    <View className="h-full">
      <Image source={images.empty} className="w-full h-[316px]" resizeMode="contain" />
      <Text className="text-center text-3xl font-psemibold text-gray-100">{title}</Text>
      <Text className="text-center font-psemibold text-gray-50">
        {subtitle}
      </Text>
      <CustomButton title="Go Back To Explore" containerStyles="mt-6" handlePress={() => router.push("/home")} />
    </View>
  );
}
