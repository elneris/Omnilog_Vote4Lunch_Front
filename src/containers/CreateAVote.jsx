import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Container, Row, Col, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';

import { createAVote } from '../actions/createAVote';
import { saveVoteData } from '../actions';

import Pseudo from './atoms/FormInput/Pseudo';
import Email from './atoms/FormInput/Email';
import Date from './atoms/FormInput/Date';
import EndDate from './atoms/FormInput/EndDate'

class CreateAVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      endDate: null,
      endTime: null,
      focused: null,
      pseudo: '',
      email: ''
    };
  }

  componentDidMount() {
    const getPseudo = localStorage.getItem('pseudo');
    const getEmail = localStorage.getItem('email');
    if (getPseudo && getEmail) {
      this.setState({
        pseudo: getPseudo,
        email: getEmail,
      });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDateChange(date) {
    this.setState({
      date,
    });
  }

  submitForm(e) {
    e.preventDefault();
    this.props.createAVote(
      this.state.pseudo,
      this.state.email,
      this.state.date,
      this.state.endDate,
      this.state.endTime);
  }

  render() {
    let rendering = "C'est bon, je suis prêt";

    const { result, error, loading } = this.props;
    if (result !== '' && result.createdAt) {
      this.props.saveVoteData(result.id, result.date, result.pseudo, result.email, result.url);
      localStorage.setItem('pseudo', result.pseudo);
      localStorage.setItem('email', result.email);
      return <Redirect to="/add-place" />;
    } else if (loading) {
      rendering = <FontAwesomeIcon icon={faSpinner} spin />;
    } else if (error) {
      console.log(error);
    }

    return (
      <Container fluid className="CreateAVote">
        <Row noGutters className="justify-content-center align-items-center h-100">
          <Col
            xs="12"
            sm="8"
            md="6"
            xl="4"
            className="bg-blue p-5 rounded"
          >
            <Form onSubmit={e => this.submitForm(e)}>
              <Date />
              <EndDate />
              <Pseudo />
              <Email />
              <div className="text-center mt-5">
                <Button color="success">{rendering}</Button>
              </div>

            </Form>
          </Col>

        </Row>
      </Container>);
  }
}

const mstp = ({ vote }) => ({
  result: vote.result,
  error: vote.error,
  loading: vote.loading
});

const mdtp = dispatch => bindActionCreators({ createAVote, saveVoteData }, dispatch);

CreateAVote.propTypes = {
  dispatch: PropTypes.func,
  createAVote: PropTypes.func,
  result: PropTypes.any,
  error: PropTypes.any,
  loading: PropTypes.any,
  saveVoteData: PropTypes.any,
};

export default connect(mstp, mdtp)(CreateAVote);
