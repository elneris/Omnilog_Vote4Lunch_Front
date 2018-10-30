import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { FormGroup, Label, Input } from 'reactstrap';

import { formInputDate } from '../actions';

const Date = ({ date, formInputDate: formInputDateFunc }) => (
  <FormGroup>
    <Label className="text-white" for="date">Choisis la date du repas</Label>
    <Input
      type="date"
      name="date"
      id="date"
      value={date}
      onChange={e => formInputDateFunc(e.target.value)}
      required
    />
  </FormGroup>
);

Date.propTypes = {
  date: PropTypes.string.isRequired,
  formInputDate: PropTypes.func.isRequired,
};

const mstp = ({ voteDataForm }) => ({
  date: voteDataForm.date,
});

const mdtp = dispatch => bindActionCreators({ formInputDate }, dispatch);

export default connect(mstp, mdtp)(Date);
