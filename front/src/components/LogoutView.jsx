import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux';

import {resetVoteData} from '../actions'

class LogoutView extends Component {

    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        localStorage.removeItem('pseudo');
        localStorage.removeItem('email');      
        this.props.dispatch(resetVoteData());
    }

    render() { 

        
        return ( <Redirect to='/' /> );
    }
}

export default connect()(LogoutView);
