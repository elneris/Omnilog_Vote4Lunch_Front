/* eslint-disable no-undef */
import React from 'react';

import { shallow } from 'enzyme';

import PlaceOpeningHours from '.';


describe('PlaceOpeningHours - Shallow', () => {
  const openingHours = 'Lu off; Ma-Sa 10:00-19:00; Di 10:00-15:00';

  it('render the component', () => {
    const container = shallow(
      <PlaceOpeningHours
        openingHours={openingHours}
      />
    );

    expect(container.length).toEqual(1);
  });
});
