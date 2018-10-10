import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPlacesList } from '../actions/getPlacesList';

import { Container, Row, Col } from 'reactstrap';

import PlaceCard from './PlaceCard';
import VoteMap from './VoteMap';

class AddAVoice extends Component {

    componentDidMount() {
        this.props.dispatch(getPlacesList(this.props.match.params.url))
    }

    render() {
        const { restaurants, hasVoted } = this.props

        return (

            <Container fluid className="stepContainer">

                <Row className="justify-content-center align-items-center">

                    {restaurants.map(restaurant => (
                        <PlaceCard
                            key={restaurant.id}
                            restaurant={restaurant}
                            vote_url={this.props.match.params.url}
                        />
                    ))}
                </Row>
                <Row
                    className="justify-content-center align-items-center"
                    noGutters
                >
                    <Col
                        xs="8"

                    >
                        <VoteMap restaurants={restaurants} />
                    </Col>
                </Row>
            </Container>


        );
    }
}

const mstp = ({ getPlacesList, addVoice }) => ({
    restaurants: getPlacesList.result,
    hasVoted: addVoice.result
});

export default connect(mstp)(AddAVoice);
