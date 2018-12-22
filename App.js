import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Text, View  } from 'react-native';
import Weather from './components/Weather';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      refreshing: false,
      data: []
    }
  }

  handleRefresh = () => {                         //Pull to refresh
    this.setState ({
    refreshing: true,
    }, () => {
      this.getForecast();
    })
  }

  componentDidMount() {
    this.getForecast();
  }

  getForecast(){                                  //Fetches weather data from api
    const cityID = '4393217';         
    const API_KEY = 'YOUR_KEY_HERE';
    const url = `https://api.openweathermap.org/data/2.5/forecast?id=${cityID}&units=imperial&appid=${API_KEY}`;

    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          refreshing: false,
          data: responseJson.list                 //Loads JSON weather data

        }, function(){

        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={styles.view}>
        <Text style={styles.header}>Kansas City Weather</Text>
        <FlatList
          refreshing={this.state.refreshing}      
          onRefresh={this.handleRefresh}
          data={this.state.data}              
          keyExtractor={item => item.dt.toString()}
          renderItem={({item}) => 
            <Weather info={item}></Weather>       //Passes forecast prop to Weather component
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    color: 'black',
    padding: 20,
    textAlign: 'center',
    fontSize: 30,
    borderWidth: 0,
    fontWeight: 'bold'
  },

  view: {
    flex: 1,
    paddingTop: 20
  }
})
