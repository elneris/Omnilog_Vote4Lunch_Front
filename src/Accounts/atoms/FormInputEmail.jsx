import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { FormGroup, Label, Input } from 'reactstrap';

import { formInputEmail } from '../actions';

const Email = ({ email, formInputEmail: formInputEmailAction }) => (
  <FormGroup>
    <Label className="text-white" for="email">Indique ton email</Label>
    <Input
      type="email"
      name="email"
      id="email"
      value={email}
      onChange={e => formInputEmailAction(e.target.value)}
      required
    />
  </FormGroup>
);

Email.propTypes = {
  email: PropTypes.string.isRequired,
  formInputEmail: PropTypes.func.isRequired,
};

const mstp = ({ voteDataForm }) => ({
  email: voteDataForm.email,
});

const mdtp = dispatch => bindActionCreators({ formInputEmail }, dispatch);

export default connect(mstp, mdtp)(Email);
