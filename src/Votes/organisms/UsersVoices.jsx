import React, { Component } from 'react';

import { Title5 } from '../../Core';

class UsersVoices extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="UsersVoices">
        <Title5
          content="Qui a voté pour ce restaurant ?"
          color="white"
        />
      </div>
    );
  }
}

export default UsersVoices;
