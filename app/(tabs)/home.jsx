import { View, Text, FlatList, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants"
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import Trending from "@/components/Trending"
import RefreshControl from "../../components/RefreshControl";
import { useState, useEffect } from "react";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite"
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { data: posts, refetch, isLoading } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  // console.log(posts);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }
  
  return (
    <SafeAreaView className="bg-primary text-white h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (<VideoCard item={item}/>)}
        ListHeaderComponent={() => (
          <View className="my-6 mx-4">
            <View className="flex justify-between flex-row my-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcom back</Text>
                <Text className="font-psemibold text-2xl text-white">JS Mastery</Text>
              </View>
              <View>
                <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain"/>
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No Viedios Founds" subtitle="No Videos Created Yet" />}
        // refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
      />
    </SafeAreaView>
  );
};

export default Home;