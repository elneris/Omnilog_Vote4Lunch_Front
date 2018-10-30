import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  ButtonGroup,
  Tooltip,
} from 'reactstrap';

import MaterialIcon from 'material-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

import Link from 'react-router-dom/Link';

import { LoginModal } from '../../Accounts';

import { TopAlert } from '../';
import { updateUserData } from '../../actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      tooltipOpen: false,
      openLoginModal: false,
    };

    this.toggleHamburger = this.toggleHamburger.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
  }

  componentDidMount() {
    const getPseudo = localStorage.getItem('pseudo');
    const getEmail = localStorage.getItem('email');
    if (getPseudo && getEmail) {
      updateUserData(getPseudo, getEmail);
    }
  }

  toggleHamburger() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleTooltip() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  openLoginModal() {
    this.setState({
      openLoginModal: true
    });
  }

  closeLoginModal() {
    this.setState({
      openLoginModal: false
    });
  }

  render() {
    const { voteData } = this.props;
    const votePseudo = voteData.pseudo;

    let pseudo = '';

    const getPseudo = localStorage.getItem('pseudo');
    const getEmail = localStorage.getItem('email');

    if (getPseudo && getEmail) {
      pseudo = getPseudo;
    } else {
      pseudo = votePseudo;
    }

    let renderBonjour;
    if (pseudo) {
      renderBonjour = (<NavItem className="mr-3 pt-1">
        <NavLink>
          Bonjour, {pseudo}
        </NavLink>
      </NavItem>);
    } else {
      renderBonjour =
        (<NavItem className="mr-3">
          <Button
            color="success"
            outline
            onClick={() => this.openLoginModal()}
          >
            {"S'identifier"}
          </Button>
        </NavItem>);
    }

    let renderButtonVote;
    let renderButtonLogout;
    if (pseudo) {
      if (window.innerWidth <= 768) {
        renderButtonVote =
          (<NavItem className="mr-3">
            <ButtonGroup>
              <Button
                tag={Link}
                color="info"
                to="/my-votes"
                href="#"
                id="TooltipMyVotes"
              >
                <MaterialIcon
                  icon="how_to_vote"
                  color="white"
                  size="tiny"
                />
              </Button>
              <Button
                tag={Link}
                color="danger"
                to="/logout"
                onClick={() => this.closeLoginModal()}
              >
                <FontAwesomeIcon icon={faPowerOff} />
              </Button>
            </ButtonGroup>
          </NavItem>);
        renderButtonLogout = '';
      } else {
        renderButtonVote =
          (<NavItem className="mr-3">
            <Button
              tag={Link}
              color="info"
              to="/my-votes"
              href="#"
              id="TooltipMyVotes"
            >
              <MaterialIcon
                icon="how_to_vote"
                color="white"
                size="tiny"
              />
            </Button>
          </NavItem>);
        renderButtonLogout =
          (<NavItem className="mr-3">
            <Button
              tag={Link}
              color="danger"
              to="/logout"
              onClick={() => this.closeLoginModal()}
            >
              <FontAwesomeIcon icon={faPowerOff} />
            </Button>
          </NavItem>);
      }
    } else {
      renderButtonVote = '';
      renderButtonLogout = '';
    }

    return (
      <div className="Header">
        <TopAlert />
        <Navbar dark expand="md" className="bg-blue">
          <NavbarBrand href="/">Vote 4 Lunch</NavbarBrand>
          <NavbarToggler onClick={this.toggleHamburger} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {renderBonjour}
              {renderButtonVote}
              {renderButtonLogout}
            </Nav>
          </Collapse>
        </Navbar>
        {pseudo ?
          <Tooltip
            placement="bottom"
            isOpen={this.state.tooltipOpen}
            target="TooltipMyVotes"
            toggle={this.toggleTooltip}
          >
            Accéder à mes votes
          </Tooltip>
          : ''}
        {this.state.openLoginModal ? <LoginModal open /> : ''}
      </div>
    );
  }
}

Header.propTypes = {
  voteData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    pseudo: PropTypes.string.isRequired,
  }).isRequired,
};

const mstp = ({ voteData }) => ({
  voteData,
});

const mdtp = dispatch => bindActionCreators({ updateUserData }, dispatch);

export default connect(mstp, mdtp)(Header);
