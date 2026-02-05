import { View } from 'react-native';
import LottieView from 'lottie-react-native';

export const Loading = () => {
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
                source={require('../assets/animations/loading.json')}
                autoPlay
                loop
                style={{ width: 300, height: 300 }}
            />
        </View>
    )
}