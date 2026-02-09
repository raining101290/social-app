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
    multiline?: boolean;
    numberOfLine?: number;
};

const Input = (props: InputProps) => {
    const isMultiline = props.multiline;

    return (
        <View
            className={`
                flex-row border border-light rounded-md px-4 gap-3 bg-white
                ${isMultiline ? 'py-3 min-h-[100px] items-start' : 'h-12 items-center'}
                ${props.containerClass || ''}
            `}
        >
            {props.icon && props.icon}

            <TextInput
                {...props}
                multiline={isMultiline}
                numberOfLines={props.numberOfLine}
                className={`flex-1 text-base text-text ${props.inputClass || ''}`}
                onChangeText={props.onChangeText}
                secureTextEntry={props.secureTextEntry || false}
                placeholder={props.placeholder}
                placeholderTextColor={COLORS.textLight}
                textAlignVertical={isMultiline ? 'top' : 'center'}
                ref={props.inputRef}
            />
        </View>
    );
};

export default Input;
