/* eslint-disable no-undef */
import React from 'react';

import { shallow } from 'enzyme';

import PlaceInfos from '.';


describe('PlaceInfos - Shallow', () => {
  const address = '8 rue du chat qui chante';
  const city = 'Bordeaux';
  const email = 'bob@lesuperresto.com';
  const openingHours = 'Lu off; Ma-Sa 10:00-19:00; Di 10:00-15:00';
  const phone = '05 56 01 02 03';
  const website = 'http://www.lesupersite.com';

  it('render the component without infos', () => {
    const restaurant = {};

    const container = shallow(
      <PlaceInfos
        restaurant={restaurant}
      />
    );

    expect(container.length).toEqual(1);
  });

  it('render the component with all infos', () => {
    const restaurant = {
      address,
      city,
      email,
      opening_hours: openingHours,
      phone,
      website,
    };

    const container = shallow(
      <PlaceInfos
        restaurant={restaurant}
      />
    );

    expect(container.length).toEqual(1);
  });
});
