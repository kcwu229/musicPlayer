import { Dimensions, PixelRatio, Platform } from "react-native";

const { height, width } = Dimensions.get("window");
const aspectRatio = height / width;
const pixelDensity = PixelRatio.get();

const getSize = (expectedSmallNum, expectedMiddleNum, expectedLargeNum) => {
    if (Platform.OS === "android") {
        // Android-specific logic
        if (pixelDensity <= 1) {
            return expectedSmallNum;
        } else if (pixelDensity <= 2) {
            return expectedMiddleNum;
        } else {
            return aspectRatio > 1.6 ? expectedLargeNum : expectedMiddleNum;
        }
    } else if (Platform.OS === "ios") {
        // iOS-specific logic
        if (pixelDensity <= 1) {
            return expectedSmallNum;
        } else if (pixelDensity > 1 && pixelDensity <= 2) {
            if (aspectRatio > 1.6) {
                return expectedMiddleNum;
            } else {
                return expectedSmallNum;
            }
        } else {
            if (aspectRatio > 1.6) {
                if (height > 1500) {
                    // Larger iOS devices (e.g., iPhone X and above)
                    return expectedLargeNum;
                } else {
                    // Smaller iOS devices (e.g., iPhone 8 and below)
                    return expectedMiddleNum;
                }
            } else {
                return expectedMiddleNum;
            }
        }
    }
};

export default getSize;