/* eslint-disable no-undef */
import React from 'react';

import { shallow } from 'enzyme';

import PlaceAddress from '.';


describe('PlaceAddress - Shallow', () => {
  const address = '8 rue du chat qui chante';

  it('render the component', () => {
    const container = shallow(
      <PlaceAddress
        address={address}
      />
    );

    expect(container.length).toEqual(1);
  });
});
