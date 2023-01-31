import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Button } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const IP = require('./Ipcim');


const App = () => {
  const [listData, setListData] = useState(data);
  const [data, setData] = useState([]);

  const getMovies = () => {
    fetch(IP.ipcim + 'listak')
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson)
      })
  };

  useEffect(() => {
    getMovies();
    console.log(data)
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


  const renderItem = ({ item, index }, onClick) => {
    //
    const closeRow = (index) => {
      console.log('closerow');
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
            height: 52,
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
        <View
          style={{
            margin: 4,
            backgroundColor: "rgb(32,32,32)",
            borderWidth: 1,
            padding: 9,

          }}>
          <Text style={{ color: "white", fontSize: 20 }}>{item.listak_nev}{"\n"}{getParsedDate(item.listak_datum)}</Text>
        </View>
      </Swipeable>
    );
  };

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
      console.log(e)
    }
    finally {

      console.log("siker")
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={(v) =>
          renderItem(v, () => {
            console.log('Pressed', v.item.listak_id);
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