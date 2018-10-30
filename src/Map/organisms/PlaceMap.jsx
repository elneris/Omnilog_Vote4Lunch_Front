import MaterialIcon from 'material-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import { Button } from 'reactstrap';

import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import L from 'leaflet';

import { offMapAlert, onMapAlert } from '../actions';
import { fetchRestaurants } from '../../actions/listOfRestaurants';
import { addAPlace } from '../../actions/addAPlace';


import { Controls } from '../';

/* eslint no-underscore-dangle: ["error", { "allow": ["_getIconUrl","_northEast","_southWest"] }] */
delete L.Icon.Default.prototype._getIconUrl;


L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

class PlaceMap extends Component {
  constructor() {
    super();
    this.state = {
      position_latitude: 44.833,
      position_longitude: -0.59,
      zoomLevel: 12,
    };

    this.leafletMap = React.createRef();
    this.getLocation = this.getLocation.bind(this);
    this.getRestaurantsList = this.getRestaurantsList.bind(this);
    this.addAPlaceToVote = this.addAPlaceToVote.bind(this);
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

  getRestaurantsList() {
    const { fetchRestaurants: fetchR } = this.props;

    if (this.leafletMap.current.leafletElement) {
      const coordinates = this.leafletMap.current.leafletElement.getBounds();
      fetchR(
        coordinates._northEast.lat,
        coordinates._northEast.lng,
        coordinates._southWest.lat,
        coordinates._southWest.lng
      );
    }
  }

  addAPlaceToVote(voteData, placeId) {
    const { addAPlace: addAP, onMapAlert: onMA, offMapAlert: offMA } = this.props;
    if (voteData.places.length > 4) {
      onMA('danger', 'Le saviez vous : trop de choix tue le choix.');
      setTimeout(() => { offMA(); }, 3000);
    } else if (voteData.places.filter(place => place.id === placeId).length > 0) {
      onMA('danger', 'Hola, attention il existe déjà !');
      setTimeout(() => { offMA(); }, 3000);
    } else {
      addAP(voteData.id, placeId);
    }
  }

  render() {
    const { error, restaurants, voteData, onMapAlert: onMA, offMapAlert: offMA } = this.props;
    const mapCenter = [this.state.position_latitude, this.state.position_longitude];
    const mapTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    let render;

    if (restaurants.length === 0) {
      onMA('info', 'Pas de restaurant connu dans cette zone');
      setTimeout(() => { offMA(); }, 3000);
    } else {
      render = restaurants.map(restaurant => (
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
            <p className="text-center mt-1">
              <Button
                color="success"
                onClick={() => this.addAPlaceToVote(voteData, restaurant.id)}
              ><FontAwesomeIcon icon={faPlus} /></Button>
            </p>
          </Popup>
        </Marker>
      ));
    }

    if (error) {
      onMA('danger', 'Aie, il y a un problème avec la carte');
      setTimeout(() => { offMA(); }, 3000);
    }

    return (
      <div>

        <Map
          center={mapCenter}
          zoom={this.state.zoomLevel}
          ref={this.leafletMap}
          onmoveend={() => this.getRestaurantsList()}
          onzoomend={() => this.getRestaurantsList()}
          className="PlaceMap"
        >
          <TileLayer
            url={mapTiles}
          />

          <Controls />
          {render}
        </Map>
      </div>
    );
  }
}

PlaceMap.propTypes = {
  addAPlace: PropTypes.func.isRequired,
  fetchRestaurants: PropTypes.func.isRequired,
  onMapAlert: PropTypes.func.isRequired,
  offMapAlert: PropTypes.func.isRequired,
  restaurants: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.object
    )
  ).isRequired,
  voteData: PropTypes.objectOf(PropTypes.object).isRequired,
  error: PropTypes.objectOf().isRequired,
};

const mstp = ({ restaurants, voteData }) => ({
  restaurants: restaurants.list,
  error: restaurants.error,
  voteData,
});

const mdtp = dispatch => bindActionCreators({
  addAPlace,
  fetchRestaurants,
  onMapAlert,
  offMapAlert }, dispatch);

export default connect(mstp, mdtp)(PlaceMap);
