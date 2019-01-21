import React from 'react';
import Intersection from '../Intersection';
import { shallow } from 'enzyme';

describe('Intersection Provider', () => {
  let wrapper;
  let next;

  const roadQueueMock = {
    north: [0,1],
    south: [0,2],
    east: [0,3],
    west: [0,4]
  }

  beforeEach(() => {
    global.setTimeout = jest.fn((fn) => next = fn);
    wrapper = shallow(<Intersection roadQueue={roadQueueMock}>child</Intersection>);
  });

  it('should correctly reshape and set initial state', () => {
    expect(wrapper.prop('value')).toMatchSnapshot();
  });

  it('should correctly step through patterns', async () => {
    for (let i = 0; i < 4; i++) {
      await next();  
      expect(wrapper.prop('value')).toMatchSnapshot(); 
    }
  });
});