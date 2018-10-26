import React, { Component } from 'react';

import { Collapse, Row, Col } from 'reactstrap';

import { ButtonCollapser, Title5 } from '../../Core';

class UsersVoices extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div className="UsersVoices">
        <Row noGutters>
          <Col xs="1">
            <p className="pl-3">
              <ButtonCollapser
                toggle={this.toggle}
                collapse={this.state.collapse}
              />
            </p>
          </Col>
          <Col xs="11">
            <Title5
              content="Qui a voté pour ce restaurant ?"
              color="white"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Collapse isOpen={this.state.collapse}>
              <p>pop</p>
            </Collapse>
          </Col>
        </Row>

      </div>
    );
  }
}

export default UsersVoices;
