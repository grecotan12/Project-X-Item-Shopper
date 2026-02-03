import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { File } from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { GetCategory } from '../components/GetCategory';

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
            const res = await axios.post("http://192.168.133.177:8000/recognize",
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

    return (
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                <Text style={styles.title}>Current Image</Text>
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
                <GetCategory category={category} setCategory={setCategory} getCat={getCat} imageUri={imageUri} error={error} />
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
        backgroundColor: '#fff',
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
        fontSize: 24
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