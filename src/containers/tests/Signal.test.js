import React from 'react';
import Signal from '../Signal';
import { shallow } from 'enzyme';

describe('Signal Provider', () => {
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
    wrapper = shallow(<Signal roadQueue={roadQueueMock}>child</Signal>);
  });

  it('should correctly step through patterns', async () => {
    for (let i = 0; i < 4; i++) {
      await next();  
      expect(wrapper.prop('value')).toMatchSnapshot(); 
    }
  });
});