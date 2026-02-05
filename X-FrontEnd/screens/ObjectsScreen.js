import { Dimensions, View, StyleSheet, FlatList, Text, Image, TouchableOpacity } from "react-native"
import { useRoute } from "@react-navigation/native"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Turns } from "../components/Turns";
import { Star } from "../components/Star";
import { useState } from "react";
import { Loading } from '../components/Loading';

const { width, height } = Dimensions.get('window');
export const ObjectsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { info } = route.params;
    const [loading, setLoading] = useState(false);

    const chooseObject = async (object, img) => {
        setLoading(true);
        const formData = new FormData();

        formData.append("file", {
            uri: `data:image/jpeg;base64,${img}`,
            name: "upload.jpg",
            type: "image/jpeg"
        });
        try {
            const res = await axios.post(`https://ellie-unhoarding-unverminously.ngrok-free.dev/searchImage/${object}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            const data = res.data?.organic;
            const userId = res.data?.user_id;
            setLoading(false);
            navigation.navigate('Result', {
                searchResult: data,
                userId: userId,
                category: object
            })
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const stars = [...Array(40)].map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 5 + 4,
        duration: Math.random() * 1000 + 500,
    }));

    return (
        <View style={{ flex: 1, backgroundColor: '#000', padding: 30 }}>
            {stars.map((star, i) => (
                <Star key={i} {...star} />
            ))}
            {loading ? <Loading /> :
                <>
                    <Turns />
                    <Text style={{ color: 'white', textAlign: "center", margin: 36, fontFamily: 'Title-Font', fontSize: 20 }}>Select Object You Want To Search For</Text>
                    <FlatList
                        style={{ marginTop: 12 }}
                        data={info}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-around' }}
                        renderItem={({ item }) => (
                            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                                <TouchableOpacity onPress={() => chooseObject(item['name'], item['pic'])}>
                                    <Image source={{ uri: `data:image/jpeg;base64,${item['pic']}` }} style={{ width: 150, height: 150, borderRadius: 10 }} />
                                    <Text style={{ marginTop: 10, textAlign: 'center', fontFamily: 'Normal-Font', fontWeight: 600, color: 'white' }}>{item['name']}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({

})