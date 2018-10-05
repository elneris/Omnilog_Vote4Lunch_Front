import React from 'react';

import { Container, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const BeginVote = () => {
    return ( 
        <Container  fluid className="stepContainer">
            <Row noGutters className="justify-content-center align-items-center h-100">
                <Col
                    xs="4" 
                    className="bg-blue p-5 text-center rounded"
                >
                <p className="text-white">Faites voter vos collègues pour le déjeuner</p>
                    <Button tag={Link} to="/begin-vote" color="success">Organiser un vote <FontAwesomeIcon icon={faPlus} /></Button>
                </Col>
            </Row>
        </Container>
     );
}
 
export default BeginVote;