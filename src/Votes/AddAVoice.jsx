import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

import { Container, Row, Col, ButtonGroup, Button, Tooltip } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getPlacesList } from '../actions/getPlacesList';
import { getUserVoices } from '../actions/getUserVoices';
import { getAVote } from '../actions/getAVote';

import PlaceCard from '../containers/PlaceCard';
import VoteMap from '../containers/VoteMap';
import { LoginModal } from '../Accounts/organisms';
import { UsersVoices } from './';

import MailToButton from './atoms/MailToButton';
// import EndDate from './atoms/Button/EndDate';

class AddAVoice extends Component {
  constructor(props) {
    super(props);
    const { url } = this.props.match.params;
    const pseudo = localStorage.getItem('pseudo');
    const email = localStorage.getItem('email');

    // open a modal if user is not connected. User must give a pseudo and email to vote.
    let openLoginModal = false;
    if (!pseudo || !email) {
      openLoginModal = true;
    } else {
      this.props.getUserVoices(pseudo, email, [url]);
    }

    this.state = {
      openLoginModal,
      tooltipOpen: false,
    };

    this.toggleTooltip = this.toggleTooltip.bind(this);
  }

  componentDidMount() {
    const { url } = this.props.match.params;
    this.props.getPlacesList(url);
  }

  componentDidUpdate() {
    const { url } = this.props.match.params;
    if (this.props.getAVoteUrl !== url) {
      this.props.getAVote(url);
    }
  }

  toggleTooltip() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    const { restaurants } = this.props;
    const { url } = this.props.match.params;
    // filter the list of restaurants with url parameter to display only one
    let listOfRestaurants;
    if (restaurants[url]) {
      listOfRestaurants = restaurants[url];
    } else {
      listOfRestaurants = [];
    }

    return (

      <Container fluid className="AddVoice">
        <Row className="justify-content-center">
          <Col
            className="bg-blue round-corners p-3"
            xs="12"
            lg="8"
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
            <MailToButton />
            {/* <EndDate /> */}
          </Col>
        </Row >
        <Row className="justify-content-center pt-3">

          {listOfRestaurants.map(restaurant => (
            <PlaceCard
              key={restaurant.id}
              restaurant={restaurant}
              vote_url={url}
            />
          ))}
        </Row>
        <Row className="justify-content-center">
          <Col
            className="bg-blue round-corners mt-3 p-1"
            xs="12"
            lg="8"
          >
            <UsersVoices
              voteUrl={url}
            />
          </Col>
        </Row >
        <Row
          className="justify-content-center align-items-center"
          noGutters
        >
          <Col
            xs="12"
            lg="8"
          >
            <VoteMap restaurants={listOfRestaurants} />
          </Col>
        </Row>
        {this.state.openLoginModal ? <LoginModal open voteUrl={url} /> : ''}
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
  getPlacesList: PropTypes.func.isRequired,
  getAVote: PropTypes.func.isRequired,
  getUserVoices: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      url: PropTypes.string.isRequired
    })
  }).isRequired,
  restaurants: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.object
    )
  ).isRequired,
  getAVoteUrl: PropTypes.string.isRequired,
};

const mstp = ({ getPlacesList: gPL, getAVote: gAV }) => ({
  restaurants: gPL.result,
  getAVoteUrl: gAV.url,
});

const mdtp = dispatch => bindActionCreators({ getAVote, getPlacesList, getUserVoices }, dispatch);

export default connect(mstp, mdtp)(AddAVoice);
