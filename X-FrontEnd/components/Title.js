import LottieView from "lottie-react-native"
import { View, Text, StyleSheet } from "react-native"

export const Title = () => {

    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>
                <Text>Astro</Text>
                <View
                    style={{
                        width: 60,
                        height: 30,
                        backgroundColor: "beige",
                        borderRadius: 10
                    }}
                >
                    <LottieView
                        source={require('../assets/animations/title_animation.json')}
                        autoPlay
                        loop
                        style={{ width: 100, height: 100, bottom: 70, right: 20 }}
                    />
                </View>
                <Text>Paws</Text>
            </Text >
        </View >
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        width: '100%',
        height: 100,
        padding: 16,
        top: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontFamily: 'Title-Font',
        fontSize: 40,
        zIndex: 2,
        color: "beige"
    },
})