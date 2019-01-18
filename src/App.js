import React, { Component } from 'react';
import './App.css';
import image1 from './images/us-ca-dunes.jpg';
import image2 from './images/us-ut-ranch.jpg';
import image3 from './images/ca-ab-bighorn.jpg';
import image4 from './images/ca-qc-loons.jpg';
import ReactJson from 'react-json-view'
import axios from 'axios'

class App extends Component {
  /* ToDo: find other ways of managing assets */

  state = {
    complex: [
      {image: image1, name: 'Sand dunes in Death Valley, CA'},
      {image: image2, name: 'Abandoned homestead near Cannon, Utah'},
      {image: image3, name: 'Rocky Mountain Bighorn Sheep, Alberta'},
      {image: image4, name: 'Common Loons, Lac du Coeur, Québec'}
    ],
    imageIndex: 0,
    weather: {}
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather() {
    /* ToDo : solve CORS problem */
    axios.get("https://www.metaweather.com/api/location/search/?lattlong=36.96,-122.02", {
        headers: { 'Access-Control-Allow-Origin': '*' },
        })
      .then(response => console.log(response))
      /* .then(response => this.setState({weather: response.data})) */
  }

  handleClick = () => {
    this.setState(({ imageIndex }) => ({
      imageIndex: this.imageIndexNext(imageIndex),
    }))
  }

  imageIndexNext = (imageIndex) => {
    if (imageIndex >= this.state.complex.length -1) {
      return 0
    } else {
      return imageIndex + 1
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>React exercise 3</h2>
          <ol className="align-left">
            <li>Images, button, state, & conditional</li>
            <li>css, arrays, complex objects</li>
            <li>API</li>
          </ol>
          <img src={this.state.complex[this.state.imageIndex]['image']} alt="Awesome view"/>
          <p>{this.state.complex[this.state.imageIndex]['name']}</p>
          <p>API results: <ReactJson src={this.state.weather}/></p>
          <br />
          <button onClick={this.handleClick}>Next</button>
        </header>
      </div>
    );
  }
}

export default App;
