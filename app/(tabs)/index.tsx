import { IMAGES } from "@/constants/images";
import { Image, ScrollView, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-primary"
    >
        <View className="absolute bg-slate-900 w-full h-[200px] items-center justify-center pt-12">
            <Image source={IMAGES.logo} className="w-40 h-10" />
        </View>

        <ScrollView
            className="flex-1 px-5"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingTop: 220,
                paddingBottom: 10,
                minHeight: '100%',
            }}
        >
            <View className="w-full h-40 rounded-lg bg-slate-800 mb-4" />
        </ScrollView>
    </View>
  );
}
