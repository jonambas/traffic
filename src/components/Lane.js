import React, { Component } from 'react';
import { durations } from '../config';
import styles from './Roads.module.scss';
import _ from 'lodash';

class Lane extends Component {
  componentDidUpdate({ count: prevCount, go: prevGo }) {
    const { count, go, handleRemove } = this.props;

    if (
      // When count is updated during a green light
      (prevCount !== count && count && go) ||
      // When light changes
      (!prevGo && go && count)
    ) {
      setTimeout(handleRemove, durations.driverReactionTime);
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