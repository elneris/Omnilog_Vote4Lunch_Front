/* eslint-disable no-undef */
import userDataReducer from '../reducers';

describe('Test Accounts Reducers', () => {
  it('UPDATE_USER_DATA case reducer for userData', () => {
    let state = { pseudo: 'bob', email: 'bob@bob.com' };
    state = userDataReducer(state, { type: 'UPDATE_USER_DATA', pseudo: 'bob', email: 'bob@bob.com' });
    expect(state).toEqual({ pseudo: 'bob', email: 'bob@bob.com' });
  });

  it('default case reducer for userData', () => {
    let state = { pseudo: 'bob', email: 'bob@bob.com' };
    state = userDataReducer(state, { type: '' });
    expect(state).toEqual({ pseudo: 'bob', email: 'bob@bob.com' });
  });
});
