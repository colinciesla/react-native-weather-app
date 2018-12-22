import React, {Component} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';


export default class Weather extends Component {

	render() {
		var date = new Date(this.props.info.dt*1000);		//Convert UTC data
		var day;

		switch (date.getDay()) {							//Gets day from date data
			case 0:
			  day = "Sunday";
			  break;
			case 1:
			  day = "Monday";
			  break;
			case 2:
			   day = "Tuesday";
			  break;
			case 3:
			  day = "Wednesday";
			  break;
			case 4:
			  day = "Thursday";
			  break;
			case 5:
			  day = "Friday";
			  break;
			case 6:
			  day = "Saturday";
		  }

		var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();	//Converts hours to AM-PM format
		var am_pm = date.getHours() >= 12 ? "PM" : "AM";

		hours = hours == 0 ? 12 : hours;
		
		var time = hours + ":00" + " " + am_pm;

		return (											//Renders forecast cards, printing day and time, temperature (in F) and relevant weather icon, and weather description
			<Card containerStyle={styles.card}>             
				<View>												
					<Text style={styles.dayAndTime}>{day}</Text>
					<Text style={styles.dayAndTime}>{time}</Text>		
				</View>

				<Divider style={styles.line}/>

				<View style={styles.view}>							
                    <Text style={styles.temp}>{Math.ceil( this.props.info.main.temp) }&#8457;</Text>
					<Image style={{width:100, height:100}} source={{uri:"https://openweathermap.org/img/w/" + this.props.info.weather[0].icon + ".png"}} />
				</View>

				<Divider style={styles.line} />
				
				<View>
					<Text style={styles.details}>{this.props.info.weather[0].description.toUpperCase()}</Text>
				</View>
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	card:{
		backgroundColor:'#ff3b00',
		borderWidth:0
	},

	dayAndTime: {
		fontSize: 32,
		textAlign: 'center',
		color:'#fff'
	},

	temp: {
		fontSize:38,
		color:'#fff'
	},

	details: {
		fontSize: 18,
		color:'#fff',
		textAlign: 'center'
	},
	
	view: {
		flexDirection: 'row',
		justifyContent:'space-between',
		alignItems: 'center'
	},

	line: {
		backgroundColor: '#FFF',
		marginTop: 10,
		marginBottom: 10
	}
});
