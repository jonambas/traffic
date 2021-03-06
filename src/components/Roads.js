import React from 'react';
import styles from './Roads.module.scss';
import Lane from './Lane';
import _ from 'lodash';

const Road = ({ orientation, road, removeFromQueue }) => (
  <div className={styles[`Road-${orientation}`]}>
    <h5 className={styles.RoadLabel}>{orientation}</h5>
    <div className={styles.Lanes}>
      {road.lanes.map((count, i) => {
        // TODO extract to somewhere else
        // TODO yellow light
        let go = false;
        let icon = '🚫';
        
        if (i === 0 && road.left) {
          go = true;
          icon = '⬅️';
        }

        if (i !== 0 && road.straight) {
          go = true;
          icon = '⬆️';
        }

        const handleRemove = () => removeFromQueue(orientation, i);

        return (
          <Lane key={i}
            count={count}
            go={go}
            handleRemove={handleRemove}
            icon={icon}
          />
        );
      })}
    </div>
  </div>
);

const Roads = ({ data, removeFromQueue }) => {
  return (
    <div className={styles.Roads}>
      {_.keys(data).map((orientation, key) => (
        <Road
          key={key}
          orientation={orientation}
          road={data[orientation]}
          removeFromQueue={removeFromQueue}
        />
      ))}
    </div>
  )
};

export default Roads;
