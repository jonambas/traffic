import React, { Component, createContext } from 'react';
import { pairs, durations, maxLanes } from '../config';
import _ from 'lodash';

const defaultContext = {
  roads: _.flatten(pairs).reduce((acc, road) => ({
    ...acc,
    [road]: Array(maxLanes).fill(0)
  }), {})
};

export const QueueContext = createContext(defaultContext);

class QueueProvider extends Component {
  state = defaultContext;

  componentDidMount() {
    this.queue();
  }

  queue = () => {
    setTimeout(this.addToQueue, durations.queueEvery)
  }

  addToQueue = () => {
    const { roads } = this.state;
    const roadKeys = _.keys(roads);
    const randomRoadKey = roadKeys[_.random(roadKeys.length - 1)];

    let randomRoad = roads[randomRoadKey];
    const randomLaneIndex = _.random(randomRoad.length - 1);

    randomRoad[randomLaneIndex] = randomRoad[randomLaneIndex] + 1;

    this.setState({ roads: { ...roads, [randomRoadKey]: randomRoad }});
    this.queue();
  }

  removeFromQueue = (key, index) => {
    const { roads } = this.state;
    const targetRoad = roads[key];
    targetRoad[index] = targetRoad[index] - 1;
    this.setState({ roads: { ...roads, [key]: targetRoad }})
  }

  render() {
    const value = {
      ...this.state,
      removeFromQueue: this.removeFromQueue
    };

    return (
      <QueueContext.Provider value={value}>
        {this.props.children}
      </QueueContext.Provider>
    )
  }
}

export default QueueProvider;