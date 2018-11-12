/* eslint-disable no-undef */
import {
  offMapAlert,
  onMapAlert,
  resetListOfRestaurants,
  updateMapCoordinates,
  updateZoomLevel,
} from '../actions';

describe('Test Map Actions', () => {
  it('actionCreator off map alert', () => {
    const alert = offMapAlert();
    expect(alert).toEqual({ type: 'OFF_MAP_ALERT' });
  });

  it('actionCreator on map alert', () => {
    const alert = onMapAlert('danger', 'le ciel est rouge !');
    expect(alert).toEqual({
      type: 'ON_MAP_ALERT',
      messageType: 'danger',
      message: 'le ciel est rouge !',
    });
  });

  it('actionCreator reset list of restaurants', () => {
    const list = resetListOfRestaurants();
    expect(list).toEqual({ type: 'RESET_LIST_OF_RESTAURANTS' });
  });

  it('actionCreator update map coordinates', () => {
    const update = updateMapCoordinates(44.8605579, -0.5528455, 14);
    expect(update).toEqual({
      type: 'UPDATE_MAP_COORDINATES',
      positionLatitude: 44.8605579,
      positionLongitude: -0.5528455,
      zoomLevel: 14,
    });
  });

  it('actionCreator update zoom level', () => {
    const update = updateZoomLevel(14);
    expect(update).toEqual({
      type: 'UPDATE_ZOOM_LEVEL',
      zoomLevel: 14,
    });
  });
});
