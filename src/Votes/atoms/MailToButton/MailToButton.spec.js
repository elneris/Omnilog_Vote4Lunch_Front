/* eslint-disable no-undef */
import React from 'react';

import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import { MailToButton } from '../..';

describe('MailToButton (Mount)', () => {
  const initialState = {
    votes: {
      sideButtonBarInfo: {
        displayInfos: false,
        element: ''
      },
    },
  };
  const mockStore = configureStore();
  let store;

  it('check if atom mount', () => {
    store = mockStore(initialState);
    const url = '/c-ici-qu-on-mange';
    window.history.pushState({}, 'Test', url);
    const wrapper = mount(<MailToButton store={store} />);
    const link = wrapper.find('a');

    expect(wrapper.length).toEqual(1);
    expect(link.prop('href')).toEqual(`mailto:?subject=Où%20déjeune-t-on%20ce%20midi?&body=Votez%20grâce%20à%20ce%20lien:%0D%0A%0D%0Ahttp://localhost${url}`);
  });
});
