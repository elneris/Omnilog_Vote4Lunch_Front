/* eslint-disable no-undef */
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { addUser } from './addUser';

describe('Test Map asynchronous addUser Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('actionCreator addUser success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          created: true,
        },
      });
    });
    const expectedActions = [
      { type: 'ADD_USER_BEGIN' },
      {
        type: 'ADD_USER_SUCCESS',
        payload: {
          created: true,
        }
      },
    ];
    const store = mockStore({});

    const pseudo = 'bob';
    const email = 'bob@bob.com';
    const password = 'f4k3password';
    const passwordRepeater = 'f4k3password';

    const userData = {
      pseudo,
      email,
      password,
      passwordRepeater,
    };
    return store.dispatch(addUser(userData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('actionCreator addUser failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404
      });
    });
    const expectedActions = [
      { type: 'ADD_USER_BEGIN' },
      { type: 'ADD_USER_FAILURE', error: new Error('Request failed with status code 404') },
    ];
    const store = mockStore({});

    const pseudo = 'bob';
    const email = 'bob@bob.com';
    const password = 'f4k3password';
    const passwordRepeater = 'f4k3password';

    const userData = {
      pseudo,
      email,
      password,
      passwordRepeater,
    };
    return store.dispatch(addUser(userData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
