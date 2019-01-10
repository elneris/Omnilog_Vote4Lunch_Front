/* eslint-disable no-undef */
import toggleSideButtonBarInfo from '.';

describe('Test Votes Reducers', () => {
  let state;

  beforeEach(() => {
    state = {
      displayInfos: false,
      element: '',
    };
  });

  it('DISPLAY_SIDE_BUTTON_BAR_INFO case reducer for toggleSideButtonBarInfo', () => {
    state = toggleSideButtonBarInfo(state, { type: 'DISPLAY_SIDE_BUTTON_BAR_INFO', element: 'pop' });
    expect(state).toEqual({
      displayInfos: true,
      element: 'pop',
    });
  });

  it('HIDE_SIDE_BUTTON_BAR_INFO case reducer for toggleSideButtonBarInfo', () => {
    state = toggleSideButtonBarInfo(state, { type: 'HIDE_SIDE_BUTTON_BAR_INFO', element: 'pop' });
    expect(state).toEqual({
      displayInfos: false,
      element: 'pop',
    });
  });

  it('default case reducer for toggleSideButtonBarInfo', () => {
    state = toggleSideButtonBarInfo(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
