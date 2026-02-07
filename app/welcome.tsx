import Button from '@/components/Button';
import ScreenWrapper from '@/components/ScreenWrapper';
import { IMAGES } from '@/constants/images';
import { useRouter } from 'expo-router';
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function TabContainer() {
    const router = useRouter();
    return (
        <ScreenWrapper className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor={'transparent'} />
            <View className="flex-1 items-center justify-around">
                <Image
                    style={styles.welcomeImage}
                    source={IMAGES.welcome}
                    resizeMode="contain"
                />
                <View>
                    <Text className="text-2xl font-bold text-textDark">Welcome</Text>
                    <Text className="text-lg font-medium text-textLight">
                        to Social App
                    </Text>
                </View>
                <View className="w-full gap-10 px-6">
                    <Button
                        buttonStyle="bg-primary justify-center items-center rounded-md py-3 px-6"
                        textStyle="text-lg font-bold text-white"
                        title="Get Started"
                        hasShadow
                        onPress={() => router.push('/register')}
                    />
                </View>
                <View className="mb-6 text-center flex-row justify-center">
                    <Text>Already have an account?</Text>
                    <Pressable onPress={() => router.push('/login')}>
                        <Text className="text-primaryDark font-bold"> Log In</Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    welcomeImage: {
        width: '50%',
        height: '50%',
        alignSelf: 'center',
    },
});
