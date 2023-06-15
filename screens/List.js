import { useContext, useState } from "react";
import { View, Text, FlatList, Pressable, TouchableOpacity, Image, StyleSheet, Animated, Dimensions, Modal } from "react-native";
import { DATA, giftsData, reactions } from "../constants/data";
import { GiftContext } from "../store/giftContext";
import { SharedElement } from "react-navigation-shared-element";
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from "react-native-animatable";
import ReceiveModal from "../modals/receiveModal";
import { Video, ResizeMode } from "expo-av";

const { width, height } = Dimensions.get('window');

const itemWidth = width * 0.6;
const itemHeight = 200;

const width2 = width * 0.6;
const height2 = 300;

const SPACING = 12;

const notification = {
    0: [{ opacity: 0, translateX: 30 }],
    1: [{ opacity: 1, translateX: 0 }]
}

export default function List({ navigation }) {
    const giftCtx = useContext(GiftContext);
    const [receive, setReceive] = useState(true);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const scrollX2 = React.useRef(new Animated.Value(0)).current;
    const scrollX3 = React.useRef(new Animated.Value(0)).current;
    return (
        <View style={{ flex: 1 }}>
            <Animatable.View
                style={styles.notificationBox}
                animation={notification}
                delay={500}
                useNativeDriver
            >
                <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]} onPress={() => navigation.push("notifications")}>
                    <Ionicons name="notifications" size={24} color="black" />
                </Pressable>
            </Animatable.View>
            <View style={{ flex: 1 }}>
                <Text style={{ height: 40, marginLeft: SPACING, fontWeight: "bold", fontSize: 28 }}>Great envelopes...</Text>
                <Animated.FlatList
                    data={DATA}
                    keyExtractor={(item) => item.key}
                    horizontal
                    pagingEnabled={true}
                    snapToInterval={itemWidth + SPACING}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate="normal"
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                    contentContainerStyle={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    renderItem={({ item, index }) => {
                        const inputRange = [
                            (index - 1) * (itemWidth + SPACING),
                            (index) * (itemWidth + SPACING),
                            (index + 1) * (itemWidth + SPACING)
                        ];
                        const translateX = scrollX.interpolate({
                            inputRange,
                            outputRange: [itemWidth / 5, 0, -itemWidth / 5]
                        });
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0, 1, 0]
                        })
                        return (
                            <TouchableOpacity style={{ width: itemWidth, height: itemHeight, marginLeft: SPACING }} onPress={() => {
                                giftCtx.setPath("envelope");
                                navigation.navigate("image", { item });
                            }}>

                                <SharedElement id={`item.${item.key}.text1`} style={{ zIndex: 99, position: "absolute" }}>
                                    <Animated.Text style={[styles.text, { opacity, transform: [{ translateX }] }]}>{item.name}</Animated.Text>
                                </SharedElement>
                                <SharedElement id={`item.${item.key}.image1`}>
                                    <Image
                                        source={item.image}
                                        style={{
                                            width: itemWidth,
                                            height: itemHeight,
                                            borderRadius: 12
                                        }}
                                        resizeMode="cover"
                                    />
                                </SharedElement>

                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ height: 40, marginLeft: SPACING, fontWeight: "bold", fontSize: 28, }}>Good gifts...</Text>
                <Animated.FlatList
                    data={giftsData}
                    keyExtractor={(item) => item.key}
                    horizontal
                    pagingEnabled
                    snapToInterval={itemWidth + SPACING}
                    decelerationRate="normal"
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX2 } } }],
                        { useNativeDriver: true }
                    )}
                    contentContainerStyle={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    renderItem={({ item, index }) => {
                        const inputRange2 = [
                            (index - 1) * (itemWidth + SPACING),
                            (index) * (itemWidth + SPACING),
                            (index + 1) * (itemWidth + SPACING)
                        ];
                        const translateX2 = scrollX2.interpolate({
                            inputRange: inputRange2,
                            outputRange: [itemWidth, 0, -itemWidth]
                        });
                        return (
                            <TouchableOpacity style={{ width: itemWidth, height: itemHeight, marginLeft: SPACING }} onPress={() => {
                                giftCtx.setPath("gifts");
                                navigation.navigate("image", { item });
                            }}>
                                <SharedElement id={`item.${item.key}.text2`} style={{ zIndex: 99, position: "absolute" }}>
                                    <Animated.Text style={[styles.text, { transform: [{ translateX: translateX2 }] }]}>{item.name}</Animated.Text>
                                </SharedElement>
                                <SharedElement id={`item.${item.key}.image2`}>
                                    <Image
                                        source={item.image}
                                        style={{
                                            width: width2,
                                            height: itemHeight,
                                            borderRadius: 12,
                                        }}
                                        resizeMode="cover"
                                    />
                                </SharedElement>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ height: 40, marginLeft: SPACING, fontWeight: "bold", fontSize: 28 }}>Great reactions...</Text>
                <Animated.FlatList
                    data={reactions}
                    keyExtractor={(item) => item.key}
                    horizontal
                    pagingEnabled
                    snapToInterval={itemWidth + SPACING}
                    decelerationRate="normal"
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX3 } } }],
                        { useNativeDriver: true }
                    )}
                    contentContainerStyle={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    renderItem={({ item, index }) => {
                        const inputRange3 = [
                            (index - 1) * (itemWidth + SPACING),
                            (index) * (itemWidth + SPACING),
                            (index + 1) * (itemWidth + SPACING)
                        ];
                        const translateX3 = scrollX3.interpolate({
                            inputRange: inputRange3,
                            outputRange: [itemWidth, 0, -itemWidth]
                        });
                        return (
                            <TouchableOpacity style={{ width: itemWidth, height: itemHeight, marginLeft: SPACING }} onPress={() => navigation.push("videoPlayer", { index })}>
                                <Video
                                    style={{ height: itemHeight, width: itemWidth, borderRadius: 12 }}
                                    source={{ uri: item.url }}
                                    resizeMode={ResizeMode.COVER}
                                    useNativeControls
                                    isLooping={true}

                                />
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            <Modal visible={receive} animationType="slide" transparent={true}>
                <ReceiveModal setReceive={setReceive} />
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textTransform: "uppercase",
        fontWeight: "bold",
        color: "white",
        marginLeft: 6,
        marginTop: 8
    },
    notificationBox: {
        width: 30,
        height: 30,
        marginLeft: width - 60,
        marginTop: 50
    }
});