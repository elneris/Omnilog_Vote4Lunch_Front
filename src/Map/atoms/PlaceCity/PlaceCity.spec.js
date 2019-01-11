/* eslint-disable no-undef */
import React from 'react';

import { shallow } from 'enzyme';

import PlaceCity from '.';


describe('PlaceCity - Shallow', () => {
  const city = 'Bordeaux';

  it('render the component', () => {
    const container = shallow(
      <PlaceCity
        city={city}
      />
    );

    expect(container.length).toEqual(1);
  });
});
