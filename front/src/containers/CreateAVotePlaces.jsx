import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, ListGroup } from 'reactstrap'

import Place from '../components/Place'

class CreateAVotePlaces extends Component {

    render() {

        const{ voteData } = this.props
        
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
                            />
                        ))
                    }
                    </ListGroup>
                </Col>
            </Row>
        );
    }
}

const mstp = ({ voteData }) => ({
    voteData: voteData
});

export default connect(mstp)(CreateAVotePlaces);

