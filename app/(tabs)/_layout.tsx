import { IMAGES } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'
// import { StyleSheet } from 'react-native'
type TabIconProps = {
    focused: boolean;
    icon: any;
    title: string;
}

const TabIcon = ({ focused, icon, title }: TabIconProps) => {
    if(focused)
    {
        return (
            <View className='flex flex-row w-full flex-1 min-w-[90px] min-h-[52px] mt-[13px] items-center justify-center rounded-full overflow-hidden bg-purple-200 gap-2'>
                <Image
                    source={icon}
                    tintColor="#151312"
                    className='size-5'
                />
                <Text>
                {title}
                </Text>
            </View>
        )
    }    
    else {
        return (
            <View className='flex flex-col w-full flex-1 min-w-[90px] min-h-14 mt-4 items-center justify-center rounded-full overflow-hidden'>
                <Image
                    source={icon}
                    tintColor="#ffffff"
                    className='size-7'
                />
            </View>
        )
    }
}

export default function TabContainer() {
  return (
    <Tabs screenOptions={{
        tabBarShowLabel:false,
        tabBarStyle: {
            backgroundColor: '#0F0D23',
            borderRadius: 50,
            marginHorizontal: 20,
            marginBottom: 36,
            height: 52,
            position: 'absolute',
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#0F0D23',
        }
    }}>
        <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false, tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={IMAGES.home} title="Home" />
        ) }}  />
        <Tabs.Screen name="search" options={{ title: 'Search', headerShown: false, tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={IMAGES.search} title="Search" />
        ) }} />
        <Tabs.Screen name="saved" options={{ title: 'Saved', headerShown: false, tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={IMAGES.save} title="Saved" />
        ) }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile', headerShown: false, tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={IMAGES.profile} title="Profile" />
        ) }} />
    </Tabs>
  )
}