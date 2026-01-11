import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { File } from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';

export const CameraScreen = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [imageUri, setImageUri] = useState(null);

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

    const clearPic = async() => {
        if (!imageUri) return;

        const file = new File(imageUri);
        await file.delete();
        setImageUri(null);
        console.log(imageUri);
    }

    return (
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                <Text style={styles.title}>Take a picture</Text>
                {imageUri ? <Image source={{ uri: imageUri }} style={styles.cameraCapture}/> :
                <CameraView ref={cameraRef} style={styles.cameraCapture} /> }
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={[styles.btnStyle, btnStyles.takeBtn]} onPress={capturePic}>
                        <Text style={styles.btnTextStyle}><FontAwesome name="camera" size={32} color="white" /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnStyle, btnStyles.retakeBtn]} onPress={clearPic}>
                        <Text style={styles.btnTextStyle}><FontAwesome name="rotate-left" size={32} color="white" /></Text>
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
        flexDirection:'row',
        justifyContent: 'space-around'
    },
    takeBtn: {
        backgroundColor: 'green',
        padding: 16,
    }
});