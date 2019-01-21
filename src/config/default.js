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
export const lanes = 4;

export const durations = {
  patternDuration: 5000,
}