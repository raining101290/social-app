import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type wrapperProps = {
    children: React.ReactNode;
    bg: string;
}

const ScreenWrapper = ({children, bg}:wrapperProps) => {
    const {top}  = useSafeAreaInsets();
    const paddingTop = top>0 ? top + 5 : 30;
  return (
    <View className={`flex-1 ${bg}`} style={{paddingTop}}>
      {children}
    </View>
  )
}

export default ScreenWrapper