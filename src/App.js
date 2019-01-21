import React from 'react';
import IntersectionProvider, { IntersectionContext } from './containers/Intersection';
import QueueProvider, { QueueContext } from './containers/Queue';
import Roads from './components/Roads';
import './App.scss';

const App = () => (
  <div className="App">
  {/* TODO Clean this up */}
    <QueueProvider>
      <QueueContext.Consumer>
        {({ roadQueue, removeFromQueue }) => (
          <IntersectionProvider roadQueue={roadQueue}>
            <IntersectionContext.Consumer>
              {/*
                Ideally there will be another layer here to:
                - Compose everything from context
                - Handle all logic in Roads
              */}
              {(data) => <Roads data={data} removeFromQueue={removeFromQueue} />}
            </IntersectionContext.Consumer>
          </IntersectionProvider>
        )}
      </QueueContext.Consumer>
    </QueueProvider>
  </div>
);

export default App;
