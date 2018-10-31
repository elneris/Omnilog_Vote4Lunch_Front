import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Row, Col, Collapse, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

import moment from 'moment';
import 'moment/locale/fr';

import { PlaceCard } from './';

import { deleteAVote, getUsersVotes, getPlacesList } from '../actions';
import { onTopAlert, offTopAlert } from '../../Core/actions';

class VoteCollapser extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  componentDidMount() {
    const { getPlacesList: getPL } = this.props;
    const { url } = this.props.vote;
    getPL(url);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const {
      vote,
      restaurants,
      maxDate,
      delVoteResult,
      onTopAlert: onTA,
      offTopAlert: offTA,
      deleteAVote: deleteAV,
      getUsersVotes: getUV
    } = this.props;

    moment.locale('fr');

    const dateVote = moment(vote.date).format('dddd D MMMM YYYY');
    let listOfRestaurants = [];
    const myRestaurants = restaurants.find(
      obj => Object.prototype.hasOwnProperty.call(obj, vote.url)
    );

    if (myRestaurants) {
      listOfRestaurants = myRestaurants[vote.url];
    }

    let classNameForRow = 'VoteCollapser pt-4';

    if (maxDate) {
      classNameForRow = 'VoteCollapser py-4';
    }

    const voteDetailUrl = `/vote/${vote.url}`;

    if (delVoteResult.delete === true) {
      onTA('success', 'Ce vote a bien été supprimé');
      setTimeout(() => { offTA(); }, 3000);
      getUV(vote.pseudo);
    }

    return (
      <Row className={classNameForRow} >
        <Col className="rounded bg-blue pt-2">
          <p className="text-white">
            <Button
              size="sm"
              color="info"
              onClick={this.toggle}
              className="mr-3"
            >
              <FontAwesomeIcon

                icon={this.state.collapse ? faAngleDown : faAngleRight}
              />
            </Button>
            {dateVote}
            <Button
              size="sm"
              color="info"
              tag={Link}
              to={voteDetailUrl}
              className="ml-3"
            >
              voir le détail
            </Button>
            <Button
              size="sm"
              color="danger"
              onClick={() => deleteAV(vote.url)}
              className="ml-3"
            >
              supprimer le vote
            </Button>
          </p>
          <Collapse isOpen={this.state.collapse}>
            <Row className="justify-content-center pb-3">
              {
                listOfRestaurants.map(restaurant => (
                  <PlaceCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    voteUrl={this.props.vote.url}
                  />
                ))
              }
            </Row>
          </Collapse>
        </Col>
      </Row>

    );
  }
}

VoteCollapser.propTypes = {
  getPlacesList: PropTypes.func.isRequired,
  onTopAlert: PropTypes.func.isRequired,
  offTopAlert: PropTypes.func.isRequired,
  deleteAVote: PropTypes.func.isRequired,
  getUsersVotes: PropTypes.func.isRequired,
  restaurants: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.object
    )
  ).isRequired,
  delVoteResult: PropTypes.objectOf(PropTypes.bool).isRequired,
  vote: PropTypes.objectOf(PropTypes.string).isRequired,
  maxDate: PropTypes.string.isRequired,
};

const mstp = ({ getManyPlacesList, delVote }) => ({
  restaurants: getManyPlacesList.result,
  delVoteResult: delVote.result
});

const mdtp = dispatch => bindActionCreators({
  getPlacesList,
  onTopAlert,
  offTopAlert,
  deleteAVote,
  getUsersVotes
}, dispatch);

export default connect(mstp, mdtp)(VoteCollapser);
