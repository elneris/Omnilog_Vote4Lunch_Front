import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import MaterialIcon from 'material-icons-react';

import 'leaflet/dist/leaflet.css';

class VoteMap extends Component {
  constructor() {
    super();
    this.state = {
      position_latitude: 44.833,
      position_longitude: -0.59,
      zoomLevel: 12,
    };
    this.leafletMap = React.createRef();
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      // L'API est disponible
      const success = (pos) => {
        const crd = pos.coords;

        this.setState({
          position_latitude: crd.latitude,
          position_longitude: crd.longitude,
          zoomLevel: 16,
        });
      };
      navigator.geolocation.getCurrentPosition(success);
    }
  }


  render() {
    const mapCenter = [this.state.position_latitude, this.state.position_longitude];
    const mapTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const { restaurants } = this.props;

    return (
      <div className="mt-3">

        <Map
          center={mapCenter}
          zoom={this.state.zoomLevel}
          ref={this.leafletMap}
          className="VoteMap"
        >
          <TileLayer
            url={mapTiles}
          />
          {
            restaurants.map(restaurant => (
              <Marker
                key={restaurant.id}
                position={[restaurant.lat, restaurant.lng]}
              >
                <Popup>
                  <p className="text-center mb-1">
                    {restaurant.type === 'restaurant' ? <MaterialIcon icon="restaurant" /> : <MaterialIcon icon="fastfood" />}
                  </p>
                  <p className="text-center my-1">
                    {restaurant.name}
                  </p>
                </Popup>
              </Marker>
            ))
          }
        </Map>
      </div>
    );
  }
}

VoteMap.propTypes = {
  restaurants: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.object
    )
  ).isRequired,
};

export default VoteMap;
