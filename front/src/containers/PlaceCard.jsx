import React, { Component } from 'react';

import { Col, Card, CardBody, CardTitle, CardText, Button, ButtonGroup } from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faInfo } from '@fortawesome/free-solid-svg-icons'

class PlaceCard extends Component {
    constructor(props) {
        super(props);
    }

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
                        <CardTitle>{restaurant.name}

                        </CardTitle>
                        <CardText>Votes</CardText>
                        <ButtonGroup>
                            <Button color='danger'><FontAwesomeIcon icon={faMinus} /></Button>
                            <Button color='success'><FontAwesomeIcon icon={faPlus} /></Button>
                        </ButtonGroup>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default PlaceCard;