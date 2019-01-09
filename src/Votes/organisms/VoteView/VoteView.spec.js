/* eslint-disable no-undef */
import React from 'react';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import { BrowserRouter as Router } from 'react-router-dom';

import VoteView from '.';

describe('VoteView (Shallow + passing the {store} directly)', () => {
  const initialState = {
    userData: {
      pseudo: '',
      email: '',
      password: '',
      passwordRepeater: '',
      authenticated: false,
      loginError: false,
    },
    getAVote: {
      id: 1,
      pseudo: 'bob',
      email: 'bob@bob.com',
      title: 'Ceci est un titre',
      date: '2018-12-19T11:00:00.000Z',
      end_date: '2018-12-19T11:00:00.000Z',
      url: 'f4k3Url',
      active: true,
      loading: false,
      error: null
    },
    getPlacesList: {
      result: {
        f4k3Url: [
          {
            id: 765,
            name: 'Restaurant "Chez Gigi"',
            lat: 44.6389711,
            lng: -1.0619168,
            type: 'restaurant',
            createdAt: '2018-11-14T16:18:51.506Z',
            updatedAt: '2018-11-14T16:18:51.506Z',
          }
        ]
      },
      loading: false,
      error: null
    },
    userVoices: {
      result: []
    },
    getVoicesCount: [],
    mapCoordinates: {
      positionLatitude: 44.833,
      positionLongitude: -0.59,
      zoomLevel: 12,
    },
    pseudoChecker: {
      payload: {
        exist: false,
      },
    },
    emailChecker: {
      payload: {
        exist: false,
      },
    },
    votes: {
      sideButtonBarInfo: {
        displayInfos: false,
        element: ''
      },
    },
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(
      <VoteView
        store={store}
        match={
          {
            isExact: true,
            params: {
              url: 'fak3Url',
            }
          }
        }
      />
    );
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });
});

describe('VoteContent - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {
    userData: {
      pseudo: '',
      email: '',
      password: '',
      passwordRepeater: '',
      authenticated: false,
      loginError: false,
    },
    getAVote: {
      id: 1,
      pseudo: 'bob',
      email: 'bob@bob.com',
      title: 'Ceci est un titre',
      date: '2018-12-19T11:00:00.000Z',
      end_date: '2018-12-19T11:00:00.000Z',
      url: 'f4k3Url',
      active: true,
      loading: false,
      error: null
    },
    getPlacesList: {
      result: {
        f4k3Url: [
          {
            id: 765,
            name: 'Restaurant "Chez Gigi"',
            lat: 44.6389711,
            lng: -1.0619168,
            type: 'restaurant',
            createdAt: '2018-11-14T16:18:51.506Z',
            updatedAt: '2018-11-14T16:18:51.506Z',
          }
        ]
      },
      loading: false,
      error: null
    },
    userVoices: {
      result: []
    },
    getVoicesCount: [],
    mapCoordinates: {
      positionLatitude: 44.833,
      positionLongitude: -0.59,
      zoomLevel: 12,
    },
    pseudoChecker: {
      payload: {
        exist: false,
      },
    },
    emailChecker: {
      payload: {
        exist: false,
      },
    },
    votes: {
      sideButtonBarInfo: {
        displayInfos: false,
        element: ''
      },
    },
  };
  const middlewares = [reduxThunk];
  const mockStore = configureStore(middlewares);
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    store.clearActions();

    wrapper = mount(
      <Router>
        <Provider store={store}>
          <VoteView
            match={
              {
                isExact: true,
                params: {
                  url: 'fak3Url',
                }
              }
            }
          />
        </Provider>
      </Router>

    );
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
