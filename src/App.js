import React from 'react';
import SignalProvider, { SignalContext } from './containers/Signal';
import QueueProvider, { QueueContext } from './containers/Queue';
import Roads from './components/Roads';
import './App.scss';

const App = () => (
  <div className="App">
  {/* TODO Clean this up */}
    <QueueProvider>
      <QueueContext.Consumer>
        {({ roadQueue, removeFromQueue }) => (
          <SignalProvider roadQueue={roadQueue}>
            <SignalContext.Consumer>
              {/*
                Ideally there will be another layer here to:
                - Compose everything from all parent context
                - Handle all logic in Roads
              */}
              {(data) => <Roads data={data} removeFromQueue={removeFromQueue} />}
            </SignalContext.Consumer>
          </SignalProvider>
        )}
      </QueueContext.Consumer>
    </QueueProvider>
  </div>
);

export default App;
