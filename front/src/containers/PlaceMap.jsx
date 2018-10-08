import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import FindRestaurant from "./FindRestaurant"

import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

import { fetchRestaurants } from '../actions/listOfRestaurants';

import MaterialIcon from 'material-icons-react';

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

    render() {
        const {error, restaurants} = this.props
        const mapCenter = [this.state.position_latitude, this.state.position_longitude];
        const mapTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        console.log(restaurants);
        
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
                                    <p className='text-center'>
                                    { restaurant.type === 'restaurant' ? <MaterialIcon icon="restaurant" /> : <MaterialIcon icon="fastfood" /> } 
                                    </p>
                                    <p>
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

const mstp = ({ restaurants }) => ({
    restaurants: restaurants.list,
    error: restaurants.error,
});

export default connect(mstp)(PlaceMap);