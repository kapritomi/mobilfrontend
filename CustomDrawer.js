import React from "react";
import { View, Text, ImageBackground, Image, Pressable } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from "react-native";


const CustomDrawer = (props, { navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: 'black' }}>
                <ImageBackground
                    source={require("../mobilfrontend/a.png")}
                    style={{ padding: 20 }}>
                    <Image
                        source={require("../mobilfrontend/fiu.jpg")}
                        style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
                    />
                    <Text style={{ color: '#fff', fontSize: 18 }}>John Doe</Text>
                    <Text style={{ color: '#fff', fontSize: 14 }}>Listák száma:</Text>


                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: "rgb(32,32,32)", paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>

            </DrawerContentScrollView>

        </View>
    )
}

export default CustomDrawer