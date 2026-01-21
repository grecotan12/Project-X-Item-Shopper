import { useState, useRef } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';

export const CollapseCard = ({ title, source, link, imageUrl }) => {
    const [open, setOpen] = useState(false);
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const contentHeight = useRef(0);

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
                    onLayout={e => {
                        if (contentHeight.current === 0) {
                            contentHeight.current = e.nativeEvent.layout.height;
                        }
                    }}
                >
                    <Image source={{ uri: imageUrl }} style={{ height: 100, width: 100 }} />
                    <Text>Source: {source}</Text>

                    <Pressable onPress={() => Linking.openURL(link)}>
                        <Text style={{ color: 'blue' }}>{link}</Text>
                    </Pressable>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
        elevation: 3,
    },
    header: {
        paddingVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
});
