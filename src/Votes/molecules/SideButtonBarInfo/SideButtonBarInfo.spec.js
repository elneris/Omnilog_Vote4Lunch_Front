/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import SideButtonBarInfo from '.';

describe('SideButtonBarInfo  - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  it('render the connected(SMART) component with default case', () => {
    const initialState = {
      votes:
      {
        sideButtonBarInfo: {
          element: '',
        },
      },
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider
        store={store}
      >
        <SideButtonBarInfo />
      </Provider>
    );

    expect(wrapper.length).toEqual(1);
  });

  it('render the connected(SMART) component with case oclock', () => {
    const initialState = {
      getAVote: {
        end_date: '2020-12-31',
      },
      votes:
      {
        sideButtonBarInfo: {
          element: 'oclock',
        },
      },
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider
        store={store}
      >
        <SideButtonBarInfo />
      </Provider>
    );

    expect(wrapper.length).toEqual(1);
  });

  it('render the connected(SMART) component with case copyto', () => {
    const initialState = {
      votes:
      {
        sideButtonBarInfo: {
          element: 'copyto',
        },
      },
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider
        store={store}
      >
        <SideButtonBarInfo />
      </Provider>
    );

    expect(wrapper.length).toEqual(1);
  });

  it('render the connected(SMART) component with case mailto', () => {
    const initialState = {
      votes:
      {
        sideButtonBarInfo: {
          element: 'mailto',
        },
      },
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider
        store={store}
      >
        <SideButtonBarInfo />
      </Provider>
    );

    expect(wrapper.length).toEqual(1);
  });
});
