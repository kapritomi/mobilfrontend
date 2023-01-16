import React, { Component } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
const IP = require('./Ipcim');


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            tartalom_tomb: [],
            zsolt: "",
            adat: [],
            ar: 0
        };
    }

    felvitel = () => {
        var adatok = {
            bevitel3: this.state.zsolt,
            bevitel4: this.state.ar
        }
        const response = fetch(IP.ipcim + 'arfel', {
            method: "POST",
            body: JSON.stringify(adatok),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
    }


    funckio = () => {
        let uj = [];
        this.state.zsolt = this.props.route.params.aktid;
        uj = this.state.zsolt.split(',')
        this.setState({ data: uj })
        this.state.data = uj;


        for (let i = 0; i < this.state.data.length; i++) {
            this.state.tartalom_tomb.push({
                id: i,
                isChecked: false,
                nev: this.state.data[i]
            })
        }
        
    }

    handleChange = (id) => {
        let temp = this.state.tartalom_tomb.map((product) => {
            if (id === product.id) {
                return { ...product, isChecked: !product.isChecked };
            }
            return product;
        });
        this.setState({ tartalom_tomb: temp })
    };

    componentDidMount() {
        this.funckio();
        
    }

    render() {
        return (
            <View style={{ marginLeft: 8, marginTop: 8 }}>
                <FlatList
                    data={this.state.tartalom_tomb}
                    renderItem={({ item }) => (
                        <View >
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Pressable onPress={() => { this.handleChange(item.id); }}>
                                    <MaterialCommunityIcons
                                        name={item.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={30} color="#000" />
                                </Pressable>
                                <Text style={{ fontSize: 20 }}> {item.nev}</Text>
                            </View>
                        </View>
                    )}
                />
                <View>
                    <Text style={{ fontSize: 20 }}>Fizetett összeg:</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: "lightgreen", width: 150, }}
                        onChangeText={szoveg => this.setState({ ar: szoveg })}
                        value={this.state.ar}
                    />
                    <TouchableOpacity onPress={this.felvitel()}>
                        <View ><Text style={{ fontSize: 20 }}>Mentés</Text></View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
