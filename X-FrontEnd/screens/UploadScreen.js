import * as ImagePicker from 'expo-image-picker';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { File } from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as ImageManipulator from "expo-image-manipulator";
import { useState } from 'react';
import { GetCategory } from '../components/GetCategory';
import { Turns } from "../components/Turns";
import { Star } from "../components/Star";
import { Loading } from '../components/Loading';

const { width, height } = Dimensions.get('window');

export const UploadScreen = ({ imageUri, setImageUri, llm }) => {
    const navigation = useNavigation();
    const [category, setCategory] = useState("");
    const [showCategory, setShowCategory] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        })

        if (!res.canceled) {
            const asset = res.assets[0];

            const manipulated = await ImageManipulator.manipulateAsync(
                asset.uri,
                [],
                {
                    compress: 0.8,
                    format: ImageManipulator.SaveFormat.JPEG
                }
            )
            setImageUri(manipulated.uri)
        }
    }

    const clearPic = async () => {
        if (!imageUri) return;
        const file = new File(imageUri);
        file.delete();
        setImageUri(null);
        console.log(imageUri);
    }

    const unGroup = async () => {
        if (!imageUri) return;
        setLoading(true);
        const formData = new FormData();

        formData.append("file", {
            uri: imageUri,
            name: "upload.jpg",
            type: "image/jpeg"
        });
        try {
            const res = await axios.post("https://api.dosguardx.com/recognize",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            const detections = res.data['detections'];
            //console.log(detections['laptop'][0].image)
            const finalList = [];
            for (const key in detections) {
                finalList.push({
                    name: key,
                    pic: detections[key][0].image
                })
            }
            setLoading(false);
            navigation.navigate('Objects', {
                info: finalList
            })
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const getCat = async () => {
        setShowCategory(!showCategory);
    }

    const chooseObject = async () => {
        if (category.includes(" ")) {
            setError("Please enter only one word");
            return;
        }
        else if (!imageUri) {
            setError("Please capture picture");
            return;
        }
        else {
            setError("");
        }
        setLoading(true);
        const formData = new FormData();

        formData.append("file", {
            uri: imageUri,
            name: "upload.jpg",
            type: "image/jpeg"
        });
        try {
            const res = await axios.post(`https://api.dosguardx.com/searchImage/${category}`,
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
                category: category
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
        <View style={styles.container}>
            {stars.map((star, i) => (
                <Star key={i} {...star} />
            ))}
            {loading ? <Loading /> :
                <>
                    <Turns />
                    <View style={styles.cameraContainer}>
                        <Text style={styles.title}>Chosen Image</Text>
                        {imageUri ? <Image source={{ uri: imageUri }} style={styles.cameraCapture} /> :
                            <View style={styles.cameraCapture} />}
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={[styles.btnStyle, btnStyles.takeBtn]} onPress={pickImage}>
                                <Text style={styles.btnTextStyle}><FontAwesome name="photo" size={32} color="white" /></Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btnStyle, btnStyles.retakeBtn]} onPress={clearPic}>
                                <Text style={styles.btnTextStyle}><FontAwesome name="rotate-left" size={32} color="white" /></Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btnStyle, btnStyles.objectBtn]} onPress={unGroup}>
                                <Text style={styles.btnTextStyle}><FontAwesome name="object-ungroup" size={32} color="white" /></Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btnStyle, btnStyles.wholeBtn]} onPress={getCat}>
                                <Text style={styles.btnTextStyle}><FontAwesome name="search" size={32} color="white" /></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {showCategory &&
                        <GetCategory category={category} setCategory={setCategory} getCat={getCat} chooseObject={chooseObject} error={error} />
                    }
                </>}
        </View>
    )
}

const btnStyles = StyleSheet.create({
    takeBtn: {
        backgroundColor: "green"
    },
    retakeBtn: {
        backgroundColor: "red"
    },
    objectBtn: {
        backgroundColor: "blue"
    },
    wholeBtn: {
        backgroundColor: "orange"
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    permissionContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    permissionBox: {
        padding: 16,
        borderRadius: 20
    },
    cameraContainer: {
        marginTop: 50,
    },
    cameraCapture: {
        height: 400,
        width: 300,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'rgba(211,188,141,0.3)'
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
        fontFamily: 'Title-Font'
    },
    btnStyle: {
        width: 'auto',
        padding: 16,
        borderRadius: 20
    },
    btnTextStyle: {
        fontSize: 24,
        textAlign: 'center',
        color: "white"
    },
    btnContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    takeBtn: {
        backgroundColor: 'green',
        padding: 16,
    },
});
