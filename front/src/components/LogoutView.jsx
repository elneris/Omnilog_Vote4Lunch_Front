import React from 'react';

import { Redirect } from 'react-router-dom'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {saveVoteData, createAVoteDelete} from '../actions'

const LogoutView = ({saveVoteData, createAVoteDelete}) => {

    localStorage.removeItem('pseudo');
    localStorage.removeItem('email');
    saveVoteData('',null,'','','');
    createAVoteDelete();
    return (
        <Redirect to='/' />
    );
}

const mdtp = (dispatch) => {
    return bindActionCreators({ saveVoteData, createAVoteDelete }, dispatch);
}

export default connect(null, mdtp)(LogoutView);