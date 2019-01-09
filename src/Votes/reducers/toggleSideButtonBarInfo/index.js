const initialState = {
  displayInfos: false,
  element: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'DISPLAY_SIDE_BUTTON_BAR_INFO':

      return {
        displayInfos: true,
        element: action.element,
      };
    case 'HIDE_SIDE_BUTTON_BAR_INFO':

      return {
        displayInfos: false,
        element: action.element,
      };
    default:
      return state;
  }
};
