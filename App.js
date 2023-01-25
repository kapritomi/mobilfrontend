import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Listaad from './Lista_ad';
import Felvitel from './felvitel';
import Aktualis_lista from './Akt';
import Seged from './Seged';
import Szerkeszt from './Szerkeszt'
import Dia from './Dia'



function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "rgb(18,18,18)" }}>

    </View>
  );
}

function Elso_lap({ navigation }) {
  return (
    <Listaad></Listaad>
  );
}


function Diak({ navigation }) {
  return (
    <Dia navigation={navigation}></Dia>
  );
}

function Listafel({ navigation }) {
  return (
    <Felvitel navigation={navigation}></Felvitel>
  );
}
function Aktlista({ navigation }) {
  return (
    <Aktualis_lista navigation={navigation}></Aktualis_lista>
  );
}

function Root({ navigation }) {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{ drawerStyle: { backgroundColor: 'rgb(32,32,32)' }, headerStyle: { backgroundColor: "rgb(1,194, 154)" }, headerTintColor: "rgb(18,18,18)", drawerActiveBackgroundColor: "rgb(18,18,18)", drawerActiveTintColor: "white", drawerInactiveTintColor: "white" }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Lista bővítés" component={Elso_lap} />
      <Drawer.Screen name="Jelenlegi Listák" component={Aktlista} />
      <Drawer.Screen name="Meglévő listák" component={Listafel} />
      <Drawer.Screen name="Diagram" component={Diak} />
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
        <Stack.Screen name="Seged" component={Seged} options={{ headerStyle: { backgroundColor: '#01c29a' }, headerTintColor: "rgb(18,18,18)", headerTitle: "" }} />
        <Stack.Screen name="Szerkeszt" component={Szerkeszt} options={{headerStyle: { backgroundColor: '#01c29a' }, headerTintColor: "rgb(18,18,18)", headerTitle: "Lista módosítása"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}