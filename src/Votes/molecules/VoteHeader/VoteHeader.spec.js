/* eslint-disable no-undef */
import React from 'react';

import { shallow } from 'enzyme';

import VoteHeader from '.';

describe('VoteHeader (Shallow)', () => {
  it('render component', () => {
    const container = shallow(<VoteHeader />);
    expect(container.length).toEqual(1);
  });
});
