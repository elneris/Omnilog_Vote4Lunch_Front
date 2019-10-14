import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faSymfony } from '@fortawesome/free-brands-svg-icons';

export default () => (
  <div className="Footer bg-blue">
    <div className="container text-center">
      <span className="text-white">
        {'2019 - propulsé par '}
        <FontAwesomeIcon icon={faReact} />
        {' et '}
        <FontAwesomeIcon icon={faSymfony} />
        {' pour '}
        <a href="http://www.omnilog.fr/" className="text-white">Omnilog</a>
        {' - '}
        <a href="/apropos">A propos</a>
      </span>
    </div>
  </div>
);
