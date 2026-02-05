import { useEffect, useRef } from "react";
import { Animated } from 'react-native';

export const Star = ({ x, y, size, duration }) => {
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(anim, {
                    toValue: 1,
                    duration,
                    useNativeDriver: true
                }),
                Animated.timing(anim, {
                    toValue: 0,
                    duration,
                    useNativeDriver: true
                })
            ])
        ).start();
    }, [])
    
    const translateX = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [x, x + 200],
    });

    const translateY = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [y, y + 100],
    });

    return (
        <Animated.View
            style={{
                position: 'absolute',
                width: size,
                height: size,
                backgroundColor: 'white',
                borderRadius: size / 2,
                transform: [{ translateX }, { translateY }],
                opacity: anim,
            }}
        />
    );

}