import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Listaad from './Lista_ad';
import Felvitel from './felvitel';
import Aktualis_lista from './Akt'
import Seged from './Seged'


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
function Aktlista({ navigation }) {
  return (
    <Aktualis_lista navigation={navigation}></Aktualis_lista>
  );
}

function Root({ navigation }) {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Lista bővítés" component={Elso_lap} />
      <Drawer.Screen name="Jelenlegi Listák" component={Aktlista} />
      <Drawer.Screen name="Meglévő listák" component={Listafel} />
    </Drawer.Navigator>

  );
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Seged" component={Seged} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}