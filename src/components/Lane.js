import React, { Component } from 'react';
import { durations } from '../config';
import styles from './Roads.module.scss';
import _ from 'lodash';

class Lane extends Component {
  componentDidUpdate({ count: prevCount, go: prevGo }) {
    const { count, go } = this.props;

    if (
      // When count is updated during a green light
      (prevCount !== count && go && count > 0) ||
      // When light changes
      (!prevGo && go && count > 0)
    ) {
      setTimeout(this.handleRemove, durations.driverReactionTime);
    }
  }

  handleRemove = () => {
    const { count, go, handleRemove } = this.props;
    // Recheck if car can still go after driver reacts 
    if (go && count > 0) {
      handleRemove();
    }
  }

  render() {
    const { count, icon } = this.props;
      
    return (
      <div className={styles.Lane}>
        <div className={styles.Icon}>{icon}</div>
        {_.range(count).map((i) => <div className={styles.Car} key={i}>🚙</div>)}
      </div>
    );
  }
}

export default Lane;