import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, Image, TouchableOpacity, StyleSheet, View } from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true
        };
    }

    async getLista() {
        try {
            const response = await fetch('http://192.168.6.20:3000/listak');
            const json = await response.json();
            this.setState({ data: json });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }
    }


    componentDidMount() {
        this.getLista();
    }

    render() {
        const { data, isLoading } = this.state;

        return (
            <View >

                <FlatList
                    data={data}
                    keyExtractor={({ film_id }, index) => film_id}
                    renderItem={({ item }) => (
                        <View style={{ backgroundColor: "lightgreen", margin: 10, borderRadius: 10, padding: 5 }}>
                            <Text style={{ fontSize: 20 }}>{item.listak_nev} {item.listak_datum}
                            </Text>

                        </View>
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
    button: {
        alignSelf: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "blue",
        width: 180
    },
    countContainer: {
        alignItems: "center",
        padding: 10
    }
});
