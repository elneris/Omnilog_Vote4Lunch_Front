import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmileBeam } from '@fortawesome/free-regular-svg-icons';
import MaterialIcon from 'material-icons-react';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

import axios from 'axios';

import { addVoice, getVoiceCount } from '../actions';

class PlaceCard extends Component {
  constructor(props) {
    super(props);

    this.getVoteId = this.getVoteId.bind(this);

    this.state = {
      vote_id: '',
    };
  }

  async componentDidMount() {
    await this.props.dispatch(getVoiceCount(this.props.vote_url, this.props.restaurant.id));
    await this.getVoteId();
  }

  async getVoteId() {
    const voteId = await axios
      .get(`/api/vote/get?vote_url=${this.props.vote_url}`)
      .then(result => result.data.id);

    await this.setState({
      vote_id: voteId
    });
  }

  render() {
    const { restaurant, voiceCount, voteData, userData, userVoices } = this.props;


    // Control if the user has voted for the restaurant, if not, enable the button
    let filteredUserVoteValue = false;

    if (userVoices.result.length > 0) {
      const filteredUserVoices = userVoices.result
        .filter(
          element => parseInt(element.voteId, 10) === this.state.vote_id
            && element.pseudo === userData.pseudo
            && element.email === userData.email
            && parseInt(element.placeId, 10) === restaurant.id
        );
      if (filteredUserVoices.length !== 0) {
        filteredUserVoteValue = true;
      }
    }

    // Get the number of voices for the place
    let filteredVoiceCountValue = { count: 0, place: restaurant.id };

    if (voiceCount.length > 0) {
      const filteredVoiceCount = voiceCount
        .filter(
          element => element.place === restaurant.id
          && element.voteId === this.state.vote_id
        );

      if (filteredVoiceCount.length !== 0) {
        filteredVoiceCountValue = filteredVoiceCount[0];
      }
    }

    return (
      <Col
        xs="6"
        sm="4"
        lg="3"
        xl="2"
        className="PlaceCard"
      >
        <Card
          className="h-100"
        >
          <Button
            size="sm"
            className="float-right"
            color="info"
          >
            {restaurant.type === 'restaurant' ? <MaterialIcon icon="restaurant" /> : <MaterialIcon icon="fastfood" />}
          </Button>
          <CardBody className="text-center d-flex flex-column">
            <CardTitle>
              {restaurant.name}
            </CardTitle>
            <CardText>Votes : {filteredVoiceCountValue.count}</CardText>
            <Button
              onClick={
                () => this.props.dispatch(
                  addVoice(
                    this.props.vote_url, this.props.restaurant.id, voteData.pseudo, voteData.email
                  )
                )
              }
              size="sm"
              color="success"
              disabled={filteredUserVoteValue}
              className="mt-auto"
            >Je vote pour ! <FontAwesomeIcon icon={faSmileBeam} /></Button>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

PlaceCard.propTypes = {
  dispatch: PropTypes.func,
  restaurant: PropTypes.objectOf(PropTypes.object).isRequired,
  vote_url: PropTypes.string,
  voiceCount: PropTypes.arrayOf(PropTypes.object),
  voteData: PropTypes.objectOf().isRequired,
  userData: PropTypes.objectOf(PropTypes.string).isRequired,
  userVoices: PropTypes.objectOf().isRequired,
};

const mstp = ({ getVoicesCount, voteData, userData, userVoices }) => ({
  voiceCount: getVoicesCount,
  voteData,
  userData,
  userVoices,
});

export default connect(mstp)(PlaceCard);
