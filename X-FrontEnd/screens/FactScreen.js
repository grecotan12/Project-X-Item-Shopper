import { Star } from "../components/Star";
import { View, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";

export const FactScreen = () => {
    const route = useRoute();
    const { titlesFound } = route.params;

    const stars = [...Array(40)].map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 5 + 4,
        duration:
            Math.random() * 1000 + 500,
    }));

    useEffect(() => {

    }, [titlesFound])

    return (
        <View>
            {stars.map((star, i) => (
                <Star key={i} {...star} />
            ))}
        </View>
    )
}