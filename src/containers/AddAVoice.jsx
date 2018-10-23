import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

import PropTypes from 'prop-types'; 

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPlacesList } from '../actions/getPlacesList';
import { getUserVoices } from '../actions/getUserVoices';

import { Container, Row, Col, ButtonGroup, Button, Tooltip } from 'reactstrap';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import PlaceCard from './PlaceCard';
import VoteMap from './VoteMap';
import LoginModal from './LoginModal';

import MailToButton from '../components/molecules/MailToButton';

class AddAVoice extends Component {
  constructor() {
    super();

    this.state = {
      openLoginModal: false,
      tooltipOpen: false,
    };

    this.toggleTooltip = this.toggleTooltip.bind(this);

  }

  componentDidMount() {
    this.props.dispatch(getPlacesList(this.props.match.params.url));
    // open a modal if user is not connected. User must give a pseudo and email to vote.
    const pseudo = localStorage.getItem('pseudo');
    const email = localStorage.getItem('email');

    if (!pseudo || !email) {
      this.setState({
        openLoginModal: true
      });
    } else {
      this.setState({
        openLoginModal: false
      });
      this.props.dispatch(getUserVoices(pseudo,email,[this.props.match.params.url]))
    }
  }

  toggleTooltip() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    const { restaurants } = this.props;

    // filter the list of restaurants with url parameter to display only one
    let listOfRestaurants;
    if (restaurants[this.props.match.params.url]) {
      listOfRestaurants = restaurants[this.props.match.params.url];
    } else {
      listOfRestaurants = [];
    }

    return (

      <Container fluid className="AddVoice">
        <Row className="justify-content-center">
          <Col
            className="bg-blue round-corners p-3"
            xs="12"
            lg='8'
          >
            <ButtonGroup
              className="mr-3"
            >
              <Button
                disabled
              >
                {window.location.href}
              </Button>
              <CopyToClipboard text={window.location.href}>
                <Button
                  color="info"
                  id="TooltipCopyToClipBoard"
                >
                  <FontAwesomeIcon icon={faClipboard} />
                </Button>
              </CopyToClipboard>
              
            </ButtonGroup>
            <MailToButton/>
          </Col>
        </Row >
        <Row className="justify-content-center pt-3">

          {listOfRestaurants.map(restaurant => (
            <PlaceCard
              key={restaurant.id}
              restaurant={restaurant}
              vote_url={this.props.match.params.url}
            />
          ))}
        </Row>
        <Row
          className="justify-content-center align-items-center"
          noGutters
        >
          <Col
            xs="12"
            lg='8'
          >
            <VoteMap restaurants={listOfRestaurants} />
          </Col>
        </Row>
        {this.state.openLoginModal ? <LoginModal open voteUrl={this.props.match.params.url} /> : ''}
        <Tooltip
          placement="bottom"
          isOpen={this.state.tooltipOpen}
          target="TooltipCopyToClipBoard"
          toggle={this.toggleTooltip}
        >
          Copier vers le presse-papiers
        </Tooltip>
      </Container >
    );
  }
}

AddAVoice.propTypes = { 
  dispatch: PropTypes.func,
  match: PropTypes.object,
  restaurants: PropTypes.object,
}

const mstp = ({ getPlacesList }) => ({
  restaurants: getPlacesList.result,
});

export default connect(mstp)(AddAVoice);
