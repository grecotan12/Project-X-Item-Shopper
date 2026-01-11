import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { File } from 'expo-file-system';

export const UploadScreen = ({ imageUri, setImageUri }) => {
    const pickImage = async () => {
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1
        })

        if (!res.canceled) {
            setImageUri(res.assets[0].uri);
        }
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
                <Text style={styles.title}>Upload a picture</Text>
                {imageUri ? <Image source={{ uri: imageUri }} style={styles.cameraCapture}/> :
                <View style={styles.cameraCapture} /> }
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={[styles.btnStyle, btnStyles.takeBtn]} onPress={pickImage}>
                        <Text style={styles.btnTextStyle}><FontAwesome name="photo" size={32} color="white" /></Text>
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
        flexDirection:'row',
        justifyContent: 'space-around'
    },
    takeBtn: {
        backgroundColor: 'green',
        padding: 16,
    }
});
