import React from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom'

import { Container, Row, Col } from 'reactstrap'

import PlaceMap from '../containers/PlaceMap'
import CreateAVotePlaces from '../containers/CreateAVotePlaces';

const AddPlace = ({ voteData_id }) => {

    if (voteData_id === '') {
        return <Redirect to='/' />
    }

    return (
        <Container fluid className="stepContainer">
            <Row noGutters className="justify-content-center align-items-center h-100">
                <Col
                    xs="8"

                >
                    <PlaceMap />
                </Col>
                <Col
                    xs="4"
                    className="FormBlock text-center"
                >
                    <CreateAVotePlaces />
                </Col>
            </Row>
        </Container>
    );
}

const mstp = ({ voteData }) => ({
    voteData_id: voteData.id,
});

export default connect(mstp)(AddPlace);