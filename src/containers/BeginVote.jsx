import React, {Component} from 'react';
import {connect} from 'react-redux'

import { Container, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom';

import {updateUserData} from '../actions'

class BeginVote extends Component {

    componentDidMount() {
        const pseudo = localStorage.getItem('pseudo')
        const email = localStorage.getItem('email')

        if (pseudo && email) {
            this.props.dispatch(updateUserData(pseudo, email))
        }
    }

    render() { 
        return ( 
            <Container fluid className="BeginVote">
            <Row noGutters className="justify-content-center align-items-center h-100">
                <Col
                    xs="12"
                    md="4"
                    className="bg-blue p-5 text-center rounded"
                >
                <p className="text-white">Fait voter tes collègues pour le déjeuner</p>
                    <Button tag={Link} to="/create-a-vote" color="success">Organiser un vote</Button>
                </Col>
            </Row>
        </Container>
         );
    }
}
 
export default connect()(BeginVote);