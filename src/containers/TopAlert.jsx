import React from 'react';
import { connect } from 'react-redux';

import { Alert } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
 
const TopAlert = ({message_type, status, message}) => {
    let picto = ''
    if (message_type === 'danger') {
        picto = <FontAwesomeIcon icon={faExclamationTriangle} />
    }
    return (
            <Alert color={message_type} isOpen={status} className="AlertBox">
            {picto} {message} {picto}
            </Alert>
    );
}

const mstp = ({ topAlert }) => ({
    message_type: topAlert.message_type,
    status: topAlert.status,
    message: topAlert.message,
});

export default connect(mstp)(TopAlert);