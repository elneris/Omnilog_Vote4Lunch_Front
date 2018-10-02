import React from 'react';

import { Container, Row, Col } from 'reactstrap'

import PlaceMap from '../containers/PlaceMap'

const App = () => {

    return ( 
        <Container fluid>
            <Row  noGutters className="justify-content-center align-items-center">
                <Col
                    xs="8"
                    
                >
                    <PlaceMap/>
                </Col>
                <Col 
                    xs="4"
                    className="FormBlock text-center"
                >
                </Col>
            </Row>
        </Container>
     );
}
 
export default App;