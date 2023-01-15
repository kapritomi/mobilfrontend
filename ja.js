import * as React from 'react';
import { List, Checkbox} from 'react-native-paper';
import {View, Text,FlatList} from 'react-native';


class MyComponent extends React.Component {
  state = {
    adatok:[{id:0,listanev:"februar",listatartalom:"sajt,répa,alma",kinyitott:false},{id:1,listanev:"januar",listatartalom:"alma",kinyitott:false},{id:2,listanev:"marcius",listatartalom:"sajt,répa,alma",kinyitott:false}],
    nev:"sajt"
  }
  componentDidMount()
  { 
    let tartalomSplitelve="";
    
    for (let i = 0; i < this.state.adatok.length; i++) {
     tartalomSplitelve=this.state.adatok[i].listatartalom.split(',')
     this.state.adatok[i].listatartalom=tartalomSplitelve
    }
  
   
  }
  _handlePress = (id) =>{
    let tombmentese=this.state.adatok

    for (let i = 0; i < this.state.adatok.length; i++) {
      if(this.state.adatok[i].id==id)
      {
       tombmentese[i].kinyitott=!tombmentese[i].kinyitott
      }
      else{
        tombmentese[i].kinyitott=false
      }
      this.setState({adatok:tombmentese})
      console.log(JSON.stringify(tombmentese))
    }
  }

  render() {
    return (
     <View style={{paddingTop:50}}>
        {this.state.adatok.map((item,key)=><List.Section key={key}>
           <List.Accordion
             title={item.listanev}
             left={props => <List.Icon {...props} icon="folder" />}
             expanded={item.kinyitott}
             onPress={()=>this._handlePress(item.id)}
           >
            <FlatList
            data={item.listatartalom}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <List.Item title={item}></List.Item>
            )}
          />
           </List.Accordion>
         </List.Section>
 )}
    </View>
    );
  }
}

export default MyComponent;