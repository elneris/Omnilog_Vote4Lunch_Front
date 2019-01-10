/* eslint-disable no-undef */
import displaySideButtonBarInfo from '.';

describe('Test Votes displaySideButtonBarInfo action', () => {
  it('actionCreator display side button bar info', () => {
    const data = displaySideButtonBarInfo('pop');
    expect(data).toEqual({
      type: 'DISPLAY_SIDE_BUTTON_BAR_INFO',
      element: 'pop',
    });
  });
});
