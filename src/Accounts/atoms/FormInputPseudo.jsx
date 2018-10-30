import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { FormGroup, Label, Input } from 'reactstrap';

import { FormInputPseudo } from '../actions';

const Pseudo = ({ pseudo, FormInputPseudo: FormInputPseudoAction }) => (
  <FormGroup>
    <Label className="text-white" for="pseudo">Indique ton pseudo</Label>
    <Input
      type="text"
      name="pseudo"
      id="pseudo"
      value={pseudo}
      onChange={e => FormInputPseudoAction(e.target.value)}
      required
    />
  </FormGroup>
);

Pseudo.propTypes = {
  pseudo: PropTypes.string.isRequired,
  FormInputPseudo: PropTypes.func.isRequired,
};

const mstp = ({ voteDataForm }) => ({
  pseudo: voteDataForm.pseudo,
});

const mdtp = dispatch => bindActionCreators({ FormInputPseudo }, dispatch);

export default connect(mstp, mdtp)(Pseudo);
