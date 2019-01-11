/* eslint-disable no-undef */
import React from 'react';

import { shallow } from 'enzyme';

import PlaceWebInfos from '.';


describe('PlaceWebInfos - Shallow', () => {
  const website = 'http://www.lesupersite.com';
  const email = 'bob@lesuperresto.com';

  it('render the component with website', () => {
    const container = shallow(
      <PlaceWebInfos
        website={website}
      />
    );

    expect(container.length).toEqual(1);
  });

  it('render the component with email', () => {
    const container = shallow(
      <PlaceWebInfos
        email={email}
      />
    );

    expect(container.length).toEqual(1);
  });
});
