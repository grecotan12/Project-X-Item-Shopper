import { View, Text, StyleSheet } from "react-native"

export const Title = () => {
    return(
        <View style={styles.titleContainer}>
            <Text style={styles.title}>X Project</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        width: 'auto',
        height: 100,
        backgroundColor: "beige",
        justifyContent: 'center',
    }, 
    title: {
        fontSize: 36,
        textAlign: 'center'
    }
})