import React, { Component, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';

export default class Lista_kiir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            refreshing: false,
            onRefresh: false,
            frissites: false,
            vonal: "",
            title: "Szar",
            isActive: false,
            activeSections: []

        };
    }

    componentDidMount() {
        this.getData().then(adatokvissza => {

            this.setState({ products: adatokvissza })

        })
        alert(JSON.stringify(this.state.products))
    }

    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@lista')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {

        }
    }
    setSections = (sections) => {
        setActiveSections(
            sections.includes(undefined) ? [] : sections
        );
    };


    handleChange = (id) => {
        let temp = this.state.products.map((product) => {
            if (id === product.id) {
                return { ...product, isChecked: !product.isChecked };
            }
            return product;
        });
        this.setState({ products: temp })
    };
    renderHeader = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={[
                    styles.header,
                    isActive ? styles.active : styles.inactive, { backgroundColor: "lightgreen", width: 330, alignSelf: "center", borderRadius: 10 }
                ]}
                transition="backgroundColor">
                <Text style={styles.headerText}>
                    {this.state.title}
                </Text>
            </Animatable.View>
        );
    };


    renderContent = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={[
                    styles.content,
                    isActive ? styles.active : styles.inactive
                ]}
                transition="backgroundColor">

                <FlatList
                    data={this.state.products}
                    renderItem={({ item }) => (
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    justifyContent: 'space-between',
                                }}>
                                <Pressable onPress={() => handleChange(item.id)} >
                                    <MaterialCommunityIcons
                                        name={item.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={30} color="#000" />
                                </Pressable>
                                <Animatable.Text
                                    animation={isActive ? 'bounceIn' : undefined}
                                    style={{ textAlign: 'center' }}>
                                    {item.megnevezes}
                                </Animatable.Text>
                            </View>
                        </View>
                    )}
                />

            </Animatable.View>
        );
    };


    render() {
        const [activeSections, setActiveSections] = useState([]);
        return (

            <View>
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
                                <Pressable onPress={() => this.handleChange(item.id)} >
                                    <MaterialCommunityIcons
                                        name={item.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={30} color="#000" />
                                </Pressable>
                                <Text style={{ fontSize: 20 }}>{item.megnevezes}</Text>
                            </View>

                        </View>
                    )}
                />
                <Accordion

                    activeSections={activeSections}
                    touchableComponent={TouchableOpacity}
                    renderHeader={this.renderHeader()}
                    renderContent={this.renderContent()}
                    duration={400}
                    onChange={this.setSections()}
                />

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 30,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '300',
        marginBottom: 20,
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,

    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },
    active: {
        width: 320,
        alignSelf: "center",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: 'green',
    },
    inactive: {
        width: 320,
        alignSelf: "center",
        backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
        textAlign: 'center',
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
    },
});