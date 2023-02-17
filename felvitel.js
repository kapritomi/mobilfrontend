import * as React from 'react';
import { List, Checkbox } from 'react-native-paper';
import { View, Text, FlatList } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { Entypo } from '@expo/vector-icons';
const IP = require('./Ipcim');

class MyComponent extends React.Component {
    state = {
        adatok: [],
        tartalom: [],
        szavak: ["Ár szerint csökkenő", "Ár szerint növekvő", "Legújabb", "Legrégebbi"],
        listaszama: 0
    }

    componentDidMount() {
        this.getLista();
        let tartalomSplitelve = "";
        for (let i = 0; i < this.state.adatok.length; i++) {
            tartalomSplitelve = this.state.adatok[i].listak_tartalom.split(',')
            this.state.adatok[i].listak_tartalom = tartalomSplitelve
            this.state.adatok[i].kinyitott = false
        }
        this.navFocusListener = this.props.navigation.addListener('focus', () => { this.getLista(); })
    }

    componentWillUnmount() {
        this.navFocusListener();
    }

    _handlePress = (id) => {
        let tombmentese = this.state.adatok
        for (let i = 0; i < this.state.adatok.length; i++) {
            if (this.state.adatok[i].listak_id == id) {
                tombmentese[i].kinyitott = !tombmentese[i].kinyitott

            }
            else {
                tombmentese[i].kinyitott = false
            }
            this.setState({ adatok: tombmentese })
            //console.log(JSON.stringify(tombmentese))

        }
        for (let i = 0; i < this.state.adatok.length; i++) {

        }
    }

    async getLista() {
        try {
            const response = await fetch(IP.ipcim + 'listak');
            const json = await response.json();
            this.setState({ adatok: json });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }

    }
    async rendezett(rend) {
        try {
            const response = await fetch(IP.ipcim + rend);
            const json = await response.json();
            this.setState({ adatok: json });
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

    getlistakid = (id) => {
        let uj = [];
        let megujabb = [];
        this.state.adatok.map((item) => {
            if (item.listak_id == id) {
                megujabb = item.listak_tartalom.split(',')
            }
        });
        for (let i = 0; i < megujabb.length; i++) {
            uj.push({ nev: megujabb[i], isChecked: false, id: i })
            this.setState({ tartalom: uj })
        }

    }

    szerkesztes = (id) => {
        alert(id)

    }

    rendezes = (index) => {
        if (index == 0) {
            this.rendezett("listakarszerintcsokk")
        }
        if (index == 1) {
            this.rendezett("listakarszerintnov")
        }
        if (index == 2) {
            this.rendezett("listakdatumszerintcsokk")
        }
        if (index == 3) {
            this.rendezett("listakdatumszerintnov")
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "rgb(18,18,18)" }}>
                <View style={{ marginTop: 5 }}>
                    <SelectDropdown
                        defaultButtonText={<View style={{ flexDirection: 'row' }}><Entypo name="select-arrows" size={20} color={"white"} /><Text style={{ color: "white", fontSize: 20, marginTop: -1 }}>Rendezés</Text></View>}
                        rowStyle={{ backgroundColor: "rgb(50,50,50)", borderRadius: 10, borderBottomColor: "black", borderWidth: 2 }}
                        rowTextStyle={{ color: "white" }}
                        dropdownStyle={{ backgroundColor: 'transparent', width: 200 }}
                        buttonStyle={{ borderRadius: 20, alignContent: "center", alignItems: "center", backgroundColor: "rgb(50,50,50)", width: 140, height: 35, borderColor: "white", borderWidth: 2 }}

                        data={this.state.szavak}
                        onSelect={(selectedItem, index) => {
                            this.setState({ listaszama: index })
                            console.log(selectedItem, index)
                            this.rendezes(index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return <View style={{ flexDirection: 'row' }}><Entypo name="select-arrows" size={22} color={"white"} /><Text style={{ color: "white" }}>Rendezés</Text></View>
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                </View>
                <FlatList
                    data={this.state.adatok}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item }) => (<List.Section  >
                        <List.Accordion
                            title={<View><Text style={{ color: "white" }}>{item.listak_nev}{'\n'}{this.getParsedDate(item.listak_datum)}</Text ></View>}
                            style={{ backgroundColor: "rgb(32,32,32)", }}
                            expanded={item.kinyitott}
                            onPress={() => { this._handlePress(item.listak_id); this.getlistakid(item.listak_id) }}
                            onLongPress={() => this.props.navigation.navigate('Szerkeszt', { aktid: item.listak_id })}>

                            <FlatList
                                data={this.state.tartalom}
                                renderItem={({ item }) => (
                                    <List.Item title={item.nev} titleStyle={{ color: "white" }}></List.Item>
                                )} />
                            <View>
                                <Text style={{ fontSize: 20, textAlign: "right", marginRight: 10, color: "white" }}>{item.listak_ar} Ft</Text>
                            </View>
                        </List.Accordion>
                    </List.Section>
                    )} />
            </View>

        );
    }
}

export default MyComponent;