import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';

const CONTENT = [
    {
        title: 'Terms and Conditions',
        content: ""
    }
];
const fos = [
    { id: 1, txt: 'React Native', isChecked: false },
    { id: 2, txt: 'Javascript', isChecked: false },
    { id: 3, txt: 'Laravel', isChecked: false },
    { id: 4, txt: 'PHP', isChecked: false },
    { id: 5, txt: 'jQuery', isChecked: false },
    { id: 6, txt: 'Boostrap', isChecked: false },
    { id: 7, txt: 'HTML', isChecked: false },
];


const App = () => {

    const [activeSections, setActiveSections] = useState([]);
    const [multipleSelect, setMultipleSelect] = useState(false);


    const setSections = (sections) => {
        setActiveSections(
            sections.includes(undefined) ? [] : sections
        );
    };

    const renderHeader = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={[
                    styles.header,
                    isActive ? styles.active : styles.inactive
                ]}
                transition="backgroundColor">
                <Text style={styles.headerText}>
                    {section.title}
                </Text>
            </Animatable.View>
        );
    };
    const [products, setProducts] = React.useState(fos);
    const handleChange = (id) => {

        let temp = products.map((product) => {
            if (id === product.id) {
                return { ...product, isChecked: !product.isChecked };
            }
            return product;
        });
        setProducts(temp);

        alert(JSON.stringify(fos));
    };

    const renderContent = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={[
                    styles.content,
                    isActive ? styles.active : styles.inactive
                ]}
                transition="backgroundColor">

                <FlatList
                    data={fos}
                    renderItem={({ item }) => (
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    justifyContent: 'space-between',
                                }}>
                                <TouchableOpacity onPress={() => handleChange(item.id)} >
                                    {item.isChecked ? <Text>Fos</Text> : <Text>Szar</Text>}
                                </TouchableOpacity>
                                <Animatable.Text
                                    animation={isActive ? 'bounceIn' : undefined}
                                    style={{ textAlign: 'center' }}>
                                    {item.txt}
                                </Animatable.Text>
                            </View>
                        </View>
                    )}
                />

            </Animatable.View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/*<ScrollView>*/}
                <Accordion
                    activeSections={activeSections}
                    sections={CONTENT}
                    touchableComponent={TouchableOpacity}
                    expandMultiple={multipleSelect}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    duration={400}
                    onChange={setSections}
                />
                {/*</ScrollView>*/}
            </View>
        </SafeAreaView>

    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 30,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '300',
        marginBottom: 20,
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
        textAlign: 'center',
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
    },
});