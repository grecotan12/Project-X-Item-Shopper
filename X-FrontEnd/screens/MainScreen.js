import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { Title } from "../components/Title"
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export const MainScreen = ({ imageUri, setImageUri }) => {
    const navigation = useNavigation();

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