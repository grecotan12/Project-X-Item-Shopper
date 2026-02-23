import { useRoute, useNavigation } from "@react-navigation/native"
import { FlatList, View, Dimensions } from "react-native"
import { CollapseCard } from "../components/CollapseCard";
import { useEffect, useLayoutEffect } from "react";
import axios from 'axios';
import { Turns } from "../components/Turns";
import { Star } from "../components/Star";
import * as SecureStore from "expo-secure-store";

const { width, height } = Dimensions.get('window');
export const ResultScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { searchResult, userId, category, turns, setTurns } = route.params;
    const titlesFound = [searchResult[0].title, searchResult[1].title, searchResult[2].title,
                        searchResult[3].title, searchResult[4].title];

    useEffect(() => {
        const saveRes = async () => {
            const token = await SecureStore.getItemAsync("device_token");
            try {
                await axios.post(`https://api.dosguardx.com/saveRes/${userId}/${category}`,
                    searchResult,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
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

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate("Fact", {
                        titlesFound: titlesFound
                    })}
                >
                    <FontAwesome
                        style={{ marginLeft: 14 }}
                        name="exclamation" size={22} color="black" />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    return (
        <View style={{ flex: 1, backgroundColor: '#000', padding: 20 }}>
            {stars.map((star, i) => (
                <Star key={i} {...star} />
            ))}
            <Turns turns={turns} setTurns={setTurns} />
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