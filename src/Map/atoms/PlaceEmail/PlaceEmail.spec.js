/* eslint-disable no-undef */
import React from 'react';

import { shallow } from 'enzyme';

import PlaceEmail from '.';


describe('PlaceEmail - Shallow', () => {
  const email = 'bob@lesuperresto.com';

  it('render the component', () => {
    const container = shallow(
      <PlaceEmail
        email={email}
      />
    );

    expect(container.length).toEqual(1);
  });
});
