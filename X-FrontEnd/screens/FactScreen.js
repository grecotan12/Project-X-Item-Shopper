import { Star } from "../components/Star";
import { View, Dimensions, ScrollView } from "react-native";
const { width, height } = Dimensions.get('window');
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { CollapseCardInfo } from "../components/CollapseCardInfo";
import axios from 'axios';
import { Loading } from "../components/Loading";

export const FactScreen = () => {
    const route = useRoute();
    const { titlesFound } = route.params;
    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(false);

    const stars = [...Array(40)].map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 5 + 4,
        duration:
            Math.random() * 1000 + 500,
    }));

    useEffect(() => {
        const generateContext = async () => {
            const token = await SecureStore.getItemAsync("device_token");
            setLoading(true);
            try {
                const res = await axios.post("https://api.dosguardx.com/generateObjectContext",
                    { "titles": titlesFound },
                    // {
                    //     headers: {
                    //         "Authorization": `Bearer ${token}`,
                    //         "Content-Type": "application/json",
                    //     },
                    // }
                )
                const data = res.data;
                setInfo(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        generateContext();
    }, [titlesFound])

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#000', padding: 20 }}>
            {stars.map((star, i) => (
                <Star key={i} {...star} />
            ))}
            {loading ?
                <Loading /> :
                (
                    Object.entries(info).map(([key, value]) => (
                        <CollapseCardInfo
                            key={key}
                            title={key.replace(/_/g, " ")}
                            content={value}
                        />
                    ))
                )
            }
        </ScrollView>
    )
}