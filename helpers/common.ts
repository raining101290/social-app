import { IMAGES } from '@/constants/images';
import { API_BASE } from '@/lib/api-client';
import moment from 'moment';
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

export const formatDate = (m: any) => {
    let publishDate: string;

    if (m.isSame(moment(), 'day')) {
        // today
        publishDate = `Today, ${m.format('hh:mm A')}`;
    } else if (m.isSame(moment().subtract(1, 'day'), 'day')) {
        // yesterday
        publishDate = `Yesterday, ${m.format('hh:mm A')}`;
    } else if (m.isAfter(moment().subtract(7, 'days'))) {
        // within last 7 days
        publishDate = `${m.format('dddd, hh:mm A')}`;
    } else {
        // older than 7 days
        publishDate = m.format('DD MMM YYYY, hh:mm A');
    }
    return publishDate;
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
