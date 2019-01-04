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
    allVoicesForAVote: {
      result: [
        {
          id: 170,
          pseudo: 'bob',
          email: 'bob@bob.com',
          createdAt: '2019-01-04T07:56:44.333Z',
          updatedAt: '2019-01-04T07:56:44.333Z',
          voteId: 69,
          placeId: 604
        },
      ],
      loading: false,
      error: null
    }
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

  it('check if VoteCardTextUsersList atom is displayed and hidden', () => {
    const voteCard = wrapper.find('h5.text-right.ml-auto');

    voteCard.simulate('mouseenter');

    const voteCardTextUsersListIsDisplayed = wrapper.find('VoteCardTextUsersList');
    expect(voteCardTextUsersListIsDisplayed.length).toEqual(1);

    voteCard.simulate('mouseleave');

    const voteCardTextUsersListIsHidden = wrapper.find('VoteCardTextUsersList');
    expect(voteCardTextUsersListIsHidden.length).toEqual(0);
  });
});
