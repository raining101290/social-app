import { COLORS } from '@/constants/colors'
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react-native'
import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'

const BackButton = () => {
    const router = useRouter();
  return (
    <Pressable onPress={()=> router.back()} className='p-2 bg-white rounded-full shadow-md w-12 h-12 justify-center items-center self-start'>
      <HugeiconsIcon icon={ArrowLeft02Icon} color={COLORS.text}/>
    </Pressable>
  )
}

export default BackButton