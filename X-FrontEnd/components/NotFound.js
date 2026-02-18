import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export const NotFound = () => {
    return (
        <View
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        >
            <LottieView 
                source={require('../assets/animations/not_found.json')}
                autoPlay
                loop
                style={{ width: 300, height: 300 }}
            />
            <Text style={{ color: "red", fontFamily: "Title-Font", fontSize: 16}}>Sorry we unable to get the page information. Please go to the link in browser.</Text>
        </View>
    )
}