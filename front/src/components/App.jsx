import React from 'react';

import { Container, Row, Col } from 'reactstrap'

import PlaceMap from '../containers/PlaceMap'

const App = () => {

    return ( 
        <Container fluid>
            <Row className="justify-content-center align-items-center">
                <Col
                    xs="8"
                    className="FormBlock p-4 text-center"
                >
                    <PlaceMap/>
                </Col>
            </Row>
        </Container>
     );
}
 
export default App;