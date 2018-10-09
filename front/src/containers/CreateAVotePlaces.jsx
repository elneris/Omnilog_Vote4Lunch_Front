import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, ListGroup, Button } from 'reactstrap'
import { Link } from 'react-router-dom';

import Place from '../components/Place'

class CreateAVotePlaces extends Component {

    render() {

        const{ voteData } = this.props
        let disabled_button = true
        if (voteData.places.length >= 2) {
            disabled_button = false
        }
        
        return (
            <Row className="pb-3 px-2">
                <Col>
                    <h5 className='text-white'>Maintenant { voteData.pseudo }, ajoute des restaurants</h5>
                    <ListGroup>
                    {
                        this.props.voteData.places.map(place => (
                            <Place
                                key={place.id}
                                id={place.id}
                                place={place.name}
                                type={place.type}
                            />
                        ))
                    }
                    </ListGroup>
                    <Button
                        color='success'
                        disabled = { disabled_button }
                        className = "mt-4"
                        tag={Link} 
                        to={ "/vote/" + voteData.url }
                    >Créer le vote</Button>
                </Col>
            </Row>
        );
    }
}

const mstp = ({ voteData }) => ({
    voteData: voteData
});

export default connect(mstp)(CreateAVotePlaces);

