import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return ( 
        <div className="Footer bg-blue">
            <div className="container text-center">
                <span className="text-white">
                    2018 - propulsé par <FontAwesomeIcon icon={faReact} /> pour <a href="http://www.omnilog.fr/" className="text-white">Omnilog</a>
                </span>
            </div>
        </div>
     );
}
 
export default Footer;