/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { FormInputEmail } from '..';
import configureStore from 'redux-mock-store';

describe('FormInputEmail Snapshot', () => {
  const initialState = { voteDataForm: { email: 'bob@bob.com' } };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of FormInputEmail', () => {
    const renderedValue = renderer.create(<FormInputEmail store={store} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('FormInputEmail - Shallow Render REACT COMPONENTS', () => {
  const initialState = { voteDataForm: { email: 'bob@bob.com' } };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<FormInputEmail store={store} />);
  });

  it('render the DUMB component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('label value', () => {
    expect(wrapper.find('label').get(0).props.children).toBe('Indique ton email');
  });

  it('contains email', () => {
    expect(wrapper.find('input').prop('value')).toEqual(voteDataForm.email);
});
});

describe('FormInputEmail (Shallow + passing the {store} directly)', () => {
  const initialState = { voteDataForm: { email: 'bob@bob.com' } };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<FormInputEmail store={store} />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(container.prop('email')).toEqual(initialState.voteDataForm.email);
  });
});
