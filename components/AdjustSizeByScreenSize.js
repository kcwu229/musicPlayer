import {Dimensions} from "react-native";
const { height, width } = Dimensions.get("window");

const getSize = (expectedSmallNum, expectedMiddleNum, expectedLargeNum) => {
    if (height > 100 && height < 800 && width > 100 && width <= 400) {
        return expectedSmallNum;
    } else if (height >= 800 && height < 1200 && width > 400 && width <= 800) {
        return expectedMiddleNum;
    }
    return expectedLargeNum;
}


export default getSize;