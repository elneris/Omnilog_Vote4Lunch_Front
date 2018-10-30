import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { FormGroup, Label, Input } from 'reactstrap';

import { formInputPseudo } from '../actions';

const Pseudo = ({ pseudo, formInputPseudo: formInputPseudoAction }) => (
  <FormGroup>
    <Label className="text-white" for="pseudo">Indique ton pseudo</Label>
    <Input
      type="text"
      name="pseudo"
      id="pseudo"
      value={pseudo}
      onChange={e => formInputPseudoAction(e.target.value)}
      required
    />
  </FormGroup>
);

Pseudo.propTypes = {
  pseudo: PropTypes.string.isRequired,
  formInputPseudo: PropTypes.func.isRequired,
};

const mstp = ({ voteDataForm }) => ({
  pseudo: voteDataForm.pseudo,
});

const mdtp = dispatch => bindActionCreators({ formInputPseudo }, dispatch);

export default connect(mstp, mdtp)(Pseudo);
