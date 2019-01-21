import React, { Component, createContext } from 'react';
import { initialPattern, pairs, pattern, durations } from '../config';
import _ from 'lodash';

const defaultContext = {
  signal: {},
  activePairIndex: 0,
  activePatternIndex: 0
};

export const SignalContext = createContext(defaultContext);

class SignalProvider extends Component {
  state = defaultContext;

  componentDidMount() { 
    this.updateSignal();
  }

  updateSignal = (nextPairIndex = 0, nextPatternIndex = 0) => {
    const activePair = pairs[nextPairIndex];
    const nextPattern = pattern[nextPatternIndex];
    const roads = _.flatten(pairs);

    const state = {
      activePairIndex: nextPairIndex,
      activePatternIndex: nextPatternIndex
    };
    
    /**
     * Describes road state, keyed by road name.
     * @example
     *  east: {left: false, straight: true}
     *  north: {left: false, straight: false}
     *  south: {left: false, straight: false}
     *  west: {left: false, straight: true}
     */
    const signal = roads.reduce((acc, road) => ({
      ...acc,
      [road]: _.includes(activePair, road) ? nextPattern : initialPattern
    }), {});

    this.setState({ ...state, signal }, this.next);
  }

  /**
   * Increments activePairIndex and activePatternIndex
   */
  next = () => {
    setTimeout(() => {
      const { activePairIndex, activePatternIndex } = this.state;
      const nextPatternIndex = activePatternIndex + 1;
      let nextPairIndex = activePairIndex;
      
      if (nextPatternIndex >= pattern.length) {
        nextPairIndex = activePairIndex + 1;
      }
      
      this.updateSignal(nextPairIndex % pairs.length, nextPatternIndex % pattern.length);
    }, durations.patternDuration)
  }

  /**
   * Reshapes data from Queue Context
   * This probably should not be in this component
   */
  getValues = () => {
    const { roadQueue } = this.props;
    const { signal } = this.state;
    const mergedData = {};
    
    _.forEach(signal, (value, key) => {
      mergedData[key] = { ...value, lanes: roadQueue[key] }
    });

    return mergedData;
  }

  render() {
    return (
      <SignalContext.Provider value={this.getValues()}>
        {this.props.children}
      </SignalContext.Provider>
    )
  }
}

export default SignalProvider;