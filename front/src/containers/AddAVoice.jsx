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
        const { restaurants } = this.props

        let listOfRestaurants
        
        if(restaurants[this.props.match.params.url]) {
            listOfRestaurants = restaurants[this.props.match.params.url]
        } else {
            listOfRestaurants = []
        }

        return (

            <Container fluid className="stepContainer">

                <Row className="justify-content-center align-items-center mt-3">

                    {listOfRestaurants.map(restaurant => (
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
                        <VoteMap restaurants={listOfRestaurants} />
                    </Col>
                </Row>
            </Container>


        );
    }
}

const mstp = ({ getPlacesList }) => ({
    restaurants: getPlacesList.result,
});

export default connect(mstp)(AddAVoice);
