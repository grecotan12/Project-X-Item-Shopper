import { Dimensions, StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { File } from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { GetCategory } from '../components/GetCategory';
import { Turns } from "../components/Turns";
import { Star } from "../components/Star";

const { width, height } = Dimensions.get('window');

export const CameraScreen = ({ imageUri, setImageUri }) => {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const navigation = useNavigation();
    const [category, setCategory] = useState("");
    const [showCategory, setShowCategory] = useState(false);
    const [error, setError] = useState("");

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.permissionContainer}>
                <View style={styles.permissionBox}>
                    <Text>Please grant camera permission</Text>
                    <Button onPress={requestPermission} title="Accept" />
                </View>
            </View>
        );
    }

    const capturePic = async () => {
        if (!cameraRef.current) return;

        const pic = await cameraRef.current.takePictureAsync({
            quality: 0.8,
            skipProcessing: true
        })

        setImageUri(pic.uri);
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
        const formData = new FormData();

        formData.append("file", {
            uri: imageUri,
            name: "upload.jpg",
            type: "image/jpeg"
        });
        try {
            const res = await axios.post("https://ellie-unhoarding-unverminously.ngrok-free.dev/recognize",
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
            navigation.navigate('Objects', {
                info: finalList
            })
        } catch (error) {
            // console.log(error);
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
        const formData = new FormData();

        formData.append("file", {
            uri: imageUri,
            name: "upload.jpg",
            type: "image/jpeg"
        });
        try {
            const res = await axios.post(`https://ellie-unhoarding-unverminously.ngrok-free.dev/searchImage/${category}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            const data = res.data?.organic;
            const userId = res.data?.user_id;
            navigation.navigate('Result', {
                searchResult: data,
                userId: userId, 
                category: category
            })
        } catch (error) {
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
            <Turns />
            <View style={styles.cameraContainer}>
                <Text style={styles.title}>Chosen Image</Text>
                {imageUri ? <Image source={{ uri: imageUri }} style={styles.cameraCapture} /> :
                    <CameraView ref={cameraRef} style={styles.cameraCapture} />}
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={[styles.btnStyle, btnStyles.takeBtn]} onPress={capturePic}>
                        <Text style={styles.btnTextStyle}><FontAwesome name="camera" size={32} color="white" /></Text>
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
                {/* <Image source={{ uri: `data:image/jpeg;base64,${test}`}} style={{ width: 200, height: 200 }} /> */}
            </View>
            {showCategory &&
                <GetCategory category={category} setCategory={setCategory} getCat={getCat} chooseObject={chooseObject} error={error} />
            }
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
        overflow: 'hidden'
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 24,
        fontFamily: 'Title-Font',
        color: 'white'
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
    }
});