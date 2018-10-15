import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Tooltip,
} from 'reactstrap';

import MaterialIcon from 'material-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

import Link from 'react-router-dom/Link';

import TopAlert from './TopAlert'

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      tooltipOpen: false,
    };

    this.toggleHamburger = this.toggleHamburger.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);
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

  render() {

    const { vote } = this.props
    const vote_pseudo = vote.pseudo

    let pseudo = ''

    const get_pseudo = localStorage.getItem('pseudo')
    const get_email = localStorage.getItem('email')
    if (get_pseudo && get_email) {
      pseudo = get_pseudo
    } else {
      pseudo = vote_pseudo
    }

    return (
      <div>
        <TopAlert/>
        <Navbar dark expand="md" className="bg-blue">
          <NavbarBrand href="/">Vote 4 Lunch</NavbarBrand>
          <NavbarToggler onClick={this.toggleHamburger} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {pseudo ?
                <NavItem className="mr-3 pt-1">
                  <NavLink>
                    Bonjour, {pseudo}
                  </NavLink>
                </NavItem> : ''}
              {pseudo ?
                <NavItem className="mr-3">
                  <Button
                    tag={Link}
                    color='info'
                    to='/my-votes'
                    href="#"
                    id="TooltipMyVotes"
                  >
                    <MaterialIcon
                      icon="how_to_vote"
                      color="white"
                      size="tiny"
                    />
                  </Button>
                </NavItem>
                : ''
              }
              {pseudo ?
                <NavItem className="mr-3">
                  <Button
                    tag={Link}
                    color='danger'
                    to='/logout'
                  >
                    <FontAwesomeIcon icon={faPowerOff} />
                  </Button>
                </NavItem>
                : ''
              }
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
      </div>
    );
  }
}

const mstp = ({ voteData }) => ({
  vote: voteData,
})

export default connect(mstp)(Header);