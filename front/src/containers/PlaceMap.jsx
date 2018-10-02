import React, { Component } from 'react';

import { Map, TileLayer } from 'react-leaflet';
import FindRestaurant from "./FindRestaurant"



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

    getLocation() {
        if(navigator.geolocation) {
              // L'API est disponible
            console.log('geoloc');

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

        return ( 
            <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/leaflet.css" />

            <Map
                center={mapCenter}
                zoom={this.state.zoomLevel}
            >
                <TileLayer
                    url={mapTiles}
                />
                <FindRestaurant/>
            </Map>
        </div>
         );
    }
}
 
export default PlaceMap;