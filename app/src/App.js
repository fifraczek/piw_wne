import React, { Component } from 'react';
import './App.css';
import MyNavbar from './navbar/MyNavbar';
import Wordcloud from './charts/Wordcloud';

class App extends Component {

  constructor(props) {
    super(props);
    fetch('https://raw.githubusercontent.com/fifraczek/piw_wne/master/data/data.json')
    .then(response => response.json())
    .then(data => this.setState({data: data, loaded: true}));
    this.state = {
      loaded: false,
      data: {}
    };

  }

  render() {
    return (      
      <div className="App">
      <MyNavbar/>
      {this.state.loaded ? <Wordcloud data={this.state.data} /> : ''}
      </div>
    );
  }
}

export default App;
