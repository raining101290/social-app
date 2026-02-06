import { COLORS } from '@/constants/colors'
import React from 'react'
import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native'

type LoadingProps = {
  size?: ActivityIndicatorProps['size']
  color?: string
}

const Loading = ({ size = 'large', color = COLORS.primary }: LoadingProps) => {
  return (
    <View className='justify-center items-center'>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default Loading