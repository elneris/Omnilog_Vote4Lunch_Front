/* eslint-disable no-undef */
import moment from 'moment';
import 'moment/locale/fr';

import { voteDataFormReducer } from '..';

moment.locale('fr');

describe('Test Accounts Reducers', () => {
  let state;
  const today = moment().format('YYYY-MM-DD');

  beforeEach(() => {
    state = {
      pseudo: '',
      email: '',
      date: today,
      endDate: today,
      endTime: '',
    };
  });

  it('FORM_INPUT_PSEUDO case reducer for voteDataForm', () => {
    state = voteDataFormReducer(state, { type: 'FORM_INPUT_PSEUDO', pseudo: 'bob' });
    expect(state).toEqual({
      pseudo: 'bob',
      email: '',
      date: today,
      endDate: today,
      endTime: '',
    });
  });

  it('FORM_INPUT_EMAIL case reducer for voteDataForm', () => {
    state = voteDataFormReducer(state, { type: 'FORM_INPUT_EMAIL', email: 'bob@bob.com' });
    expect(state).toEqual({
      pseudo: '',
      email: 'bob@bob.com',
      date: today,
      endDate: today,
      endTime: '',
    });
  });

  it('FORM_INPUT_DATE case reducer for voteDataForm', () => {
    state = voteDataFormReducer(state, { type: 'FORM_INPUT_DATE', date: '2018-10-01' });
    expect(state).toEqual({
      pseudo: '',
      email: '',
      date: '2018-10-01',
      endDate: today,
      endTime: '',
    });
  });

  it('FORM_INPUT_END_DATE case reducer for voteDataForm', () => {
    state = voteDataFormReducer(state, { type: 'FORM_INPUT_END_DATE', endDate: '2018-10-01', endTime: '12:00' });
    expect(state).toEqual({
      pseudo: '',
      email: '',
      date: today,
      endDate: '2018-10-01',
      endTime: '12:00',
    });
  });

  it('UPDATE_USER_DATA case reducer for voteDataForm', () => {
    state = voteDataFormReducer(state, { type: 'UPDATE_USER_DATA', pseudo: 'bob', email: 'bob@bob.com' });
    expect(state).toEqual({
      pseudo: 'bob',
      email: 'bob@bob.com',
      date: today,
      endDate: today,
      endTime: '',
    });
  });

  it('RESET_VOTE_DATA case reducer for voteDataForm', () => {
    state = voteDataFormReducer(state, { type: 'RESET_VOTE_DATA' });
    expect(state).toEqual({
      pseudo: '',
      email: '',
      date: today,
      endDate: today,
      endTime: '',
    });
  });

  it('default case reducer for voteDataForm', () => {
    state = voteDataFormReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
