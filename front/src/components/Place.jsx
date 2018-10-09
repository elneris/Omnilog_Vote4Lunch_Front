import React from 'react';

import { ListGroupItem } from 'reactstrap'

import MaterialIcon from 'material-icons-react';

const Place = ({place, type}) => {
    
    return ( 
        <ListGroupItem>
            {type === 'restaurant' ? <MaterialIcon icon="restaurant" /> : <MaterialIcon icon="fastfood" />} {place}
        </ListGroupItem>
     );
}
 
export default Place;
