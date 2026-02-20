import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { SlidingText } from './SlidingText';

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
            <SlidingText
            msgs={[
                "Communicating with backend server",
                "Hang tight, we're cooking for you",
                "Do you know we are the only free visual product search app?"
            ]}
            duration={100} 
            />
        </View>
    )
}