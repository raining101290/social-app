import { COLORS } from '@/constants/colors';
import React from 'react';
import { Pressable, Text } from 'react-native';
import Loading from './Loading';

type ButtonProps = {
    title?: string;
    onPress?: () => void;
    loading?: boolean;
    buttonStyle?: string;
    textStyle?: string;
    hasShadow?: boolean;
}
const Button = ({title, onPress, loading=false, buttonStyle, textStyle, hasShadow}:ButtonProps) => {
    const shadowStyle = {
        shadowColor: COLORS.dark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    };

    if (hasShadow) {
        buttonStyle = buttonStyle ? `${buttonStyle} ` : '';
        buttonStyle += 'shadow-lg';
    }
    if(loading){
        return (
            <Loading size="large" color={COLORS.primary} />
        )
    }
  return (
    <Pressable onPress={onPress} className={buttonStyle} style={hasShadow ? shadowStyle : {}}>
      <Text className={textStyle}>{title}</Text>
    </Pressable>
  )
}

export default Button