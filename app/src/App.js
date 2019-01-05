import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import MyNavbar from './navbar/MyNavbar';
import Wordcloud from './charts/Wordcloud';
import Decades from './charts/Decades';
import Genres from './charts/Genres';
import Years from './charts/Years';
import Rates from './charts/Rates';
import Summary from './charts/Summary';

class App extends Component {

    constructor(props) {
        super(props);
        fetch('https://raw.githubusercontent.com/fifraczek/piw_wne/master/data/data.json')
            .then(response => response.json())
            .then(data => this.setState({ data: data, loaded: true }));
        this.state = {
            loaded: false,
            data: {}
        };
    }

    render() {
        return (
            <div className="App">
                <MyNavbar />
                <Router>
                    <div>
                        <Route path="/" exact render={() => <Summary data={this.state.data} />} />
                        <Route path="/summary" exact render={() => <Summary data={this.state.data} />} />
                        <Route path="/wordcloud" exact render={() => <Wordcloud data={this.state.data} />} />
                        <Route path="/decades" exact render={() => <Decades data={this.state.data} />} />
                        <Route path="/genres" exact render={() => <Genres data={this.state.data} />} />
                        <Route path="/years" exact render={() => <Years data={this.state.data} />} />
                        <Route path="/rates" exact render={() => <Rates data={this.state.data} />} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
