import React, { Component } from 'react';

import { Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap'

import MaterialIcon from 'material-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { faSmileBeam } from '@fortawesome/free-regular-svg-icons'

class PlaceCard extends Component {

    render() {

        const { restaurant } = this.props
        return (
            <Col
                xs='2'
            >
                <Card>
                    <Button
                        size='sm'
                        className='float-right'
                        color='info'
                    >
                        <FontAwesomeIcon icon={faInfo} />
                    </Button>
                    <CardBody className='text-center'>
                        <CardTitle>
                        {restaurant.type === 'restaurant' ? <MaterialIcon icon="restaurant" /> : <MaterialIcon icon="fastfood" />} {restaurant.name}
                        </CardTitle>
                        <CardText>Votes</CardText>
                        <Button color='success'>Je vote pour ! <FontAwesomeIcon icon={faSmileBeam} /></Button>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default PlaceCard;