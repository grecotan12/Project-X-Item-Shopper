import { useRoute } from "@react-navigation/native"
import { FlatList, View } from "react-native"
import { CollapseCard } from "../components/CollapseCard";
import { useEffect } from "react";
import axios from 'axios';

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

    return (
        <View style={{ flex: 1, padding: 20 }}>
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