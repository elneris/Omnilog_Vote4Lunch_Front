import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row, Col, Collapse, Button } from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom';

import moment from 'moment'
import 'moment/locale/fr'

import PlaceCard from './PlaceCard'

import { getPlacesList } from '../actions/getPlacesList';

class VoteCollapser extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    componentDidMount() {
        this.props.dispatch(getPlacesList(this.props.vote.url))
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {

        const { vote, restaurants } = this.props

        moment.locale('fr')

        const date_vote = moment(vote.date).format("dddd D MMMM YYYY")
        let listOfRestaurants = []
        const myRestaurants = restaurants.find(obj => obj.hasOwnProperty(vote.url))

        if (myRestaurants) {
            listOfRestaurants = myRestaurants[vote.url]
        }

        return (
            <Row className="VoteCollapser p-3" >
                <Col className="rounded bg-blue pt-2">
                    <p className="text-white">
                        <Button
                            size='sm'
                            color='info'
                            onClick={this.toggle}
                            className="mr-3"
                        >
                            <FontAwesomeIcon

                                icon={this.state.collapse ? faAngleDown : faAngleRight}
                            />
                        </Button>
                        {date_vote}
                        <Button
                            size='sm'
                            color='info'
                            tag={Link} to={'/vote/' + vote.url}
                            className="ml-3"
                        >
                        voir le détail
                        </Button>
                    </p>
                    <Collapse isOpen={this.state.collapse}>
                        <Row className="justify-content-center align-items-center pb-3">
                            {
                                listOfRestaurants.map(restaurant => (
                                    <PlaceCard
                                        key={restaurant.id}
                                        restaurant={restaurant}
                                        vote_url={this.props.vote.url}
                                    />
                                ))
                            }
                        </Row>
                    </Collapse>
                </Col>
            </Row>

        );
    }
}

const mstp = ({ getManyPlacesList }) => ({
    restaurants: getManyPlacesList.result
});

export default connect(mstp)(VoteCollapser);