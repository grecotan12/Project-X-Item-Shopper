import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native"
import { Title } from "../components/Title"
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
// import { initLlama } from "llama.rn";
// import RNFS from 'react-native-fs'; // File system module
import { useEffect } from "react";
import { Turns } from "../components/Turns";
import { Star } from "../components/Star";

const { width, height } = Dimensions.get('window');
export const MainScreen = ({
    // llm, setLLM 
}) => {
    const navigation = useNavigation();

    // useEffect(() => {
    //     const ensureModel = async () => {
    //         const dest = `${RNFS.DocumentDirectoryPath}/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf`;
    //         const src = "models/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf";
    //         const exists = await RNFS.exists(dest);
    //         if (exists) {
    //             if (!llm) {
    //                 setLLM(await initLlama({
    //                     model: `${RNFS.DocumentDirectoryPath}/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf`,
    //                     n_ctx: 1024,
    //                     n_threads: 2,
    //                 }));
    //             }
    //             console.log(true)
    //             return;
    //         }
    //         await RNFS.copyFileAssets(src, dest);
    //         if (!llm) {
    //             setLLM(await initLlama({
    //                 model: `${RNFS.DocumentDirectoryPath}/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf`,
    //                 n_ctx: 1024,
    //                 n_threads: 2,
    //             }));
    //         }
    //     }
    //     ensureModel();
    // })

    const stars = [...Array(40)].map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 5 + 4,
        duration: Math.random() * 1000 + 500,
    }));

    const camScreen = () => {
        navigation.navigate('Camera');
    }

    const pickScreen = () => {
        navigation.navigate('Upload');
    }

    return (
        <View style={styles.container}>
            {stars.map((star, i) => (
                <Star key={i} {...star} />
            ))}
            <Title />
            <Turns /> 
            <View style={styles.btnContainer}>
                <TouchableOpacity style={[styles.btnStyle, styles.takeBtn]} onPress={camScreen}>
                    <Text style={styles.btnTextStyle}><FontAwesome name="camera" size={32} color="white" /></Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnStyle, styles.photoBtn]} onPress={pickScreen}>
                    <Text style={styles.btnTextStyle}><FontAwesome name="photo" size={32} color="white" /></Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "#000"
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 2
    },
    btnStyle: {
        width: 'auto',
        padding: 16,
        borderRadius: 20,
        zIndex: 2
    },
    btnTextStyle: {
        fontSize: 24,
        textAlign: 'center',
        color: "white"
    },
    takeBtn: {
        backgroundColor: 'rgba(0, 128, 0, 0.8)'
    },
    photoBtn: {
        backgroundColor: 'rgba(41, 81, 140, 0.8)',
    },
});