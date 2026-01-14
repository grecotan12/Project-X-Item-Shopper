import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { File } from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as ImageManipulator from "expo-image-manipulator";

export const UploadScreen = ({ imageUri, setImageUri }) => {
    const navigation = useNavigation();

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
        await file.delete();
        setImageUri(null);
        console.log(imageUri);
    }

    const sendImage = async () => {
        if (!imageUri) return;
        console.log(imageUri)
        const formData = new FormData();

        formData.append("file", {
            uri: imageUri,
            name: "upload.jpg",
            type: "image/jpeg"
        });
        try {
            const res = await axios.post("http://192.168.1.237:8000/recognize",
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

    return (
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                <Text style={styles.title}>Current Image</Text>
                {imageUri ? <Image source={{ uri: imageUri }} style={styles.cameraCapture} /> :
                    <View style={styles.cameraCapture} />}
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={[styles.btnStyle, btnStyles.takeBtn]} onPress={pickImage}>
                        <Text style={styles.btnTextStyle}><FontAwesome name="photo" size={32} color="white" /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, btnStyles.retakeBtn]} onPress={clearPic}>
                        <Text style={styles.btnTextStyle}><FontAwesome name="rotate-left" size={32} color="white" /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, btnStyles.sendBtn]} onPress={sendImage}>
                        <Text style={styles.btnTextStyle}><FontAwesome name="paper-plane" size={32} color="white" /></Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    sendBtn: {
        backgroundColor: "blue"
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
        overflow: 'hidden',
        backgroundColor: 'beige'
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
