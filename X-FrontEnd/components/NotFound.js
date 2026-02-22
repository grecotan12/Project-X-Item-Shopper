import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { SlidingText } from './SlidingText';

export const NotFound = () => {
    return (
        <View
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
            duration={800}
            />
        </View>
    )
}