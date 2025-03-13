import { View, Text, FlatList, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import { images } from "../../constants";
import { useEffect } from "react";

const Search = () => {

  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query))
  
  useEffect(() => {
    refetch();
  }, [query])

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
                <Text className="font-pmedium text-sm text-gray-100">Search Results For the Query:</Text>
                <Text className="font-psemibold text-2xl text-white">{query}</Text>
              </View>
              <View>
                <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain"/>
              </View>
            </View>
            <SearchInput initialQuery={query}/>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No Viedios Founds" subtitle="No Videos found fro this search Query" />}
        // refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
      />
    </SafeAreaView>
  );
};

export default Search;
