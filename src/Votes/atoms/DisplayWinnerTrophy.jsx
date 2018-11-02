import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faSadTear } from '@fortawesome/free-solid-svg-icons';
import { faSurprise } from '@fortawesome/free-regular-svg-icons';

const DisplayWinnerEmoji = ({ emoji }) => {
  let result = '';
  if (emoji === 'trophy') {
    result = (
      <p className="text-center h1">
        <FontAwesomeIcon
          className="ml-2"
          color="yellow"
          icon={faTrophy}
        />
      </p>
    );
  } else if (emoji === 'surprise') {
    result = (
      <p className="text-center h1">
        <FontAwesomeIcon
          className="ml-2"
          color="#193441"
          icon={faSurprise}
        />
      </p>
    );
  } else if (emoji === 'sadtear') {
    result = (
      <p className="text-center h1">
        <FontAwesomeIcon
          className="ml-2"
          color="#193441"
          icon={faSadTear}
        />
      </p>
    );
  }
  return result;
};

export default DisplayWinnerEmoji;
