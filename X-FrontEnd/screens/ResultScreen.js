import { useRoute, useNavigation } from "@react-navigation/native"
import { FlatList, View, Dimensions, TouchableOpacity, Text } from "react-native"
import { CollapseCard } from "../components/CollapseCard";
import { useEffect } from "react";
import axios from 'axios';
import { Turns } from "../components/Turns";
import { Star } from "../components/Star";
import * as SecureStore from "expo-secure-store";
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');
export const ResultScreen = ({ turns, setTurns }) => {
    const route = useRoute();
    const navigation = useNavigation();
    const { searchResult, userId, category } = route.params;
    let titlesFound = [];
    if (searchResult.length < 5) {
        searchResult.forEach(element => {
            titlesFound.add(element.title);
        });
    }
    else {
        titlesFound = [searchResult[0].title, searchResult[1].title, searchResult[2].title,
        searchResult[3].title, searchResult[4].title];
    }

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

    return (
        <View style={{ flex: 1, backgroundColor: '#000', padding: 20 }}>
            {stars.map((star, i) => (
                <Star key={i} {...star} />
            ))}
            <Turns turns={turns} setTurns={setTurns} />
            <TouchableOpacity
                onPress={() => navigation.navigate("Fact", {
                    titlesFound: titlesFound
                })}
                style={{ position: "absolute", top: 5, right: 8, backgroundColor: "rgba(211, 211, 211, 1)", borderRadius: 10, padding: 4 }}>
                <LottieView 
                                source={require('../assets/animations/info.json')}
                                autoPlay
                                loop
                                style={{ width: 50, height: 50 }}
                            />
            </TouchableOpacity>
            <FlatList
                style={{ marginTop: 40}}
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