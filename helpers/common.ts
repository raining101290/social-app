import { Dimensions } from "react-native";

const {width: deviceWidth, height:deviceHeight } = Dimensions.get('window');

const heightPercentage = (percentage: number) => {
    return (deviceHeight * percentage) / 100;
}

const widthPercentage = (percentage: number) => {
    return (deviceWidth * percentage) / 100;
}

export const HEIGHT_PERCENTAGE = heightPercentage;
export const WIDTH_PERCENTAGE = widthPercentage;
export const DEVICE_WIDTH = deviceWidth;
export const DEVICE_HEIGHT = deviceHeight;