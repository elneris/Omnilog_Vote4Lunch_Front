import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';

import { FormInputEndDate } from '../../actions';

const EndDate = ({ endDate, endTime, FormInputEndDate: FormInputEndDateFunc }) => (
  <FormGroup>
    <Label className="text-white" for="datetime">Choisis la fin du vote</Label>
    <InputGroup>
      <InputGroup>
        <Input
          type="date"
          name="endDate"
          id="endDate"
          value={endDate}
          onChange={e => FormInputEndDateFunc(e.target.value, endTime)}
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
          value={endTime}
          onChange={e => FormInputEndDateFunc(endDate, e.target.value)}
          required
        />
        <InputGroupAddon addonType="append">
          <InputGroupText>
            <FontAwesomeIcon icon={faClock} />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup></InputGroup>
  </FormGroup>
);

EndDate.propTypes = {
  endDate: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  FormInputEndDate: PropTypes.func.isRequired,
};

const mstp = ({ voteDataForm }) => ({
  endDate: voteDataForm.endDate,
  endTime: voteDataForm.endTime,
});

const mdtp = dispatch => bindActionCreators({ FormInputEndDate }, dispatch);

export default connect(mstp, mdtp)(EndDate);
