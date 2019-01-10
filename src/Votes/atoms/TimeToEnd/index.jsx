import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

class TimeToEnd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromNow: '',
    };
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const { remainingTime } = this.props;
    const timeObject = moment(moment(remainingTime).diff(moment())).toObject();
    const hourTime = (timeObject.date - 1) * 24 + timeObject.hours - 1;
    const minutes = timeObject.minutes < 10 ? `0${timeObject.minutes}` : `${timeObject.minutes}`;
    const seconds = timeObject.seconds < 10 ? `0${timeObject.seconds}` : `${timeObject.seconds}`;
    const fromNow = `${hourTime}:${minutes}:${seconds}`;

    this.setState({
      fromNow,
    });
  }

  render() {
    const { remainingTime } = this.props;
    const { fromNow } = this.state;
    const close = moment(remainingTime) < moment();
    const voteState = 'le vote est terminé';

    return (
      <span className="align-middle">
        {
        close
          ? voteState
          : `le vote termine dans ${fromNow}`
      }
      </span>
    );
  }
}

TimeToEnd.propTypes = {
  remainingTime: PropTypes.string.isRequired,
};

const mstp = ({ getAVote: gAV }) => ({
  remainingTime: gAV.end_date,
});

export default connect(mstp)(TimeToEnd);
