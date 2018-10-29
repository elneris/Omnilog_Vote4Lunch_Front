import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { FormGroup, Label, Input } from 'reactstrap';

import { FormInputEmail } from '../actions';

const Email = ({ email, FormInputEmail: FormInputEmailAction }) => (
  <FormGroup>
    <Label className="text-white" for="email">Indique ton email</Label>
    <Input
      type="email"
      name="email"
      id="email"
      value={email}
      onChange={e => FormInputEmailAction(e.target.value)}
      required
    />
  </FormGroup>
);

Email.propTypes = {
  email: PropTypes.string.isRequired,
  FormInputEmail: PropTypes.func.isRequired,
};

const mstp = ({ voteDataForm }) => ({
  email: voteDataForm.email,
});

const mdtp = dispatch => bindActionCreators({ FormInputEmail }, dispatch);

export default connect(mstp, mdtp)(Email);
