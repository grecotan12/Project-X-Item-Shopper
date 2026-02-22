import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { SlidingText } from './SlidingText';
import { FontAwesome } from '@expo/vector-icons';

export const NoImageChosen = ({ setNoImageWarn }) => {
    return (
        <View
            style={{
                position: 'absolute',
                top: 100,
                alignItems: 'center',
                padding: 20,
                backgroundColor: "navy",
                margin: 16,
                borderRadius: 10,
                zIndex: 3,
                height: 300,
                width: 350
            }}
        >
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setNoImageWarn(true)}
            >
                <Text><FontAwesome name="times" size={24} color="white" /></Text>
            </TouchableOpacity>
            <LottieView
                source={require('../assets/animations/no_image.json')}
                autoPlay
                loop
                style={{ width: 200, height: 200 }}
            />
            <SlidingText
                msgs={[
                    "You haven't upload or capture an image.",
                    "Please take a picture or upload an image first.",
                ]}
                duration={1500}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        padding: 16,
        backgroundColor: "orange",
        borderRadius: 10
    },
})