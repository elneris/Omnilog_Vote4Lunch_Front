import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Container } from 'reactstrap';

import VoteCollapser from '../containers/VoteCollapser';

import { getUsersVotes } from '../actions/getUsersVotes';

class GetUsersVotes extends Component {
  constructor() {
    super();
    this.getMaxDate = this.getMaxDate.bind(this);
  }

  componentDidMount() {
    const pseudo = localStorage.getItem('pseudo');
    this.props.dispatch(getUsersVotes(pseudo));
  }

  getMaxDate(data) {
    return data[data.length-1].date;
  }

  render() {
    const { usersVotes } = this.props;
    let maxDate;
    if (usersVotes.length > 0) {
      maxDate = this.getMaxDate(usersVotes);
    }    

    return (
      <Container fluid className="GetUserVotes">
        {
          usersVotes.map((vote) => {
            let maxDateValue = false;
            if (vote.date === maxDate) {
              maxDateValue = true;
            }
            if (vote.active) {
              return <VoteCollapser
                key={vote.id}
                vote={vote}
                maxDate={maxDateValue}

              />;
            }
            return '';
          })
        }
      </Container>
    );
  }
}

const mstp = ({ usersVotes }) => ({
  usersVotes,
});

export default connect(mstp)(GetUsersVotes);
