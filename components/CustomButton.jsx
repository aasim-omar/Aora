import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

const CustomButton = ({ title, handlePress, containerStyles, isLoading, textStyles }) => {
  return (
    <TouchableOpacity
      className={`bg-secondary-100 rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      onPress={handlePress}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
      {isLoading && (
        <ActivityIndicator animating={isLoading} color="$fff" size="small" className="mx-3" />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
