import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from "react";
import axios from 'axios';

export const Turns = () => {
    const [turns, setTurns] = useState(800);
    const [msg, setMsg] = useState(true);

    useEffect(() => {
        const getTurns = async () => {
            try {
                const res = await axios.get("https://api.dosguardx.com/getTurns/2305");
                setTurns(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getTurns();
    }, [])

    return (
        <>
            <View style={styles.turnsContainer}>
                <TouchableOpacity onPress={() => setMsg(!msg)}>
                    <Text style={styles.turnsText}>{turns}</Text>
                </TouchableOpacity>
            </View>
            {msg &&
            <View style={styles.msgContainer}>
                <Text style={styles.msgText}>Press the top right number to open/close this message.
                    The number is the remain of credits the public can use, please use accordingly so 
                    other users can use as well. Soon we will have unlimited search. We're sorry for the inconvience.</Text>
            </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    turnsContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        padding: 16,
        backgroundColor: "rgba(211, 211, 211, 1)",
        borderRadius: 10,
        zIndex: 10
    },
    msgContainer: {
        position: "absolute",
        top: 70,
        right: 0,
        padding: 16,
        backgroundColor: "#C4A484",
        zIndex: 2,
        margin: 10,
        borderRadius: 10
    },
    turnsText: {
        color: "black",
        fontSize: 16,
        textAlign: "center",
        fontFamily: 'Title-Font'
    },
    msgText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        fontFamily: 'Normal-Font'
    }
})