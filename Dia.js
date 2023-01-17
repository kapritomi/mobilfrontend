import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
const IP = require('./Ipcim');


class MyComponent extends React.Component {
  state = {

    data: [{ value: 5, label: "Január" }, { value: 80, label: "Február" }, { value: 90, label: "Március" }, { value: 70, label: "Április" }, { value: 70, label: "Május" }, { value: 70, label: "Június" },
    { value: 70, label: "Július" }, { value: 70, label: "Augusztus" }, { value: 70, label: "Szeptember" }, { value: 70, label: "Október" }, { value: 70, label: "November" }, { value: 70, label: "December" }],
  }
  componentDidMount() {
    fetch(IP.ipcim + 'regilistatorles', { method: 'DELETE' })
  }


  render() {
    return (
      <View style={{ paddingTop: 50 }}>
        <BarChart style={{ flex: 1 }} data={this.state.data} barWidth={40} />
        {/* <LineChart data = {this.state.data} />
        <PieChart data = {this.state.data} />*/}

      </View>
    );
  }
}

export default MyComponent;