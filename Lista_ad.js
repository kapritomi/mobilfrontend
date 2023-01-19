import React, { Component } from 'react';
import { Button, StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput, Pressable, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class Listaad extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "rgb(18,18,18)" }}>
      </View>
    );
  }
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  liladoboz: {
    borderColor: "purple",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5
  },
  gomb:
  {
    textAlign: "center",
    alignSelf: "center",
    width: 300,
    backgroundColor: "lightblue",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,

  },
  button: {
    margin: 5
  },
  child: { width: width, alignSelf: "center", alignItems: "center", alignContent: "center" },
  text: { textAlign: "center", fontSize: 18 },
  listaneve: {
    height: 40,
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    width: 300,

  }


});