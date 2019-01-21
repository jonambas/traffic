export const pairs = [
  ['north', 'south'],
  ['east', 'west']
];

export const initialPattern = {
  left: false,
  straight: false
}

export const pattern = [
  {
    left: true,
    straight: false
  },
  {
    left: false,
    straight: true
  },
  // {
  //   left: 'yield',
  //   straight: true
  // }
];

/**
 * Describes number of lanes
 * First lane is always a left turn
 * Last lane is always a right turn
 */
export const maxLanes = 4;

export const durations = {
  // Describes the length of each traffic pattern
  patternDuration: 5000,
  // Describes how often a car is added to the traffic queue
  queueEvery: 200,
  // Describes how long a car will wait at the intersection
  // (this is only here to render cars arriving & passing through)
  driverReactionTime: 550
}