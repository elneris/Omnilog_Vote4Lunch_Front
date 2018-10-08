import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import { Button } from 'reactstrap'

import FindRestaurant from "./FindRestaurant"

import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

import { fetchRestaurants } from '../actions/listOfRestaurants';

import { addAPlace } from '../actions/addAPlace'

import MaterialIcon from 'material-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class PlaceMap extends Component {

    constructor() {
        super()
        this.state = {
            position_latitude: 44.833,
            position_longitude: -0.59,
            zoomLevel: 12,
        }
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
                var crd = pos.coords;

                this.setState({
                    position_latitude: crd.latitude,
                    position_longitude: crd.longitude,
                    zoomLevel: 16,
                })
            }
            navigator.geolocation.getCurrentPosition(success);
        } else {
            // Pas de support, proposer une alternative ?
            console.log("pas de geoloc !");

        }
    }

    getRestaurantsList() {
        const coordinates = this.refs.leaflet.leafletElement.getBounds()
        this.props.dispatch(fetchRestaurants(coordinates._northEast.lat, coordinates._northEast.lng, coordinates._southWest.lat, coordinates._southWest.lng))
    }

    addAPlaceToVote(vote_id, place_id) {
        console.log(vote_id, place_id);
        this.props.dispatch(addAPlace(vote_id, place_id))
      }

    render() {
        const {error, restaurants, voteData} = this.props
        const mapCenter = [this.state.position_latitude, this.state.position_longitude];
        const mapTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

        if(error) {
            console.log(error);
        }

        return (
            <div>

                <Map
                    center={mapCenter}
                    zoom={this.state.zoomLevel}
                    ref='leaflet'
                    onmoveend={() => this.getRestaurantsList()}
                    onzoomend={() => this.getRestaurantsList()}
                >
                    <TileLayer
                        url={mapTiles}
                    />
                    <FindRestaurant />
                    {
                        restaurants.map(restaurant => (
                            <Marker
                                key= {restaurant.id}
                                position={[restaurant.lat,restaurant.lng]}
                            >
                                <Popup>
                                    <p className='text-center mb-1'>
                                    { restaurant.type === 'restaurant' ? <MaterialIcon icon="restaurant" /> : <MaterialIcon icon="fastfood" /> } 
                                    </p>
                                    <p className='text-center my-1'>
                                    {restaurant.name}
                                    </p>
                                    <p className='text-center mt-1'>
                                    <Button
                                        color='success'
                                        onClick={() => this.addAPlaceToVote(voteData.id, restaurant.id)}
                                    ><FontAwesomeIcon icon={faPlus} /></Button>
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

const mstp = ({ restaurants, voteData }) => ({
    restaurants: restaurants.list,
    error: restaurants.error,
    voteData: voteData,
});

export default connect(mstp)(PlaceMap);