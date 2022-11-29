import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Lista_kiir from './Lista_checkbox'
import Listaad from './Lista_ad';

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

function Masodik_lap({ navigation }) {
  return (
    <Lista_kiir></Lista_kiir>
  );
}


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Lista létrehozása" component={Elso_lap} />
        <Drawer.Screen name="Meglévő listák" component={Masodik_lap} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}