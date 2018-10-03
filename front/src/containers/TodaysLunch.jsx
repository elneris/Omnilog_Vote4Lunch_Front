import React, { Component } from 'react';
import {
    Row, Col, Card, CardText, CardBody,
    CardTitle } from 'reactstrap';

class TodaysLunch extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Row
                className="justify-content-center align-items-center p-5"
            >
                <Col
                    xs="10"
                >
                    <Card>

                        <CardBody>
                            <CardTitle>{this.props.place}</CardTitle>
                            <CardText>créé par : {this.props.username}</CardText>
                            <CardText>votes : {this.props.vote}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default TodaysLunch;