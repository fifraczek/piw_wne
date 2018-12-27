import React, { Component } from 'react';
import WordCloud from 'react-d3-cloud';
import _ from 'lodash';

const mapToJsonString = text => {
    try {
        return JSON.parse(
            text.replace(/'id'/g, '"id"')
            .split(/'name'/g).join('"name"')
            .split(/ '/g).join(' "')
            .split(/ \\"/g).join(' "')
            .split(/'}/g).join('"}')
            .split(/\\"}/g).join('"}'));
    } catch {
        return {};
    }
}

const WORD_COUNT_KEY = 'value';
const WORD_KEY = 'text';
const WORD_CLOUD_LIMIT = 100;

const fontSizeMapper = word => Math.log2(word.value) * 5;
const rotate = word => word.value % 360;

class Wordcloud extends Component {
    
    constructor(props) {
        super(props);
        this.state = this.prepareState(props);
    }

    prepareState(props) {
        return {data: _.chain(props.data)
            .map('keywords')
            .map(mapToJsonString)
            .map(array => _.map(array, 'name'))
            .flatten()
            .groupBy(o => o)
            .mapValues('length')
            .map((v,k) => {return {[WORD_KEY]: k, [WORD_COUNT_KEY]: v};})
            .sortBy(WORD_COUNT_KEY)
            .takeRight(WORD_CLOUD_LIMIT)
            .value()};
    }

    render() {
        console.log(this.state.data);
        return <WordCloud
          data={this.state.data}
          fontSizeMapper={fontSizeMapper}
          rotate={rotate}
        />;
    }
}

export default Wordcloud;
