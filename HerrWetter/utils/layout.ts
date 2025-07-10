import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

export const scale = (size:number) => (width / 375) * size; //smalest device
export const verticalScale = (size: number) => (height / 667) * size; // smallest device
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

export const getLocationSelectorHeight = () => {
    return Platform.select({
        android: moderateScale(120),
        web: 120,
    })
}