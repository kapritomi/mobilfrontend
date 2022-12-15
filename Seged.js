import React, { Component } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            tartalom_tomb: [],
            zsolt: ""
        };
    }

    funckio = () => {
        let uj = [];
        this.state.zsolt = this.props.route.params.aktid;
        uj = this.state.zsolt.split(',')
        console.log(uj)
        this.setState({ data: uj })
        console.log(this.state.data)

        /* for (let i = 0; i < this.state.data.length; i++) {
             tartalom_tomb.Push({
                 id: i,
                 isChecked: false,
                 nev: data[i]
             })
         }*/
    }

    /* handleChange = (id) => {
         let temp = this.state.data.map((product) => {
             if (id === product.id) {
                 return { ...product, isChecked: !product.isChecked };
             }
             return product;
         });
         this.setState({ products: temp })
     };*/

    componentDidMount() {
        this.funckio();
        console.log(this.state.data)
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <View>
                            {/*<Pressable onPress={() => this.handleChange(item.id)}>
                                <MaterialCommunityIcons
                                    name={item.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={30} color="#000" />
                            </Pressable>*/}
                            <Text style={{ color: "black", fontSize: 20 }}>{item}</Text>
                        </View>
                    )}
                />

            </View>
        );
    }
}
