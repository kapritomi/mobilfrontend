import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Lista_kiir from './Lista_checkbox'
import Listaad from './Lista_ad';
import Felvitel from './felvitel.js';
import Listmutat from './Lista_megjelenit';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

    </View>
  );
}
function Lista_mutato({ navigation }) {
  return (
    <Listmutat></Listmutat>
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
        <Drawer.Screen name="Meglévő listák" component={Masodik_lap} />
        <Drawer.Screen name="Meglévő listákg" component={Listafel} />
        <Drawer.Screen name="Meglévő listákga" component={Lista_mutato} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}