import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import Controls from '../components/Controls';

import MaterialIcon from 'material-icons-react';

import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class VoteMap extends Component {

    constructor() {
        super()
        this.state = {
            position_latitude: 44.833,
            position_longitude: -0.59,
            zoomLevel: 12,
        }
        this.getLocation = this.getLocation.bind(this);
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


    render() {
        const mapCenter = [this.state.position_latitude, this.state.position_longitude];
        const mapTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const {restaurants} = this.props

        return (
            <div>
                
                <Map
                    center={mapCenter}
                    zoom={this.state.zoomLevel}
                    ref='leaflet'
                >
                    <TileLayer
                        url={mapTiles}
                    />
                    <Controls/>
{
    restaurants.map(restaurant => (
        <Marker
            key={restaurant.id}
            position={[restaurant.lat, restaurant.lng]}
        >
            <Popup>
                <p className='text-center mb-1'>
                    {restaurant.type === 'restaurant' ? <MaterialIcon icon="restaurant" /> : <MaterialIcon icon="fastfood" />}
                </p>
                <p className='text-center my-1'>
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

const mstp = () => ({

});

export default connect(mstp)(VoteMap);