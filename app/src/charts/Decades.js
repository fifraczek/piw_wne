import _ from 'lodash';
import React, { Component } from 'react';
import Plot from 'react-plotly.js';

export default class Decades extends Component {

    prepareData() {
        return _.chain(this.props.data)
            .map('release_date')
            .map(o => _.round(new Date(o).getFullYear(), -1))
            .groupBy(o => o)
            .mapValues('length')
            .value();
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
          layout={ {width: 1320, height: 840, title: 'Ilość filmów wydanych w dekadach:'} }
        />;
    }
}