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

    get globalOptions() {
        return {
            data: this.state.data,
            height: 700,
            width: 1000
        };
    }

    render() {
        return (
            <div className="App">
                <MyNavbar />
                <Router>
                    <div>
                        <Route path="/" exact render={() => <Summary {...this.globalOptions} />} />
                        <Route path="/summary" exact render={() => <Summary {...this.globalOptions} />} />
                        <Route path="/wordcloud" exact render={() => <Wordcloud {...this.globalOptions} />} />
                        <Route path="/decades" exact render={() => <Decades {...this.globalOptions} />} />
                        <Route path="/genres" exact render={() => <Genres {...this.globalOptions} />} />
                        <Route path="/years" exact render={() => <Years {...this.globalOptions} />} />
                        <Route path="/rates" exact render={() => <Rates {...this.globalOptions} />} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
