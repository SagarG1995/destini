import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const isSmallDevice = SCREEN_WIDTH < 360;

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
