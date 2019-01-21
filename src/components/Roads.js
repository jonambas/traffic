import React from 'react';
import styles from './Roads.module.scss';
import Lane from './Lane';
import _ from 'lodash';

const Road = ({ orientation, road, removeFromQueue }) => (
  <div className={styles[`Road-${orientation}`]}>
    <h5 className={styles.RoadLabel}>{orientation}</h5>
    {/* {JSON.stringify(road)} */}
    <div className={styles.Lanes}>
      {road.lanes.map((count, i) => {
        // TODO extract to somewhere else
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
        // const handleRemove = () => console.log(orientation, i);

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

const Roads = ({ intersection, removeFromQueue }) => {
  return (
    <div className={styles.Roads}>
      {_.keys(intersection).map((orientation, key) => (
        <Road
          key={key}
          orientation={orientation}
          road={intersection[orientation]}
          removeFromQueue={removeFromQueue}
        />
      ))}
    </div>
  )
};

export default Roads;
