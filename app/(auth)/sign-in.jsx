import { View, Text, ScrollView, Image, Dimensions, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
    }
    setSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="flex w-full h-full justify-center my-6 px-4"
          style={{ minHeight: Dimensions.get("window").height - 170 }}
        >
          <Link href="/">
            <Image source={images.logo} className="w-[115px] h-[30px]" resizeMode="contain" />
          </Link>
          <Text className="text-2xl text-white font-semibold font-psemibold mt-10">Sign in</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles=""
            placeholder="Email"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles=""
            placeholder="Passwords"
          />
          <CustomButton
            title="Login"
            containerStyles="mt-10"
            isLoading={isSubmitting}
            handlePress={submit}
          />
          <View className="flex flex-row gap-2 mt-7 justify-center">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an account ?</Text>
            <Link className="text-lg text-secondary-200 underline font-psemibold" href="/sign-up">
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
