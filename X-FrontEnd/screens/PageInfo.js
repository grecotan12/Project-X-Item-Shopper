import { FlatList, View, Dimensions, Text } from "react-native"
import { Star } from "../components/Star";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import { NotFound } from "../components/NotFound";
import { CollapseCardInfo } from "../components/CollapseCardInfo";
import { Loading } from "../components/Loading";

const { width, height } = Dimensions.get('window');
export const PageInfo = () => {
    const route = useRoute();
    const {
        link
    } = route.params;
    const [info, setInfo] = useState([]);
    const [isErr, setIsErr] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const stars = [...Array(40)].map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 5 + 4,
        duration: Math.random() * 1000 + 500,
    }));

    useEffect(() => {
        const getInfo = async () => {
            const token = await SecureStore.getItemAsync("device_token");
            setIsLoading(true);
            try {
                const res = await axios.post(
                    "https://api.dosguardx.com/getInfo",
                    { "link": link },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = res.data;
                if (!data || !Array.isArray(data) || data.length == 0) {
                    setIsErr(true);
                } else {
                    setInfo(data);
                }
                setIsLoading(false);
                console.log(data)
            } catch (error) {
                console.log(error);
                setIsErr(true);
                setIsLoading(false);
            }
        }
        getInfo();
    }, [link])


    return (
        <View style={{ flex: 1, backgroundColor: '#000', padding: 20 }}>
            {stars.map((star, i) => (
                <Star key={i} {...star} />
            ))}
            {isLoading ? <Loading /> : isErr ?
                <NotFound />
                :
                <FlatList
                    data={info}
                    keyExtractor={(item, index) => item.id ?? index.toString()}
                    renderItem={({ item }) => (
                        <CollapseCardInfo 
                            title={item.title}
                            content={item.content}
                        />
                    )}
                />
            }
        </View>
    )
}