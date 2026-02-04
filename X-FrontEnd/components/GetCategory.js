import { StyleSheet, View, TouchableOpacity, TextInput, Text } from 'react-native';

export const GetCategory = ({ category, setCategory, getCat, chooseObject, error }) => {
    return (
        <View style={styles.categoryContainer}>
            <TextInput
                style={styles.txtInput}
                placeholder='One word for primary object of the image'
                value={category}
                onChangeText={setCategory}
            />
            <View style={styles.btnContainer}>
                <TouchableOpacity style={[styles.btnStyle, btnStyles.closeBtn]} onPress={getCat}>
                    <Text style={styles.btnTextStyle}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnStyle, btnStyles.enterBtn]} onPress={chooseObject}>
                    <Text style={styles.btnTextStyle}>Enter</Text>
                </TouchableOpacity>
            </View>
            <Text
                style={{ color: "red" }}
            >{error}</Text>
        </View>
    )
}

const btnStyles = StyleSheet.create({
    enterBtn: {
        backgroundColor: "blue"
    },
    closeBtn: {
        backgroundColor: "red"
    }
})

const styles = StyleSheet.create({
    categoryContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        width: 300,
        backgroundColor: "lightblue",
        borderRadius: 16,
        boxShadow: "2px 4px gray",
        padding: 16
    },
    btnStyle: {
        width: 'auto',
        padding: 16,
        borderRadius: 20,
    },
    btnTextStyle: {
        textAlign: 'center',
        color: "white"
    },
    btnContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtInput: {
        borderWidth: 1,
        height: 50,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 8,
        backgroundColor: "white"
    }
})