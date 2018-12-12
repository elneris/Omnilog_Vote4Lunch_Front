/* eslint-disable no-undef */
import { userDataReducer } from '..';

describe('Test Accounts Reducers', () => {
  let state;

  beforeEach(() => {
    state = {
      pseudo: 'bob',
      email: 'bob@bob.com',
      password: '',
      passwordRepeater: '',
    };
  });

  it('UPDATE_USER_DATA case reducer for userData', () => {
    state = userDataReducer(state, {
      type: 'UPDATE_USER_DATA',
      pseudo: 'roger',
      email: 'roger@roger.com'
    });
    expect(state).toEqual({
      pseudo: 'roger',
      email: 'roger@roger.com',
      password: '',
      passwordRepeater: '',
    });
  });

  it('FORM_INPUT_PSEUDO case reducer for userData', () => {
    state = userDataReducer(state, { type: 'FORM_INPUT_PSEUDO', pseudo: 'roger' });
    expect(state).toEqual({
      pseudo: 'roger',
      email: 'bob@bob.com',
      password: '',
      passwordRepeater: '',
    });
  });

  it('FORM_INPUT_PASSWORD case reducer for userData', () => {
    state = userDataReducer(state, { type: 'FORM_INPUT_PASSWORD', password: 'f4k3password' });
    expect(state).toEqual({
      pseudo: 'bob',
      email: 'bob@bob.com',
      password: 'f4k3password',
      passwordRepeater: '',
    });
  });

  it('FORM_INPUT_PASSWORD_REPEATER case reducer for userData', () => {
    state = userDataReducer(state, { type: 'FORM_INPUT_PASSWORD_REPEATER', passwordRepeater: 'f4k3password' });
    expect(state).toEqual({
      pseudo: 'bob',
      email: 'bob@bob.com',
      password: '',
      passwordRepeater: 'f4k3password',
    });
  });

  it('UPDATE_USER_DATA case reducer for userData', () => {
    state = userDataReducer(state, { type: 'FORM_INPUT_EMAIL', email: 'roger@roger.com' });
    expect(state).toEqual({
      pseudo: 'bob',
      email: 'roger@roger.com',
      password: '',
      passwordRepeater: '',
    });
  });

  it('RESET_VOTE_DATA case reducer for userData', () => {
    state = userDataReducer(state, { type: 'RESET_VOTE_DATA' });
    expect(state).toEqual({
      pseudo: '',
      email: '',
      password: '',
      passwordRepeater: '',
    });
  });

  it('default case reducer for userData', () => {
    state = userDataReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
