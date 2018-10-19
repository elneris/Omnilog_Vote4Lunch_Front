import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row, Col, Collapse, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

import moment from 'moment';
import 'moment/locale/fr';

import PlaceCard from './PlaceCard';

import { getPlacesList } from '../actions/getPlacesList';
import { deleteAVote } from '../actions/deleteAVote';
import { onTopAlert, offTopAlert } from '../actions';
import { getUsersVotes } from '../actions/getUsersVotes';

class VoteCollapser extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  componentDidMount() {
    this.props.dispatch(getPlacesList(this.props.vote.url));
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { vote, restaurants, maxDate, delVoteResult } = this.props;

    moment.locale('fr');

    const dateVote = moment(vote.date).format('dddd D MMMM YYYY');
    let listOfRestaurants = [];
    const myRestaurants = restaurants.find(obj => obj.hasOwnProperty(vote.url));

    if (myRestaurants) {
      listOfRestaurants = myRestaurants[vote.url];
    }

    let classNameForRow = 'VoteCollapser pt-4';

    if (maxDate) {
      classNameForRow = 'VoteCollapser py-4';
    }

    const voteDetailUrl = `/vote/${vote.url}`;

    if (delVoteResult.delete === true) {
      this.props.dispatch(onTopAlert('success', 'Ce vote a bien été supprimé'));
      setTimeout(() => { this.props.dispatch(offTopAlert()); }, 3000);
      this.props.dispatch(getUsersVotes(vote.pseudo));
    }

    return (
      <Row className={classNameForRow} >
        <Col className="rounded bg-blue pt-2">
          <p className="text-white">
            <Button
              size='sm'
              color='info'
              onClick={this.toggle}
              className="mr-3"
            >
              <FontAwesomeIcon

                icon={this.state.collapse ? faAngleDown : faAngleRight}
              />
            </Button>
            {dateVote}
            <Button
              size='sm'
              color='info'
              tag={Link}
              to={voteDetailUrl}
              className="ml-3"
            >
              voir le détail
            </Button>
            <Button
              size='sm'
              color='danger'
              onClick={() => this.props.dispatch(deleteAVote(vote.url))}
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
                    vote_url={this.props.vote.url}
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

const mstp = ({ getManyPlacesList, delVote }) => ({
  restaurants: getManyPlacesList.result,
  delVoteResult: delVote.result

});

export default connect(mstp)(VoteCollapser);
