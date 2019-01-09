/* eslint-disable no-undef */
import React from 'react';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import VoteSidebarContent from '.';

describe('VoteSidebarContent (Shallow + passing the {store} directly)', () => {
  const initialState = {
    getPlacesList: {
      result: {
        f4k3Url: [
          {
            id: 719,
            name: 'L\'Escalumade',
            lat: 44.6399168,
            lng: -1.0730316,
            type: 'restaurant',
            createdAt: '2018-11-14T16:18:51.303Z',
            updatedAt: '2018-11-14T16:18:51.303Z',
          },
          {
            id: 723,
            name: 'La Pizza Gujanaise',
            lat: 44.6362167,
            lng: -1.07552,
            type: 'fast_food',
            createdAt: '2018-11-14T16:18:51.319Z',
            updatedAt: '2018-11-14T16:18:51.319Z',
          },
          {
            id: 765,
            name: 'Restaurant "Chez Gigi"',
            lat: 44.6389711,
            lng: -1.0619168,
            type: 'restaurant',
            createdAt: '2018-11-14T16:18:51.506Z',
            updatedAt: '2018-11-14T16:18:51.506Z',
          },
          {
            id: 355,
            name: 'La Guérinière',
            lat: 44.6361363,
            lng: -1.0739954,
            type: 'restaurant',
            createdAt: '2018-11-14T16:18:47.843Z',
            updatedAt: '2018-11-14T16:18:47.843Z',
          },
        ],
      },
      loading: false,
      error: null
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
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<VoteSidebarContent store={store} />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });
});

describe('VoteSidebar - REACT-REDUX (Mount + wrapping in <Provider>) - without places', () => {
  const initialState = {
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
    userData: {
      pseudo: 'bob',
      password: 'bob@bob.com',
      passwordRepeater: '',
      authenticated: true,
      loginError: false,
    },
    getVoicesCount: [],
    userVoices: {
      result: [],
      loading: false,
      error: null
    },
    getPlacesList: {
      result: {},
      loading: false,
      error: null
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
    wrapper = mount(
      <Provider store={store}>
        <VoteSidebarContent />
      </Provider>
    );
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe('VoteSidebar - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {
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
    userData: {
      pseudo: 'bob',
      password: 'bob@bob.com',
      passwordRepeater: '',
      authenticated: true,
      loginError: false,
    },
    getVoicesCount: [],
    userVoices: {
      result: [],
      loading: false,
      error: null
    },
    getPlacesList: {
      result: {
        f4k3Url: [
          {
            id: 719,
            name: 'L\'Escalumade',
            lat: 44.6399168,
            lng: -1.0730316,
            type: 'restaurant',
            createdAt: '2018-11-14T16:18:51.303Z',
            updatedAt: '2018-11-14T16:18:51.303Z',
          },
          {
            id: 723,
            name: 'La Pizza Gujanaise',
            lat: 44.6362167,
            lng: -1.07552,
            type: 'fast_food',
            createdAt: '2018-11-14T16:18:51.319Z',
            updatedAt: '2018-11-14T16:18:51.319Z',
          },
          {
            id: 765,
            name: 'Restaurant "Chez Gigi"',
            lat: 44.6389711,
            lng: -1.0619168,
            type: 'restaurant',
            createdAt: '2018-11-14T16:18:51.506Z',
            updatedAt: '2018-11-14T16:18:51.506Z',
          },
          {
            id: 355,
            name: 'La Guérinière',
            lat: 44.6361363,
            lng: -1.0739954,
            type: 'restaurant',
            createdAt: '2018-11-14T16:18:47.843Z',
            updatedAt: '2018-11-14T16:18:47.843Z',
          },
        ],
      },
      loading: false,
      error: null
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
    wrapper = mount(
      <Provider store={store}>
        <VoteSidebarContent />
      </Provider>
    );
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
