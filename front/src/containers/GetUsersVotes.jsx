import React, { Component } from 'react';

import { connect } from 'react-redux';

import {Container} from 'reactstrap'

import VoteCollapser from '../containers/VoteCollapser'

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
                usersVotes.map(vote => {
                    if (vote.active) {
                        return <VoteCollapser 
                            key={vote.id}
                            vote={vote}
                        />
                    } else { return ""}
                })
            }
        </Container> 
        );
    }
}

const mstp = ({ usersVotes }) => ({
    usersVotes: usersVotes
});

export default connect(mstp)(GetUsersVotes);