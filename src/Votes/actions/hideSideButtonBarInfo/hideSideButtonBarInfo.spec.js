/* eslint-disable no-undef */
import hideSideButtonBarInfo from '.';

describe('Test Votes hideSideButtonBarInfo action', () => {
  it('actionCreator hide side button bar info', () => {
    const data = hideSideButtonBarInfo('pop');
    expect(data).toEqual({
      type: 'HIDE_SIDE_BUTTON_BAR_INFO',
      element: 'pop',
    });
  });
});
