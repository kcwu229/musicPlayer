import { Dimensions, PixelRatio } from "react-native";
const { height, width } = Dimensions.get("window");
const aspectRatio = height / width;
const pixelDensity = PixelRatio.get();

const getSize = (expectedSmallNum, expectedMiddleNum, expectedLargeNum) => {
    if (pixelDensity <= 1) {
        // Low-density screens
        return expectedSmallNum;

    } else if (pixelDensity > 1 && pixelDensity <= 2) {
        // Medium-density screens
        if (aspectRatio > 1.6) {
            // Taller screens
            return expectedMiddleNum;

        } else {
            // Wider screens
            return expectedSmallNum;
        }
    } else {
        // High-density screens
        if (aspectRatio > 1.6) {
            // Taller screens
            return expectedLargeNum;

        } else {
            // Wider screens
            return expectedMiddleNum;
        }
    }
};

export default getSize;