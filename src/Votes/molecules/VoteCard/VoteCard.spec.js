/* eslint-disable no-undef */
import React from 'react';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import VoteCard from '.';

describe('VoteCard  - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const restaurant = {
    id: 1,
    lat: 44.7946229,
    lng: -0.6199622,
    name: 'Le Chat qui tousse',
    type: 'restaurant',
  };
  const voteUrl = 'f4k3Url';
  const initialState = {
    getAVote: {
      id: 1,
      end_date: '2018-10-31',
      url: 'f4k3Url',
    },
    userData: {
      pseudo: 'bob',
      password: 'f4k3password',
      passwordRepeater: '',
      authenticated: false,
      loginError: false,
    },
    userVoices: {
      result: [],
    },
    getVoicesCount: [],
  };
  const middlewares = [reduxThunk];
  const mockStore = configureStore(middlewares);
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider
        store={store}
      >
        <VoteCard
          restaurant={restaurant}
          voteUrl={voteUrl}
        />
      </Provider>

    );
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
