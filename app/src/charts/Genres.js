import _ from 'lodash';
import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import { stringToJson } from '../utils/stringUtils';

export default class Genres extends Component {

    prepareData() {
        return _.chain(this.props.data)
            .map('genres')
            .map(stringToJson)
            .flatten()
            .map('name')
            .filter(o => !_.isNil(o))
            .groupBy(o => o)
            .mapValues('length')
            .value()
    }

    render() {
        const data = this.prepareData();
        return <Plot
            data={[
                {
                    values: _.values(data),
                    labels: _.keys(data),
                    type: 'pie'
                }
            ]}
            layout={{ width: 1320, height: 840, title: 'Ilość filmów poszczególnych gatunków:' }}
        />;
    }
}