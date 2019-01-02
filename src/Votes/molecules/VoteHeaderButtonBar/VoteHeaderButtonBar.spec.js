/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import { BrowserRouter as Router } from 'react-router-dom';

import VoteHeaderButtonBar from '.';

describe('VoteHeaderButtonBar - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  it('render the connected(SMART) component with authenticated false', () => {
    const initialState = {
      userData: {
        authenticated: false,
      },
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const container = mount(
      <Router>
        <Provider store={store}>
          <VoteHeaderButtonBar />
        </Provider>
      </Router>
    );
    expect(container.length).toEqual(1);
  });

  it('render the connected(SMART) component with authenticated true', () => {
    const initialState = {
      userData: {
        authenticated: true,
      },
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const container = mount(
      <Router>
        <Provider store={store}>
          <VoteHeaderButtonBar />
        </Provider>
      </Router>
    );
    expect(container.length).toEqual(1);
  });
});
