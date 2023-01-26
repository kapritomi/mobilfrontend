import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
const IP = require('./Ipcim');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      adat: [],
      todoList: [
        { id: '1', text: 'Learn JavaScript' },
        { id: '2', text: 'Learn React' },
        { id: '3', text: 'Learn TypeScript' },
      ]
    };
  }

  rightSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: '#ff8303',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <Text
          style={{
            color: '#1b1a17',
            paddingHorizontal: 10,
            fontWeight: '600',
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          Delete
        </Text>
      </View>
    );
  };

  ListItem = ({ text }) => (
    <Swipeable
      renderRightActions={rightSwipeActions}
    >
      <View
        style={{
          paddingHorizontal: 30,
          paddingVertical: 20,
          backgroundColor: 'white',
        }}
      >
        <Text style={{ fontSize: 24 }} style={{ fontSize: 20 }}>
          {text}
        </Text>
      </View>
    </Swipeable>
  );

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
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <SafeAreaView style={styles.container}>
          <Text style={{ textAlign: 'center', marginVertical: 20 }}>
            Swipe right or left
          </Text>
          <FlatList
            data={this.state.todoList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => this.ListItem(item)}
            ItemSeparatorComponent={() => <Separator />}
          />
        </SafeAreaView>
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