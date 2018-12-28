import React, { Component } from 'react';
import WordCloud from 'react-d3-cloud';
import _ from 'lodash';
import {stringToJson} from '../utils/stringUtils';

const WORD_COUNT_KEY = 'value';
const WORD_KEY = 'text';
const WORD_CLOUD_LIMIT = 100;

const fontSizeMapper = word => Math.log2(word.value) * 5;
const rotate = word => word.value % 360;

class Wordcloud extends Component {
    
    prepareData() {
        return _.chain(this.props.data)
            .map('keywords')
            .map(stringToJson)
            .map(array => _.map(array, 'name'))
            .flatten()
            .groupBy(o => o)
            .mapValues('length')
            .map((v,k) => {return {[WORD_KEY]: k, [WORD_COUNT_KEY]: v};})
            .sortBy(WORD_COUNT_KEY)
            .takeRight(WORD_CLOUD_LIMIT)
            .value();
    }

    render() {
        return <WordCloud
          data={this.prepareData()}
          fontSizeMapper={fontSizeMapper}
          rotate={rotate}
        />;
    }
}

export default Wordcloud;
