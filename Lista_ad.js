import React, {useEffect} from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, FlatList, Button } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Constants from 'expo-constants';
const IP = require('./Ipcim');

const DATA = [
  {
    id: '1',
    title: 'First Item',
  },
  {
    id: '2',
    title: 'Second Item',
  },
  {
    id: '3',
    title: 'Third Item',
  },
  {
    id: '4',
    title: 'Fourth Item',
  },
  {
    id: '5',
    title: 'Fifth Item',
  },
];





const App = () => {
  const [listData, setListData] = useState(DATA);

  const getMovies = async () => {
    try {
      const response = await fetch(IP.ipcim + 'aktualis');
      const json = await response.json();
      setData(json.DATA);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  let row=  [];
  let prevOpenedRow;

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
            width: 70,
          }}>
          <Button color="red" onPress={onClick} title="DELETE"></Button>
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
            borderColor: 'grey',
            borderWidth: 1,
            padding: 9,
            backgroundColor: 'white',
          }}>
          <Text>{item.title}</Text>
        </View>
      </Swipeable>
    );
  };

  const deleteItem = ({ item, index }) => {
    console.log(item, index);
    let a = listData;
    a.splice(index, 1);
    console.log(a);
    setListData([...a]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        renderItem={(v) =>
          renderItem(v, () => {
            console.log('Pressed', v);
            deleteItem(v);
          })
        }
        keyExtractor={(item) => item.id}></FlatList>
    </View>
  );
};


export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});