import { useRoute } from "@react-navigation/native"
import { FlatList, View, Dimensions } from "react-native"
import { CollapseCard } from "../components/CollapseCard";
import { useEffect } from "react";
import axios from 'axios';
import { Turns } from "../components/Turns";
import { Star } from "../components/Star";

const { width, height } = Dimensions.get('window');
export const ResultScreen = () => {
    const route = useRoute();
    const { searchResult, userId, category
        // llm 
    } = route.params;
    // console.log(llm)

    useEffect(() => {
        const saveRes = async () => {
            try {
                await axios.post(`https://ellie-unhoarding-unverminously.ngrok-free.dev/saveRes/${userId}/${category}`,
                    searchResult,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
            } catch (error) {
                console.log(error)
            }
        }
        saveRes();
    }, [searchResult, userId, category])
    
    const stars = [...Array(40)].map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 5 + 4,
        duration: Math.random() * 1000 + 500,
    }));
    return (
        <View style={{ flex: 1, backgroundColor: '#000', padding: 20 }}>
            {stars.map((star, i) => (
                <Star key={i} {...star} />
            ))}
            <Turns />
            <FlatList
                data={searchResult}
                keyExtractor={(item, index) => item.id ?? index.toString()}
                renderItem={({ item }) => (
                    <CollapseCard
                        key={item?.title}
                        title={item?.title}
                        source={item?.source}
                        link={item?.link}
                        imageUrl={item?.imageUrl}
                    />
                )}
            />
        </View>
    )
}