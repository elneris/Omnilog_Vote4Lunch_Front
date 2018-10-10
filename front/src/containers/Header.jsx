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
  Button
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import Link from 'react-router-dom/Link';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {

    const { vote_pseudo } = this.props

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
        <Navbar dark expand="md" className="bg-blue">
          <NavbarBrand href="/">Vote 4 Lunch</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {pseudo ?
                <NavItem className="mr-3 pt-2">
                  <NavLink>
                    Bonjour, {pseudo}
                  </NavLink>
                </NavItem> : ''}
              {pseudo ?
                <NavItem>
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
      </div>
    );
  }
}

const mstp = ({ voteData }) => ({
  vote_id: voteData.id,
  vote_pseudo: voteData.pseudo,
})

export default connect(mstp)(Header);