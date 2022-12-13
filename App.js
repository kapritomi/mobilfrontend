import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Listaad from './Lista_ad';
import Felvitel from './felvitel';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

    </View>
  );
}

function Elso_lap({ navigation }) {
  return (
    <Listaad></Listaad>
  );
}

function Listafel({ navigation }) {
  return (
    <Felvitel></Felvitel>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Lista bővítés" component={Elso_lap} />
        <Drawer.Screen name="Meglévő listák" component={Listafel} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}