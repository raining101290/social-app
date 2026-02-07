import { IMAGES } from '@/constants/images';
import { API_BASE } from '@/lib/api-client';
import { Dimensions, ImageSourcePropType } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const heightPercentage = (percentage: number) => {
    return (deviceHeight * percentage) / 100;
};

const widthPercentage = (percentage: number) => {
    return (deviceWidth * percentage) / 100;
};

export const HEIGHT_PERCENTAGE = heightPercentage;
export const WIDTH_PERCENTAGE = widthPercentage;
export const DEVICE_WIDTH = deviceWidth;
export const DEVICE_HEIGHT = deviceHeight;

const BASE_URL = API_BASE.replace(/\/api$/, '');

export const toAbsoluteUrl = (path?: string): string | undefined => {
    if (!path) return undefined;
    if (path.startsWith('http')) return path;
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `${BASE_URL}${normalized}`;
};

export const toImageSource = (path?: string): ImageSourcePropType => {
    if (!path) return IMAGES.avatar;

    if (path.startsWith('http')) {
        return { uri: path };
    }

    return { uri: `${BASE_URL}${path.startsWith('/') ? path : '/' + path}` };
};
