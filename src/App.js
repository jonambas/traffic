import React, { Component } from 'react';
import IntersectionProvider, { IntersectionContext } from './containers/Intersection';
import QueueProvider, { QueueContext } from './containers/Queue';
import Roads from './components/Roads';
import './App.scss';
import _ from 'lodash';

class App extends Component {
  render() {
    return (
      <div className="App">
        <IntersectionProvider>
          <QueueProvider>
            <IntersectionContext.Consumer>
              {({ intersection }) => (
                <QueueContext.Consumer>
                  {({ roads, removeFromQueue }) => {
                    let mergedData = {};

                    _.forEach(intersection, (value, key) => {
                      mergedData[key] = { ...value, lanes: roads[key] }
                    });
                    
                    return <Roads intersection={mergedData} removeFromQueue={removeFromQueue} />
                  }}
                </QueueContext.Consumer>
              )}
            </IntersectionContext.Consumer>
          </QueueProvider>
        </IntersectionProvider>
      </div>
    );
  }
}

export default App;
