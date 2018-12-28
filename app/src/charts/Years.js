import _ from 'lodash';
import React, { Component } from 'react';
import Plot from 'react-plotly.js';

export default class Years extends Component {

    prepareData() {
        return _.chain(this.props.data)
            .map('release_date')
            .groupBy(o => new Date(o).getFullYear())
            .mapValues('length')
            .value();
    }

    render() {
        const data = this.prepareData();
        return <Plot
            data={[
                {
                    y: _.values(data),
                    x: _.keys(data),
                    type: 'scatter'
                }
            ]}
            layout={{ width: 1320, height: 840, title: 'Ilość filmów rocznie:' }}
        />;
    }
}