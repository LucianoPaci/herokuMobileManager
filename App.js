import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import axios from 'axios'
import setAuthToken from './utils/setAuthToken'
export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      errors: null
    }
  }


  componentDidMount() {
    
    setAuthToken('e09d20be-032a-4ce3-99ea-1e3d407b30cd')
    return fetch('https://api.heroku.com/apps', {
      headers: new Headers({
        'Accept': 'application/vnd.heroku+json; version=3',
        'Authorization': 'Bearer e09d20be-032a-4ce3-99ea-1e3d407b30cd' // Mi token
      })
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({
          repos: responseJSON
        }, function() {
          console.log(responseJSON)

        })
      })
      .catch((error) => {
        console.error(error)
      })


  }
  render() {
    return (
      <View style={{flex: 1, paddingTop:20}}>
      <FlatList
        data={this.state.repos}
        renderItem={({item}) => <Text>{item.name}, {item.web_url}</Text>}
        keyExtractor={({id}, index) => id}
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
