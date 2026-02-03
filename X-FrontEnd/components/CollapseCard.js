import { useState, useRef } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, Linking, TouchableOpacity, Image } from 'react-native';
// import FastImage from 'react-native-fast-image';
// import axios from 'axios';

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
                        style={{ position: 'absolute', left: 0, right: 0 }}
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

    const btnStyles = StyleSheet.create({
        glanceBtn: {
            backgroundColor: "blue"
        },
    });

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
        btnStyle: {
            padding: 16,
            borderRadius: 20
        },
        btnTextStyle: {
            fontSize: 16,
            textAlign: 'center',
            color: "white"
        },
    });
