import { View, Text, FlatList, Image, TouchableOpacity, ImageBackground } from "react-native";
import { icons } from "../constants";
import { Video, ResizeMode } from "expo-av";
import * as Animatable from "react-native-animatable";
import { useState } from "react";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.2,
  },
};

const zoomOut = {
  0: {
    scale: 1.2,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
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
        <TouchableOpacity className="relative flex justify-center items-center m-2">
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export default function Trending({ posts }) {
	const [activeItem, setActiveItem] = useState(posts[0]);

	const viewableItemsChanged = ({ viewableItems }) => {
		if (viewableItems.length > 0) {
			setActiveItem(viewableItems[0].key)
		}
	}

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
			onViewableItemsChanged={viewableItemsChanged}
			contentOffset={{ x: 180 }}
			viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
    />
  );
}
