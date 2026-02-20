import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { SlidingText } from './SlidingText';

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
            <SlidingText 
            msgs={[
                "We have trouble getting website information",
                "Please click on the link of the search result to access."
            ]}
            />
        </View>
    )
}