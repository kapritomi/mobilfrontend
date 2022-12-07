import * as React from 'react';
import { List } from 'react-native-paper';

const MyComponent = () => {


    return (
        <List.Section title="Accordions">


            <List.Accordion title="Controlled Accordion">
                <List.Item title="First item" />
                <List.Item title="Second item" />
            </List.Accordion>
        </List.Section>
    );
};

export default MyComponent;