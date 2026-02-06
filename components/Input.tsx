import { COLORS } from '@/constants/colors';
import React from 'react';
import { TextInput, View } from 'react-native';

type InputProps = {
    className?: string;
    icon?: React.ReactNode;
    value?: string;
    inputRef?: React.Ref<TextInput>;
    placeholder?: string;
    onChangeText: (text: any) => void;
    secureTextEntry?: boolean;
    inputClass?: string;
    containerClass?: string;
};
const Input = (props: InputProps) => {
    return (
        <View
            className={`flex-row items-center justify-center border border-light rounded-md px-4 py-3 gap-3 bg-white ${props.containerClass || ''}`}
        >
            {props.icon && props.icon}
            <TextInput
                {...props}
                className={`flex-1 text-lg text-text ${props.inputClass || ''}`}
                onChangeText={props.onChangeText}
                secureTextEntry={props.secureTextEntry || false}
                placeholder={props.placeholder}
                placeholderTextColor={COLORS.textLight}
                ref={props.inputRef && props.inputRef}
            />
        </View>
    );
};

export default Input;
