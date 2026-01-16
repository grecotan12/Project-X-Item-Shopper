import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity } from "react-native"
import { useRoute } from "@react-navigation/native"
import { FontAwesome } from '@expo/vector-icons';
import { useState } from "react";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export const ObjectsScreen = () => {
    const route = useRoute();
    const { info } = route.params;
    const [currentObject, setCurrentObject] = useState("");
    const [currentImage, setCurrentImage] = useState("");

    const chooseObject = async (object, img) => {
        setCurrentObject(object);
        setCurrentImage(img);

        try {
            const res = await axios.get("http://192.168.1.237:8000/test");
            const data = res.data;
            for (const info in data) {

            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ padding: 30 }}>
            <Text style={{ textAlign: "center", margin: 20 }}>Select Object You Want To Search For</Text>
            <FlatList
                data={info}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-around' }}
                renderItem={({ item }) => (
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <TouchableOpacity onPress={() => chooseObject(item['name'], item['pic'])}>
                            <Image source={{ uri: `data:image/jpeg;base64,${item['pic']}` }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                            <Text style={{ marginTop: 10, textAlign: 'center' }}>{item['name']}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const btnStyles = StyleSheet.create({
    sendBtn: {
        backgroundColor: "blue"
    }
});

const styles = StyleSheet.create({
    btnStyle: {
        width: 'auto',
        padding: 16,
        borderRadius: 20,
        marginLeft: 50
    },
    btnTextStyle: {
        fontSize: 24,
        textAlign: 'center',
        color: "white"
    },
});
