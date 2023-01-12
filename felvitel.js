import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, StyleSheet, View, Pressable } from 'react-native';
const IP = require('./Ipcim');
import { List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
            products: [],
            tartalom: [],
        };
    }

    componentDidMount() {
        this.getLista();
    }

    async getLista() {
        try {
            const response = await fetch(IP.ipcim + 'listak');
            const json = await response.json();
            this.setState({ data: json });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    getlistakid = (id) => {
        let uj = [];
        let megujabb = [];
        this.state.data.map((item) => {
            if (item.listak_id == id) {
                megujabb = item.listak_tartalom.split(',')
            }
        });
        for (let i = 0; i < megujabb.length; i++) {
            uj.push({ nev: megujabb[i], isChecked: false, id: i })
            this.setState({ tartalom: uj })
        }
    }

    getParsedDate(strDate) {
        var strSplitDate = String(strDate).split(' ');
        var date = new Date(strSplitDate[0]);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;

        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        date = yyyy + "-" + mm + "-" + dd;
        return date.toString();
    }

    render() {
        return (
            <View >
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <List.Section >
                            <List.Accordion title={<View><Text>{item.listak_nev}{'\n'}{this.getParsedDate(item.listak_datum)}</Text ></View>} onPress={() => this.getlistakid(item.listak_id)} style={{ backgroundColor: "lightgreen", width: 350, borderRadius: 10, alignSelf: "center" }}>
                                <FlatList style={{ marginTop: 10 }}
                                    data={this.state.tartalom}
                                    renderItem={({ item }) => (
                                        <View>
                                            <View style={{ marginLeft: 10, flexDirection: 'row', flex: 1 }}>
                                                <Text style={{ fontSize: 20 }} > {item.nev}</Text>

                                            </View>
                                        </View>
                                    )}
                                />
                                <View><Text style={{ fontSize: 20, textAlign: "right", marginRight: 10 }}>{item.listak_ar} Ft</Text></View>
                            </List.Accordion>
                        </List.Section>
                    )}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10
    },
    countContainer: {
        alignItems: "center",
        padding: 10
    }
});
