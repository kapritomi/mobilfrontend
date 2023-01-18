import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
const IP = require('./Ipcim');

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
        data1: [],
        isLoading: true,
        data: [{ value: 50, label: "January", 
        topLabelComponent: () => (<Text style={{color: 'rgb(32,32,32)', fontSize: 18}}>50</Text>
          ), },
        { value: 80, label: "February" },
        { value: 90, label: "March" },
        { value: 58, label: "April" },
        { value: 70, label: "May" },
        { value: 70, label: "June" },
        { value: 32, label: "July" },
        { value: 55, label: "Augustus" },
        { value: 28, label: "September" },
        { value: 91, label: "October" }, 
        { value: 47, label: "November" }, 
        { value: 70, label: "December" }
      ],
      }
  }
    szar=()=>{
      for (let i = 0; i < array.length; i++) {

        
      }
    }

  async getLista() {
    try {
        const response = await fetch(IP.ipcim + 'honapok');
        const json = await response.json();
        this.setState({ data1: json });
    } catch (error) {
        console.log(error);
    } finally {
        this.setState({ isLoading: false });
    }
    
}

componentDidMount() {
  this.getLista();
  console.log(JSON.stringify(this.state.data1))
}

  render() {
    return (
      <View style={{flex: 1,backgroundColor: "rgb(18,18,18)"}}>
      <View style={{
        margin: 10,
        marginTop: 20,
        paddingLeft: 16,paddingTop: 16,paddingBottom: 16,
        borderRadius: 20,
        backgroundColor: 'rgb(1,194, 154)',
      }}>
        <View style={{paddingLeft: 20,paddingTop: 20,paddingBottom: 20, alignItems: 'center'}}>
        <BarChart style={{ flex: 1 }} 
        data={this.state.data} 
        barBorderRadius={4} 
        initialSpacing={15}
        spacing={40}
        barWidth={22} 
        hideRules= {true}
        frontColor="rgb(32,32,32)" 
        disablePress={true} 
        isAnimated
        yAxisThickness={0}
        xAxisThickness={0}
        
        yAxisTextStyle={{color: 'rgb(1,194, 154)'}}
        xAxisLabelTextStyle={{color: 'rgb(32,32,32)', textAlign: 'center'}}/>
                  
        </View>
        
      </View>
      <FlatList
                    data={this.state.data1}
                    renderItem={({ item }) => (
                       <Text style={{color: "white"}}>{item.value}</Text>
                    )}
                />
      </View>
    );
  }
}

export default MyComponent;