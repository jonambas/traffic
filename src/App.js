import React, { Component } from 'react';
import IntersectionProvider, { IntersectionContext } from './containers/Intersection';
import Roads from './components/Roads';

class App extends Component {
  render() {
    return (
      <div className="App">
        <IntersectionProvider>
          <div>
            <IntersectionContext.Consumer>
              {({ intersection }) => <Roads intersection={intersection} />}
            </IntersectionContext.Consumer>
          </div>
        </IntersectionProvider>
      </div>
    );
  }
}

export default App;
