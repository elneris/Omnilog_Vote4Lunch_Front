import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Container, Row, Col, Button, Form } from 'reactstrap';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { FormInputPseudo, FormInputEmail } from '../../Accounts';
import { FormInputDate, FormInputEndDate } from '../../Core';

import { createAVote, saveVoteData } from '../actions';

class CreateAVote extends Component {
  submitForm(e) {
    const { pseudo, email, date, endDate, endTime } = this.props;
    e.preventDefault();
    this.props.createAVote(
      pseudo,
      email,
      date,
      endDate,
      endTime);
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
              <FormInputDate />
              <FormInputEndDate />
              <FormInputPseudo />
              <FormInputEmail />
              <div className="text-center mt-5">
                <Button color="success">{rendering}</Button>
              </div>

            </Form>
          </Col>

        </Row>
      </Container>);
  }
}

CreateAVote.propTypes = {
  createAVote: PropTypes.func.isRequired,
  result: PropTypes.objectOf(PropTypes.object),
  error: PropTypes.objectOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  saveVoteData: PropTypes.func.isRequired,
  pseudo: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
};

const mstp = ({ vote, voteDataForm }) => ({
  result: vote.result,
  error: vote.error,
  loading: vote.loading,
  pseudo: voteDataForm.pseudo,
  email: voteDataForm.email,
  date: voteDataForm.date,
  endDate: voteDataForm.endDate,
  endTime: voteDataForm.endTime,
});

const mdtp = dispatch => bindActionCreators({ createAVote, saveVoteData }, dispatch);

export default connect(mstp, mdtp)(CreateAVote);
