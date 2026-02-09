import React from 'react';
import { View } from 'react-native';
import Input from './Input';

type EditorProps = {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
};
const Editor = ({ message, setMessage, placeholder }: EditorProps) => {
    return (
        <View className="mt-4">
            <Input
                secureTextEntry
                multiline
                numberOfLine={10}
                placeholder={placeholder}
                value={message}
                onChangeText={setMessage}
            />
        </View>
    );
};

export default Editor;
