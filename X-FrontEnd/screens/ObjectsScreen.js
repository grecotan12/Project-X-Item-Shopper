import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity } from "react-native"
import { useRoute } from "@react-navigation/native"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export const ObjectsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { info } = route.params;

    const chooseObject = async (object, img) => {
        const formData = new FormData();

        formData.append("file", {
            uri: `data:image/jpeg;base64,${img}`,
            name: "upload.jpg",
            type: "image/jpeg"
        });
        try {
            const res = await axios.post(`http://192.168.1.237:8000/searchImage/${object}`, 
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            const data = res.data;
            navigation.navigate('Result', {
                searchResult: data
            })
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
