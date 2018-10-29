import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Collapse, Row, Col } from 'reactstrap';

import { ButtonCollapser, Title5 } from '../../Core';

import { UsersVoicesTable } from '../molecules';

import { getAllVoicesForAVote } from '../actions';

class UsersVoices extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  componentDidMount() {
    const { voteUrl, getAllVoicesForAVote: getAll } = this.props;

    getAll(voteUrl);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { voteUrl } = this.props;

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
        <Row className="justify-content-center align-items-center">
          <Col
            xs="10"
          >
            <Collapse isOpen={this.state.collapse}>
              <UsersVoicesTable
                voteUrl={voteUrl}
              />
            </Collapse>
          </Col>
        </Row>

      </div>
    );
  }
}

UsersVoices.propTypes = {
  getAllVoicesForAVote: PropTypes.func.isRequired,
  voteUrl: PropTypes.string.isRequired,
};

const mdtp = dispatch => bindActionCreators({ getAllVoicesForAVote }, dispatch);

export default connect(null, mdtp)(UsersVoices);
