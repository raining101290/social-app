import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

type AvatarProps = {
    uri?: string;
    rounded?: boolean;
    size?: number;
    style?: {};
};

const Avatar = ({ uri, rounded, size, style }: AvatarProps) => {
    return (
        <Image
            style={[
                styles.image,
                {
                    height: size || 30,
                    width: size || 30,
                    borderRadius: rounded ? (size || 30) / 2 : 8,
                },
                style,
            ]}
            source={uri}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
        />
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        backgroundColor: '#0553',
    },
});

export default Avatar;
