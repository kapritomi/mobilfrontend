import * as React from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
const IP = require('./Ipcim');

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ar: 0
    }
  }

  felvitel = () => {
    var adatok = {
      bevitel3: this.state.ar,
      bevitel4: this.props.route.params.aktid
    }

    const response = fetch(IP.ipcim + 'arfel', {
      method: "POST",
      body: JSON.stringify(adatok),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    });
  }

  listatorles = () => {
    var adatok = {
      bevitel5: this.props.route.params.aktid
    }
    try {
      fetch(IP.ipcim + 'listatorles', {
        method: 'DELETE',
        body: JSON.stringify(adatok),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
    }
    catch (e) {
      console.log(e)
    }
    finally {
      this.props.navigation.navigate("Meglévő listák")
    }



  }
  createTwoButtonAlert = () =>
    Alert.alert('Biztosan törlöd?', "", [
      { text: 'mégse', onPress: () => console.log('Cancel Pressed') },
      { text: 'törlés', onPress: () => this.listatorles() },
    ]);


  render() {
    return (
      <View style={{ flexDirection: "row", flex: 1, backgroundColor: "rgb(18,18,18)" }}>
        <View style={{ flex: 1, marginTop: 20 }}>
          <Text style={{ fontSize: 20, color: "grey", marginLeft: 5 }}>Fizetett összeg:</Text>
          <TextInput
            style={{ height: 40, backgroundColor: "rgb(1,194, 154)", marginLeft: 5, width: 150, borderRadius: 10, borderColor: "black", borderWidth: 2 }}
            onChangeText={szoveg => this.setState({ ar: szoveg })}
            keyboardType='numeric'
            value={this.state.ar}
          />
          <TouchableOpacity onPress={this.felvitel()}>
            <View ><Text style={{ fontSize: 20, color: "grey", marginLeft: 5 }}>Mentés</Text></View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, marginTop: 20 }}>
          <Text style={{ fontSize: 20, color: "grey", marginLeft: 5 }}>Lista törlése</Text>

          <TouchableOpacity style={styles.gomb} onPress={() => this.createTwoButtonAlert()}>
            <Text style={{ backgroundColor: "rgb(1,194, 154)", fontSize: 22 }}>Törlés</Text>
          </TouchableOpacity>
        </View>


      </View>
    );
  }
}
const styles = StyleSheet.create({
  gomb: {
    marginTop: 10,
    marginLeft: 1,
    width: 150,
    borderRadius: 20,

  }
});

export default MyComponent;