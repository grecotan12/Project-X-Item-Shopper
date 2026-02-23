import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { SlidingText } from './SlidingText';
import { FontAwesome } from '@expo/vector-icons';

export const NoImageChosen = ({ setNoImageWarn }) => {
    return (
        <View
            style={{
                position: 'absolute',
                top: 150,
                alignItems: 'center',
                padding: 16,
                backgroundColor: "white",
                margin: 16,
                borderRadius: 10,
                zIndex: 3,
                height: 225,
                width: 250
            }}
        >
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setNoImageWarn(true)}
            >
                <Text><FontAwesome name="times" size={16} color="white" /></Text>
            </TouchableOpacity>
            <LottieView
                source={require('../assets/animations/no_image.json')}
                autoPlay
                loop
                style={{ width: 150, height: 150 }}
            />
            <SlidingText
                msgs={[
                    "Please take a picture or upload an image.",
                    "Please take a picture or upload an image.",
                ]}
                duration={600}
                isWarning={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        padding: 6,
        backgroundColor: "orange",
        borderRadius: 10
    },
})