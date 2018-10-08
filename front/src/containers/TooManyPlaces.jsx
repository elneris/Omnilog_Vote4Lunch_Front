import React from 'react';
import { connect } from 'react-redux'
import Control from 'react-leaflet-control';
import { Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


const TooManyPlaces = ({message_type, status, message}) => {
    let picto = ''
    if (message_type === 'danger') {
        picto = <FontAwesomeIcon icon={faExclamationTriangle} />
    }
    return (
        <Control position="topright" >
            <Alert color={message_type} isOpen={status} >
            {picto} {message} {picto}
            </Alert>
        </Control>
    );
}

const mstp = ({ onMapAlert }) => ({
    message_type: onMapAlert.message_type,
    status: onMapAlert.status,
    message: onMapAlert.message
});

export default connect(mstp)(TooManyPlaces);