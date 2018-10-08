import React from 'react';

import { ListGroupItem } from 'reactstrap'

const Place = ({place}) => {
    
    return ( 
        <ListGroupItem>
            {place}
        </ListGroupItem>
     );
}
 
export default Place;
