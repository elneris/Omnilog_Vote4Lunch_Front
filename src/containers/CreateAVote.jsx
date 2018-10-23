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
              <FormGroup>
                <Label className="text-white" for="date">Choisis la date du repas</Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  value={this.state.date}
                  onChange={e => this.handleChange(e)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label className="text-white" for="datetime">Choisis la fin du vote</Label>
                <InputGroup>
                  <InputGroup>
                    <Input
                      type="date"
                      name="endDate"
                      id="endDate"
                      value={this.state.endDate}
                      onChange={e => this.handleChange(e)}
                      required
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <FontAwesomeIcon icon={faCalendar} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="time"
                      name="endTime"
                      id="endTime"
                      value={this.state.endTime}
                      onChange={e => this.handleChange(e)}
                      required
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <FontAwesomeIcon icon={faClock} />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup></InputGroup>
              </FormGroup>
              <FormGroup>
                <Label className="text-white" for="pseudo">Indique ton pseudo</Label>
                <Input
                  type="text"
                  name="pseudo"
                  id="pseudo"
                  value={this.state.pseudo}
                  onChange={e => this.handleChange(e)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label className="text-white" for="email">Indique ton email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={this.state.email}
                  onChange={e => this.handleChange(e)}
                  required
                />
              </FormGroup>
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
