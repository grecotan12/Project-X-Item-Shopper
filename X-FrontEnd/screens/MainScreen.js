import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { Title } from "../components/Title"
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { initLlama } from "llama.rn";
import RNFS from 'react-native-fs'; // File system module
import { useEffect } from "react";

export const MainScreen = ({ llm, setLLM }) => {
    const navigation = useNavigation();

    useEffect(() => {
        const ensureModel = async () => {
            const dest = `${RNFS.DocumentDirectoryPath}/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf`;
            const src = "models/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf";
            const exists = await RNFS.exists(dest);
            if (exists) {
                if (!llm) {
                    setLLM(await initLlama({
                        model: `${RNFS.DocumentDirectoryPath}/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf`,
                        n_ctx: 1024,
                        n_threads: 2,
                    }));
                }
                console.log(true)
                return;
            }
            await RNFS.copyFileAssets(src, dest);
            if (!llm) {
                setLLM(await initLlama({
                    model: `${RNFS.DocumentDirectoryPath}/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf`,
                    n_ctx: 1024,
                    n_threads: 2,
                }));
            }
        }
        ensureModel();
    })

    // const test = async () => {
    //     console.log("test")
    //     try {
    //         console.log(llm);
    //         const result = await llm.completion({
    //             prompt: "Hello, who are you?",
    //             n_predict: 256,
    //             temperature: 0,
    //             stop: ["</json>"],
    //         });

    //         console.log(result.text);
    //     }
    //     catch (e) {
    //         console.log(e)
    //     }

    // }

    const camScreen = () => {
        navigation.navigate('Camera');
    }

    const pickScreen = () => {
        navigation.navigate('Upload');
    }

    return (
        <>
            <Title />
            <View style={styles.mainContainer}>
                <TouchableOpacity style={[styles.btnStyle, styles.takeBtn]} onPress={camScreen}>
                    <Text style={styles.btnTextStyle}><FontAwesome name="camera" size={32} color="white" /></Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnStyle, styles.photoBtn]} onPress={pickScreen}>
                    <Text style={styles.btnTextStyle}><FontAwesome name="photo" size={32} color="white" /></Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={[styles.btnStyle, styles.photoBtn]} onPress={test}>
                    <Text style={styles.btnTextStyle}>Test</Text>
                </TouchableOpacity> */}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
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
    takeBtn: {
        backgroundColor: "green"
    },
    photoBtn: {
        backgroundColor: "blue"
    }
});