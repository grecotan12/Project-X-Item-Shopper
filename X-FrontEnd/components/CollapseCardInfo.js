import { StyleSheet, View, TouchableOpacity, Animated, Text } from "react-native"
import { useState, useRef } from "react";

export const CollapseCardInfo = ({ title, content }) => {
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const contentHeight = useRef(0);
    const [open, setOpen] = useState(false);
    const toggle = () => {
        Animated.timing(animatedHeight, {
            toValue: open ? 0 : contentHeight.current,
            duration: 250,
            useNativeDriver: false,
        }).start();

        setOpen(!open);
    };
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={toggle} style={styles.header}>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
            <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>
                <View
                    style={{ position: 'absolute', left: 0, right: 0 }}
                    onLayout={e => {
                        if (contentHeight.current === 0) {
                            contentHeight.current = e.nativeEvent.layout.height;
                        }
                    }}
                >
                    <Text style={styles.contentText}>{content}</Text>
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginVertical: 10,
        borderRadius: 10,
        padding: 16,
        elevation: 3,
    },
    header: {
        paddingVertical: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
        fontFamily: 'Title-Font'
    },
    contentText: {
        fontFamily: 'Normal-Font',
        padding: 10
    }
})