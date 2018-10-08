import React from 'react';

import { ListGroupItem } from 'reactstrap'

const Place = ({place}) => {
    console.log(this.props);
    
    return ( 
        <ListGroupItem>
            {place}
        </ListGroupItem>
     );
}
 
export default Place;
