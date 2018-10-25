import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { FormGroup, Label, Input } from 'reactstrap';

import { FormInputDate } from '../../../actions';

const Date = ({ date, FormInputDate: FormInputDateFunc }) => (
  <FormGroup>
    <Label className="text-white" for="date">Choisis la date du repas</Label>
    <Input
      type="date"
      name="date"
      id="date"
      value={date}
      onChange={e => FormInputDateFunc(e.target.value)}
      required
    />
  </FormGroup>
);

Date.propTypes = {
  date: PropTypes.string.isRequired,
  FormInputDate: PropTypes.func.isRequired,
};

const mstp = ({ voteDataForm }) => ({
  date: voteDataForm.date,
});

const mdtp = dispatch => bindActionCreators({ FormInputDate }, dispatch);

export default connect(mstp, mdtp)(Date);
