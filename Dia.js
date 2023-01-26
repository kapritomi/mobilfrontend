import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
const IP = require('./Ipcim');

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      erkezo: [],
      isLoading: true,
      data: [
        { value: null, label: "January" },
        { value: null, label: "February" },
        { value: null, label: "March" },
        { value: null, label: "April" },
        { value: null, label: "May" },
        { value: null, label: "June" },
        { value: null, label: "July" },
        { value: null, label: "Augustus" },
        { value: null, label: "September" },
        { value: null, label: "October" },
        { value: null, label: "November" },
        { value: null, label: "December" }
      ]
    }
  }

  componentDidMount() {
    this.getLista();
    this.szar();
    this.navFocusListener = this.props.navigation.addListener('focus', () => { this.getLista(), this.szar() })
  }

  componentWillUnmount() {
    this.navFocusListener();
  }

  szar = () => {
    let seged = this.state.data;

    for (let i = 0; i < this.state.data.length; i++) {
      for (let j = 0; j < this.state.erkezo.length; j++) {
        if (this.state.data[i].label == this.state.erkezo[j].honap) {
          //data[i].value = erkezo[j].ar
          seged[i].value = this.state.erkezo[j].ar

          console.log(JSON.stringify(this.state.data))
          this.setState({ data: seged })
          break
        }
      }
    }
  }
  async getLista() {
    try {
      const response = await fetch(IP.ipcim + 'honapok');
      const json = await response.json();
      this.setState({ erkezo: json });

      this.szar();
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }



  // ár és alá sortöréssel hónap neve megjelenítve az oszlopok alatt

  //ha valaki feltölti az árat 0ként akkor az érték nem null lesz és nem jelenik meg az ár
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "rgb(18,18,18)" }}>
        <View style={{
          margin: 10, marginTop: 20, paddingLeft: 16, paddingTop: 16, paddingBottom: 16, borderRadius: 20, backgroundColor: 'rgb(1,194, 154)'
        }}>
          <View style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 20, alignItems: 'center' }}>
            <BarChart style={{ flex: 1 }}
              data={this.state.data}
              barBorderRadius={4}
              initialSpacing={15}
              spacing={50}
              barWidth={22}
              hideRules={true}
              frontColor="rgb(32,32,32)"
              isAnimated
              yAxisThickness={0}
              xAxisThickness={0}
              xAxisLabelTextStyle={{ color: 'rgb(32,32,32)', textAlign: 'center' }}
              renderTooltip={(item, index) => {
                return (
                  <View
                    style={{
                      marginBottom: 10,
                      marginLeft: -6,
                      backgroundColor: 'black',
                      paddingHorizontal: 6,
                      paddingVertical: 4,
                      borderRadius: 4,
                    }}>
                    <Text style={{ color: "white" }}>{item.value}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>

      </View>
    );
  }
}

export default MyComponent;