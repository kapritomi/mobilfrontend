import React, { Component } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Accordion from 'react-native-collapsible/Accordion';
import { List } from 'react-native-paper';

export default class Lista_kiir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            refreshing: false,
            onRefresh: false,
            frissites: false,
            vonal: "",
            isPress: false

        };
    }


    componentDidMount() {
        this.getData().then(adatokvissza => {
            this.setState({ products: adatokvissza })
        })
    }

    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@lista')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {

        }
    }

    handleChange = (id) => {
        let temp = this.state.products.map((product) => {
            if (id === product.id) {
                return { ...product, isChecked: !product.isChecked };
            }
            return product;
        });
        this.setState({ products: temp })
    };
    athuzas = (check) => {
        { check ? this.setState({ vonal: "" }) : this.setState({ vonal: "line-through" }) }

    }

    render() {
        return (
            <View>
                <List.Section >
                    <List.Accordion title="Controlled Accordion">
                        <FlatList style={{ marginTop: 10 }}
                            data={this.state.products}
                            renderItem={({ item }) => (
                                <View >
                                    <View
                                        style={{
                                            marginLeft: 10,
                                            flexDirection: 'row',
                                            flex: 1
                                        }}>
                                        <Pressable onPress={() => { this.handleChange(item.id); this.athuzas(item.isChecked) }}>
                                            <MaterialCommunityIcons
                                                name={item.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={30} color="#000" />
                                        </Pressable>
                                        <Text style={{ fontSize: 20, textDecorationLine: this.state.vonal }} > {item.megnevezes}</Text>

                                    </View>
                                </View>
                            )}
                        />
                    </List.Accordion>
                </List.Section>
            </View >
        );
    }
}

