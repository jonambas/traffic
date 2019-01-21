import React from 'react';
import styles from './Roads.module.scss';
import _ from 'lodash';

const Road = ({ orientation, road }) => (
  <div className={styles[`Road-${orientation}`]}>
    {orientation}
    {JSON.stringify(road)}
  </div>
);

const Roads = ({ intersection }) => {
  return (
    <div className={styles.Roads}>
      {_.keys(intersection).map((orientation, key) => (
        <Road key={key} orientation={orientation} road={intersection[orientation]} />
      ))}
    </div>
  )
};

export default Roads;
