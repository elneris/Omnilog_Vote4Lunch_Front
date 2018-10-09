import React, { Component } from 'react';
import { connect } from 'react-redux'

import { getPlacesList } from '../actions/getPlacesList'

import { Container, Row } from 'reactstrap'

import PlaceCard from './PlaceCard';

class AddAVoice extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.dispatch(getPlacesList(this.props.match.params.url))
    }

    render() {
        const { restaurants } = this.props
        console.log(restaurants);

        return (
            <Container fluid className="stepContainer">
                <Row className="justify-content-center align-items-center h-100">
                    {restaurants.map(restaurant => (
                        <PlaceCard
                            key={restaurant.id}
                            restaurant={restaurant}
                        />
                    ))}

                </Row>
            </Container>
        );
    }
}

const mstp = ({ getPlacesList }) => ({
    restaurants: getPlacesList.result,
});

export default connect(mstp)(AddAVoice);
