import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from "react";
import axios from 'axios';

export const Turns = ({ turns, setTurns }) => {
    const [msg, setMsg] = useState(true);

    useEffect(() => {
        const getTurns = async () => {
            try {
                const res = await axios.get("https://api.dosguardx.com/getTurns");
                setTurns(res.data);
                // if turnLeft < 3
                // setNoTurnleft(true)
            } catch (error) {
                console.log(error);
            }
        }
        getTurns();
    }, [turns])

    return (
        <>
            <View style={[styles.turnsContainer, {backgroundColor: msg ? "rgba(211, 211, 211, 1)":  "#BA8E23",}]}>
                <TouchableOpacity onPress={() => setMsg(!msg)}>
                    <Text style={styles.turnsText}>{turns}</Text>
                </TouchableOpacity>
            </View>
            {msg &&
            <View style={styles.msgContainer}>
                <Text style={styles.msgText}>Limited Search</Text>
            </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    turnsContainer: {
        position: "absolute",
        top: 10,
        left: 10,
        padding: 5,
        borderRadius: 10,
        zIndex: 10
    },
    msgContainer: {
        position: "absolute",
        top: -3,
        left: 50,
        padding: 6,
        backgroundColor: "rgba(211, 211, 211, 1)",
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
        color: "black",
        fontSize: 16,
        textAlign: "center",
        fontFamily: 'Normal-Font',
    }
})