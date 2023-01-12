import React, { Component } from 'react';
import { Button, StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
const IP = require('./Ipcim');

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
            adat: []
        };
    }

    componentDidMount() {
        this.getLista();
    }

    async getLista() {
        try {
            const response = await fetch(IP.ipcim + 'aktualis');
            const json = await response.json();
            this.setState({ data: json });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
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
                        <TouchableOpacity style={{ backgroundColor: "lightgreen", width: 350, height: 60, borderRadius: 10, alignSelf: "center", justifyContent: 'center', marginTop: 10 }}
                            onPress={() => this.props.navigation.navigate('Seged', { aktid: item.listak_tartalom })} ><Text style={{ marginLeft: 3, fontSize: 20 }}>{item.listak_nev}{"\n"} {this.getParsedDate(item.listak_datum)}</Text></TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }

});