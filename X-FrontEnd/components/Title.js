import { View, Text, StyleSheet } from "react-native"

export const Title = () => {

    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Visuo</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        width: '100%',
        height: 100,
        padding: 16
    },
    title: {
        fontFamily: 'Title-Font',
        fontSize: 48,
        textAlign: 'center',
        zIndex: 2,
        color: "beige"
    },
})