import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Container, Row, Col, Button, Form } from 'reactstrap';

import moment from 'moment';
import 'moment/locale/fr';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { FormInputPseudo, FormInputEmail } from '../../Accounts';
import { FormInputDate, FormInputEndDate } from '../../Core';

import { onTopAlert, offTopAlert } from '../../Core/actions';
import { createAVote, saveVoteData } from '../actions';

moment.locale('fr');

class CreateAVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledButton: false,
    };
    this.toggleButton = this.toggleButton.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      date,
      endDate,
      endTime,
      onTopAlert: onTA,
      offTopAlert: offTA,
    } = this.props;

    if (date !== '' && endDate !== '' && (date !== prevProps.date || endDate !== prevProps.endDate || endTime !== prevProps.endTime)) {
      if (moment(date).isBefore(moment(endDate))) {
        this.toggleButton(true);
        onTA('danger', 'La date de fin du vote ne peut pas être supérieure à la date du repas');
        setTimeout(() => { offTA(); }, 5000);
      } else if (moment(date).isBefore(moment(), 'day')) {
        onTA('warning', "Ca c'était avant, un peu tard pour programmer un déjeuner ;-) !");
        setTimeout(() => { offTA(); }, 5000);
      } else if (endDate !== '' && endTime !== '' && (moment(`${endDate} ${endTime}`).isBefore(moment()))) {
        onTA('warning', 'Ca va être compliqué de voter, la fin du vote est passée !');
        setTimeout(() => { offTA(); }, 5000);
      } else if (this.state.disabledButton === true) {
        this.toggleButton(false);
      }
    }
  }

  toggleButton(value) {
    this.setState({
      disabledButton: value,
    });
  }

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

    const { disabledButton } = this.state;

    const {
      result,
      error,
      loading,
      onTopAlert: onTA,
      offTopAlert: offTA
    } = this.props;

    if (result !== '' && result.createdAt) {
      this.props.saveVoteData(result.id, result.date, result.pseudo, result.email, result.url);
      localStorage.setItem('pseudo', result.pseudo);
      localStorage.setItem('email', result.email);
      return <Redirect to="/add-place" />;
    } else if (loading) {
      rendering = <FontAwesomeIcon icon={faSpinner} spin />;
    } else if (error) {
      onTA('danger', "Oups, quelque chose s'est mal passé");
      setTimeout(() => { offTA(); }, 3000);
    }

    return (
      <Container fluid className="CreateAVote">
        <Row noGutters className="justify-content-center align-items-center h-100">
          <Col
            xs="12"
            sm="8"
            md="6"
            className="bg-blue p-5 rounded"
          >
            <Form onSubmit={e => this.submitForm(e)}>
              <FormInputDate />
              <FormInputEndDate />
              <FormInputPseudo />
              <FormInputEmail />
              <div className="text-center mt-5">
                <Button disabled={disabledButton} color="success">{rendering}</Button>
              </div>

            </Form>
          </Col>

        </Row>
      </Container>);
  }
}

CreateAVote.propTypes = {
  createAVote: PropTypes.func.isRequired,
  onTopAlert: PropTypes.func.isRequired,
  offTopAlert: PropTypes.func.isRequired,
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

const mdtp = dispatch => bindActionCreators({
  createAVote,
  saveVoteData,
  onTopAlert,
  offTopAlert
}, dispatch);

export default connect(mstp, mdtp)(CreateAVote);
