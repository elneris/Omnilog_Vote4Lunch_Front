/* eslint-disable no-undef */
import React from 'react';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import VoteSidebar from '.';

describe('VoteSidebar (Shallow)', () => {
  let container;

  beforeEach(() => {
    container = shallow(<VoteSidebar />);
  });

  it('render the component', () => {
    expect(container.length).toEqual(1);
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
        <VoteSidebar />
      </Provider>
    );
  });

  it('check if sidebar close', () => {
    const closeIcon = wrapper.find('CloseIcon');
    closeIcon.simulate('click');

    const hamburgerIcon = wrapper.find('HamburgerIcon');
    const voteSidebarContent = wrapper.find('VoteSidebarContent');
    expect(hamburgerIcon.length).toEqual(1);
    expect(voteSidebarContent.length).toEqual(0);
  });
});
