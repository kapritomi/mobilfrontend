import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Button } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import { Entypo } from '@expo/vector-icons';
import { List, Checkbox } from 'react-native-paper';

const IP = require('./Ipcim');


const App = () => {
    
    const szavak = ["Ár szerint csökkenő", "Ár szerint növekvő", "Legújabb", "Legrégebbi"];
    const [listaszam, setListaszam] = useState(0);
    const [adatok, setAdatok] = useState("");
    const [tartalom, setTartalom] = useState([]);
    

    const getListak = () => {
        fetch(IP.ipcim + 'listak')
            .then((response) => response.json())
            .then((responseJson) => {
                setAdatok(responseJson)
            })
    };
    useEffect(() => {
        getListak();
        let tartalomSplitelve = "";
        for (let i = 0; i < adatok.length; i++) {
            tartalomSplitelve = adatok[i].listak_tartalom.split(',')
            adatok[i].listak_tartalom = tartalomSplitelve
            adatok[i].kinyitott = false
        }
    }, []);

    let row = [];
    let prevOpenedRow;

    const getParsedDate = (strDate) => {
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

   const _handlePress = (id) => {
        let tombmentese = adatok
        for (let i = 0; i < adatok.length; i++) {
            if (adatok[i].listak_id == id) {
                tombmentese[i].kinyitott = !tombmentese[i].kinyitott

            }
            else {
                tombmentese[i].kinyitott = false
            }
            setAdatok(tombmentese) 
            //console.log(JSON.stringify(tombmentese))

        }
        
    }

    const getlistakid = (id) => {
        let uj = [];
        let megujabb = [];
        adatok.map((item) => {
            if (item.listak_id == id) {
                megujabb = item.listak_tartalom.split(',')
            }
        });
        for (let i = 0; i < megujabb.length; i++) {
            uj.push({ nev: megujabb[i], isChecked: false, id: i })
           setTartalom(uj)
        }

    }

    const rendezett = (rend) => {
        fetch(IP.ipcim + rend)
          .then((response) => response.json())
          .then((responseJson) => {
            setAdatok(responseJson)
          })
      };

    const renderItem = ({ item, index }, onClick) => {
        //
        const closeRow = (index) => {
            //console.log('closerow');
            if (prevOpenedRow && prevOpenedRow !== row[index]) {
                prevOpenedRow.close();
            }
            prevOpenedRow = row[index];
        };

        const renderRightActions = (progress, dragX, onClick) => {
            return (
                <View
                    style={{
                        margin: 0,
                        alignContent: 'center',
                        justifyContent: 'center',
                        backgroundColor: "red",
                        borderRadius: 10,
                        marginTop: 5,
                        height: 69,
                        width: 70,
                    }}>
                    <TouchableOpacity onPress={onClick} ><Text style={{ color: "white", fontSize: 18, textAlign: "center" }}><Ionicons name="trash-outline" size={22} color="white" /></Text>

                    </TouchableOpacity>
                </View>
            );
        };

        return (
           
                <Swipeable
                    renderRightActions={(progress, dragX) =>
                        renderRightActions(progress, dragX, onClick)
                    }
                    onSwipeableOpen={() => closeRow(index)}
                    ref={(ref) => (row[index] = ref)}
                    rightOpenValue={-100}>
                     <List.Section  >
                        <List.Accordion
                            title={<View><Text style={{ color: "white" }}>{item.listak_nev}{'\n'}{getParsedDate(item.listak_datum)}</Text ></View>}
                            style={{ backgroundColor: "rgb(32,32,32)", }}
                            expanded={item.kinyitott}
                            onPress={() => { _handlePress(item.listak_id); getlistakid(item.listak_id) }}>
                                <FlatList
                                data={tartalom}
                                renderItem={({ item }) => (
                                    <List.Item title={item.nev} titleStyle={{ color: "white" }}></List.Item>
                                )} />
                            <View>
                                <Text style={{ fontSize: 20, textAlign: "right", marginRight: 10, color: "white" }}>{item.listak_ar} Ft</Text>
                            </View>
                        </List.Accordion>
                    </List.Section>
                </Swipeable>
                
            
        );
    };

    const removeItem = (id) => {
        setAdatok((current) =>
            current.filter((data) => data.listak_id != id))
    }

    const deleteItem = (id) => {
        var adatok = {
            bevitel5: id
        }
        try {
            fetch(IP.ipcim + 'listatorles', {
                method: 'DELETE',
                body: JSON.stringify(adatok),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
        }
        catch (e) {
            
        }
        finally {
            removeItem(id)

        }
    };

    const rendezes = (index) => {
        if (index == 0) {
            rendezett("listakarszerintcsokk")
        }
        if (index == 1) {
            rendezett("listakarszerintnov")
        }
        if (index == 2) {
            rendezett("listakdatumszerintcsokk")
        }
        if (index == 3) {
            rendezett("listakdatumszerintnov")
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 5 }}>
                <SelectDropdown
                    defaultButtonText={<View style={{ flexDirection: 'row' }}><Entypo name="select-arrows" size={20} color={"white"} /><Text style={{ color: "white", fontSize: 20, marginTop: -1 }}>Rendezés</Text></View>}
                    rowStyle={{ backgroundColor: "rgb(50,50,50)", borderRadius: 10, borderBottomColor: "black", borderWidth: 2 }}
                    rowTextStyle={{ color: "white" }}
                    dropdownStyle={{ backgroundColor: 'transparent', width: 200 }}
                    buttonStyle={{ borderRadius: 20, alignContent: "center", alignItems: "center", backgroundColor: "rgb(50,50,50)", width: 140, height: 35, borderColor: "white", borderWidth: 2 }}

                    data={szavak}
                    onSelect={(selectedItem, index) => {
                        setListaszam( index) 
                        console.log(selectedItem, index)
                        rendezes(index)
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
                data={adatok}
                renderItem={(v) =>
                    renderItem(v, () => {
                        deleteItem(v.item.listak_id);
                    })
                }
                keyExtractor={(item) => item.listak_id}></FlatList>
        </View>
    );
};


export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',


    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});