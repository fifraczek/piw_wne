import React, { Component } from 'react';
import Plot from 'react-plotly.js';

export default class Decades extends Component {
    render() {
        return <Plot
          data={[
            {
              values: [1, 2, 3],
              labels: ['a', 'b', 'c'],
              type: 'pie'
            }
          ]}
          layout={ {width: 1320, height: 840, title: 'Ilość filmów wydanych w dekadach:'} }
        />;
    }
}