import React, { Component } from 'react';

import { connect } from 'react-redux';

import {Container} from 'reactstrap'

import VoteCollapser from '../components/VoteCollapser'

import { getUsersVotes } from '../actions/getUsersVotes'

class GetUsersVotes extends Component {

    componentDidMount() {
        const pseudo = localStorage.getItem('pseudo')
        this.props.dispatch(getUsersVotes(pseudo))

    }

    render() { 

        const {usersVotes} = this.props
        
        return ( 
        <Container fluid className="GetUserVotes">
            {
                usersVotes.map(vote => 
                    <VoteCollapser 
                        key={vote.id}
                        vote={vote}
                    />                    
                )
            }
        </Container> 
        );
    }
}

const mstp = ({ usersVotes }) => ({
    usersVotes: usersVotes
});

export default connect(mstp)(GetUsersVotes);