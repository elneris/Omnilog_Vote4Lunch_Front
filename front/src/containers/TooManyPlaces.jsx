import React from 'react';
import { connect } from 'react-redux'
import Control from 'react-leaflet-control';
import { Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


const TooManyPlaces = () => {
    return (
        <Control position="topright" >
            <Alert color="danger">
            <FontAwesomeIcon icon={faExclamationTriangle} /> Le saviez vous : trop de choix tue le choix. <FontAwesomeIcon icon={faExclamationTriangle} />
            </Alert>
        </Control>
    );
}

const mstp = ({ onMapAlert }) => ({
    type: onMapAlert.type,
    status: onMapAlert.status,
    message: onMapAlert.message
});

export default connect(mstp)(TooManyPlaces);