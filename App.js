import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import 'react-native-gesture-handler';
import Listaad from './Lista_ad';
import Felvitel from './felvitel';
import Aktualis_lista from './Akt';
import Seged from './Seged';
import Szerkeszt from './Szerkeszt'
import Dia from './Dia'
import CustomDrawer from './CustomDrawer';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "rgb(18,18,18)" }}>

    </View>
  );
}

function Elso_lap({ navigation }) {
  return (
    <Listaad navigation={navigation}></Listaad>
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
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawer {...props} />} screenOptions={{ drawerStyle: { backgroundColor: 'rgb(32,32,32)' }, headerStyle: { backgroundColor: "rgb(1,194, 154)" }, headerTintColor: "rgb(18,18,18)", drawerActiveBackgroundColor: "rgb(18,18,18)", drawerActiveTintColor: "white", drawerInactiveTintColor: "white" }}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{ drawerIcon: ({ color }) => (<Ionicons name="home-outline" size={22} color={color} />) }} />
      <Drawer.Screen name="Lista bővítés" component={Elso_lap} options={{ drawerIcon: ({ color }) => (<Ionicons name="create-outline" size={22} color={color} />) }} />
      <Drawer.Screen name="Jelenlegi Listák" component={Aktlista} options={{ drawerIcon: ({ color }) => (<Ionicons name="clipboard-outline" size={22} color={color} />) }} />
      <Drawer.Screen name="Meglévő listák" component={Listafel} options={{ drawerIcon: ({ color }) => (<Ionicons name="file-tray-stacked-outline" size={22} color={color} />) }} />
      <Drawer.Screen name="Diagram" component={Diak} options={{ drawerIcon: ({ color }) => (<Ionicons name="bar-chart" size={22} color={color} />) }} />
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
        <Stack.Screen name="Szerkeszt" component={Szerkeszt} options={{ headerStyle: { backgroundColor: '#01c29a' }, headerTintColor: "rgb(18,18,18)", headerTitle: "Lista módosítása" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}