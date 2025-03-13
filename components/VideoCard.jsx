import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "../constants";
import { FontAwesome } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av"
import { useState } from "react";

const VideoCard = ({ item: { title, creator, thumbnail, video } }) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex-row justify-between items-start w-full">
        <View className="flex-row">
          <View className="w-[47px] h-[47px] border-2 border-secondary rounded-lg p-1 mr-3">
            <Image
              source={{ uri: creator.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="flex-col gap-2">
            <Text className="font-psemibold text-sm text-white">{title}</Text>
            <Text className="text-xs text-gray-100 font-pregular">{creator.username}</Text>
          </View>
        </View>
        <View>
          <FontAwesome name="ellipsis-v" color="#fff" size={25} />
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
