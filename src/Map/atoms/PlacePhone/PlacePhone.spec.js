/* eslint-disable no-undef */
import React from 'react';

import { shallow } from 'enzyme';

import PlacePhone from '.';


describe('PlacePhone - Shallow', () => {
  const phone = '05 56 01 02 03';

  it('render the component', () => {
    const container = shallow(
      <PlacePhone
        phone={phone}
      />
    );

    expect(container.length).toEqual(1);
  });
});
