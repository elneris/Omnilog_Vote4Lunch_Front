import React, { Component } from 'react';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import FindRestaurant from "./FindRestaurant"
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

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
    }

    componentDidMount() {
        this.getLocation();
    }

    componentDidUpdate() {
        console.log(this.refs.leaflet.leafletElement.getBounds());
    }

    getLocation() {
        if(navigator.geolocation) {
              // L'API est disponible
            const success = (pos)  => {
                var crd = pos.coords;

                this.setState({
                    position_latitude: crd.latitude,
                    position_longitude:  crd.longitude,
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
        const position = [44.8605579, -0.5528455]
        
        
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
                <FindRestaurant/>
                <Marker position={position}>
          <Popup>
            Les Tontons <br/> Easily customizable.
          </Popup>
        </Marker>
            </Map>
        </div>
         );
    }
}
 
export default PlaceMap;