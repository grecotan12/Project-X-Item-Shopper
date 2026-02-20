import { useEffect, useRef, useState } from "react"
import { Animated, Text } from "react-native"

export const SlidingText = ({ msgs, duration}) => {
    const translateX = useRef(new Animated.Value(-200)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const [index, setIndex] = useState(0);

    const animate = () => {
        Animated.parallel([
            Animated.timing(translateX, {
                toValue: 0,
                duration,
                useNativeDriver: true
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration,
                useNativeDriver: true
            })
        ]).start(() => {
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(translateX, {
                        toValue: 200,
                        duration,
                        useNativeDriver: true
                    }),
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration,
                        useNativeDriver: true
                    })
                ]).start(() => {
                    translateX.setValue(-200);
                    setIndex((prev) => (prev + 1) % msgs.length);
                    animate();
                })
            }, 800)
        });
    };

    useEffect(() => {
        animate();
    }, [])

    return (
        <Animated.View
            style={{
                transform: [{ translateX }],
                opacity
            }}
        >
            <Text style={{
                fontFamily: "Title-Font",
                color: "white"
            }}>{msgs[index]}</Text>
        </Animated.View>
    )
}