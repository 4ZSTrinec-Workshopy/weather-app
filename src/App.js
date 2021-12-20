import React, { useState, useEffect, Component } from 'react';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: '',
			image: ''
		}
	}

	componentDidMount() {
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=New%20York&units=metric&APPID=822fc8446f5adc72ac8c766a871329a8`)
			.then(res => res.json())
			.then(result => {
				if (result.cod !== "404") {
					this.setState({ weather: result });
					this.setState({ image: "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png" });
				}
			})size
	}

	handleWeatherChange = (e) => {
		if (e.key === "Enter") {
			if (this.state.query === '') return;

			fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.query}&units=metric&APPID=822fc8446f5adc72ac8c766a871329a8`)
				.then(res => res.json())
				.then(result => {
					if (result.cod !== "404") {
						this.setState({ weather: result });
						this.setState({ image: "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png" });
						this.setState({ query: '' });
					}
				})
		}
	}

	render() {
		if (!this.state.weather) return <p>"Loading..."</p>

		return (
			<div className="App">
				<img class="bg" src="https://images8.alphacoders.com/679/thumb-1920-679478.jpg" />
				<input className="locationInput" type="text" placeholder="Location..." onChange={e => this.setState({ query: e.target.value })} value={this.state.query} onKeyPress={this.handleWeatherChange} />
				<div className="container2">
					<div className="location">{this.state.weather.name}, {this.state.weather.sys.country}</div>
					<div className="time"><img src={this.state.image} />{this.state.weather.weather[0].main}</div>
				</div>
				<div className="container">
					<h1 className="degrees">{Math.round(this.state.weather.main.temp)}°C</h1>
				</div>
			</div>
		);
	}
}

export default App;
