/* eslint-disable no-undef */
import React from 'react';

import { shallow } from 'enzyme';

import VoteContent from '.';

describe('VoteHeader (Shallow)', () => {
  it('render component', () => {
    const container = shallow(<VoteContent />);
    expect(container.length).toEqual(1);
  });
});
