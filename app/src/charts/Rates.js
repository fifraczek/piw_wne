import _ from 'lodash';
import React, { Component } from 'react';
import Plot from 'react-plotly.js';

const RUNTIME = 'runtime';
const BUDGET = 'budget';
const REVENUE = 'revenue';

const SCATTER = 'scatter';
const HISTOGRAM = 'histogram2dcontour';

const buildMovieDataObject = (movie) => {
    return {
        rate: movie.rating_avg,
        runtime: movie.runtime,
        budget: movie.budget,
        revenue: movie.revenue
    };
}

export default class Rates extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: RUNTIME,
            chartType: SCATTER
        }
        this.onModeChange = this.onModeChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
    }

    onModeChange(event) {
        this.setState({
            mode: event.target.value
        });
    }

    onTypeChange(event) {
        this.setState({
            chartType: event.target.value
        });
    }

    prepareData() {
        return _.chain(this.props.data)
            .map(buildMovieDataObject)
            .value();
    }

    renderSelect() {
        return <div>
            Ocena w zależności od:&nbsp;
            <select value={this.state.mode} onChange={this.onModeChange}>
                <option value={RUNTIME}>czasu</option>
                <option value={BUDGET}>budżetu</option>
                <option value={REVENUE}>zysku</option>
            </select>
            &nbsp;jako:&nbsp;
            <select value={this.state.chartType} onChange={this.onTypeChange}>
                <option value={SCATTER}>wykres punktowy</option>
                <option value={HISTOGRAM}>histogram konturowy</option>
            </select>
        </div>;
    }


    render() {
        const data = this.prepareData();
        return <div>
            {this.renderSelect()}
            <Plot
                data={[
                    {
                        x: _.chain(data).map(this.state.mode).filter(o => o > 0).value(),
                        y: _.chain(data).map('rate').value(),
                        mode: 'markers',
                        type: this.state.chartType,
                        marker: { size: 12 }
                    }
                ]}
                layout={{ width: 1320, height: 840 }}
            />
        </div>;
    }
}