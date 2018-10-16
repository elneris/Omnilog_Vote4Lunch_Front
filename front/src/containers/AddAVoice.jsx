import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPlacesList } from '../actions/getPlacesList';

import { Container, Row, Col } from 'reactstrap';

import PlaceCard from './PlaceCard';
import VoteMap from './VoteMap';
import LoginModal from './LoginModal';

class AddAVoice extends Component {

    constructor() {
        super()

        this.state = {
            openLoginModal: false
        }
    } 

    componentDidMount() {
        this.props.dispatch(getPlacesList(this.props.match.params.url));
        const pseudo = localStorage.getItem('pseudo');
        const email = localStorage.getItem('email');

        if(!pseudo || !email) {
            this.setState({
                openLoginModal: true
            }) 
        } else {
            this.setState({
                openLoginModal: false
            })
        }
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

            <Container fluid className="AddVoice">

                <Row className="justify-content-center align-items-center pt-3">

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
                {this.state.openLoginModal ? <LoginModal open /> : ''}
            </Container>


        );
    }
}

const mstp = ({ getPlacesList }) => ({
    restaurants: getPlacesList.result,
});

export default connect(mstp)(AddAVoice);
