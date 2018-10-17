import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmileBeam } from '@fortawesome/free-regular-svg-icons';
import MaterialIcon from 'material-icons-react';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

import axios from 'axios';

import { getVoiceCount } from '../actions/getVoiceCount';
import { addVoice } from '../actions/addVoice';
import { verifyIfUserHasVoted } from '../actions/verifyIfUserHasVoted';


class PlaceCard extends Component {
  constructor(props) {
    super(props);

    this.getVoteId = this.getVoteId.bind(this);

    this.state = {
      vote_id: '',
    };
  }

  async componentDidMount() {
    const pseudo = await localStorage.getItem('pseudo');
    const email = await localStorage.getItem('email');
    await this.props.dispatch(getVoiceCount(this.props.vote_url, this.props.restaurant.id));
    await this.getVoteId();
    await this.props.dispatch(verifyIfUserHasVoted(this.state.vote_id, pseudo, email));
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
    const { restaurant, voiceCount, voteData, userVote, userData } = this.props;

    let filteredUserVoteValue = false;

    if (userVote.length > 0) {
      const filteredUserVote = userVote
        .filter(
          element => parseInt(element.vote_id, 10) === this.state.vote_id
            && element.pseudo === userData.pseudo
            && element.email === userData.email);
      if (filteredUserVote.length !== 0) {
        filteredUserVoteValue = filteredUserVote[0].vote;
      }
    }

    let filteredVoiceCountValue = { count: 0, place: restaurant.id };

    if (voiceCount.length > 0) {
      const filteredVoiceCount = voiceCount
        .filter(
          element => element.place === restaurant.id
          && element.vote_id === this.state.vote_id
        );

      if (filteredVoiceCount.length !== 0) {
        filteredVoiceCountValue = filteredVoiceCount[0];
      }
    }

    return (
      <Col
        xs='6'
        sm='4'
        lg='3'
        xl='2'
        className='PlaceCard'
      >
        <Card
          className='h-100'
        >
          <Button
            size='sm'
            className='float-right'
            color='info'
          >
            {restaurant.type === 'restaurant' ? <MaterialIcon icon="restaurant" /> : <MaterialIcon icon="fastfood" />}
          </Button>
          <CardBody className='text-center d-flex flex-column'>
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
              color='success'
              disabled={filteredUserVoteValue}
              className='mt-auto'
            >Je vote pour ! <FontAwesomeIcon icon={faSmileBeam} /></Button>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mstp = ({ getVoicesCount, voteData, verifyIfUserHasVoted, userData }) => ({
  voiceCount: getVoicesCount,
  voteData,
  userVote: verifyIfUserHasVoted,
  userData,
});

export default connect(mstp)(PlaceCard);
