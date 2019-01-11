/* eslint-disable no-undef */
import React from 'react';

import { shallow } from 'enzyme';

import PlaceWebsite from '.';


describe('PlaceWebsite - Shallow', () => {
  const website = 'http://www.lesupersite.com';

  it('render the component', () => {
    const container = shallow(
      <PlaceWebsite
        website={website}
      />
    );

    expect(container.length).toEqual(1);
  });
});
