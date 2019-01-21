import React, { Component, createContext } from 'react';
import { initialPattern, pairs, pattern, durations } from '../config';
import _ from 'lodash';

const defaultContext = {
  intersection: {},
  activePairIndex: 0,
  activePatternIndex: 0
};

export const IntersectionContext = createContext(defaultContext);

class IntersectionProvider extends Component {
  state = defaultContext;

  componentDidMount() { 
    this.updateIntersection();
  }

  updateIntersection = (nextPairIndex = 0, nextPatternIndex = 0) => {
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
    const intersection = roads.reduce((acc, road) => ({
      ...acc,
      [road]: _.includes(activePair, road) ? nextPattern : initialPattern
    }), {});

    this.setState({ ...state, intersection }, this.next);
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
      
      this.updateIntersection(nextPairIndex % pairs.length, nextPatternIndex % pattern.length);
    }, durations.patternDuration)
  }

  render() {
    console.log(this.state.intersection)

    return (
      <IntersectionContext.Provider value={this.state}>
        {this.props.children}
      </IntersectionContext.Provider>
    )
  }
}

export default IntersectionProvider;