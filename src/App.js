import React, { Component } from 'react';
import IntersectionProvider, { IntersectionContext } from './containers/Intersection';
import _ from 'lodash';

class App extends Component {
  render() {
    return (
      <div className="App">
        <IntersectionProvider>
          <div>
            <IntersectionContext.Consumer>
              {({ intersection }) => {
                return (
                  <div>
                    {_.keys(intersection).map((key) => {
                      return <div key={key}>
                        {key}: {JSON.stringify(intersection[key])}
                      </div>
                    })}
                  </div>
                )
              }}
            </IntersectionContext.Consumer>
          </div>
        </IntersectionProvider>
      </div>
    );
  }
}

export default App;
