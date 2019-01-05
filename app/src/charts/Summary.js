import _ from 'lodash';
import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import chroma from 'chroma-js';
import { renderToString } from 'react-dom/server'

const buildMovieDataObject = (movie) => {
    return {
        title: movie.title,
        rate_avg: movie.rating_avg,
        revenue: movie.revenue,
        year: new Date(movie.release_date).getFullYear(),
        rate_count: movie.rating_count
    };
};

const buildDataSeriesObject = (movie) => {
    return { name: movie.title, data: [[movie.year, movie.revenue, movie.rate_count]] };
}

const MOVIES_COUNT = 20;

export default class Summary extends Component {

    onYearChange(year) {
        this.setState({ year });
    }

    tooltipRenderer = (fullData) => {
        const data = fullData.w.config.series[fullData.seriesIndex];
        const rateAvg = _.find(this.props.data, {title: data.name}).rating_avg;
        const x = <div style={{padding: '5px'}}>
            <b>{data.name}</b> ({data.data[0][0]})<br />
            Wpływy: {data.data[0][1]} USD<br />
            Średnia ocena: {_.ceil(rateAvg, 2)}<br />
            Liczba ocen: {data.data[0][2]}
        </div>;
        return renderToString(x);
    };

    prepareSeries() {
        return _.chain(this.props.data)
            .map(buildMovieDataObject)
            .sortBy(['rate_count', 'revenue'])
            .filter(o => (o.rate_count < 1000 && o.revenue > 0))
            .takeRight(MOVIES_COUNT)
            .sortBy('rate_avg')
            .map(buildDataSeriesObject)
            .value();
    }

    render() {
        const options = {
            dataLabels: {
                enabled: false
            },
            colors: chroma.scale(['red', 'yellow', 'green']).colors(MOVIES_COUNT),
            tooltip: {
                custom: this.tooltipRenderer.bind(this)
            },
            legend: {
                show: false
            },
            fill: {
                opacity: 0.8,
                gradient: {
                    enabled: false
                }
            },
            title: {
                text: 'Najczęściej oceniane filmy - TOP ' + MOVIES_COUNT
            },
            xaxis: {
                tickAmount: 12,
                type: 'category',
            }
        };

        return <div style={{ margin: '0 auto', width: this.props.width + 'px' }}>
            <Chart
                series={this.prepareSeries()}
                options={options}
                type='bubble'
                width={this.props.width}
                height={this.props.height} />
        </div>;
    }
}
