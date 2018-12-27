import React from 'react';

import PropTypes from 'prop-types';

import {
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

const InputGroupAppend = ({ wrappedElement }) => (
  <InputGroupAddon addonType="append">
    <InputGroupText>
      {wrappedElement}
    </InputGroupText>
  </InputGroupAddon>
);

InputGroupAppend.propTypes = {
  wrappedElement: PropTypes.element,
};

export default InputGroupAppend;
