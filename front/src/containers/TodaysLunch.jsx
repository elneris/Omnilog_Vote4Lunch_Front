import React, { Component } from 'react';
import {
    Row, Col, Card, CardText, CardBody,
    CardHeader } from 'reactstrap';

class TodaysLunch extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Row
                className="justify-content-center align-items-center p-1"
            >
                <Col
                    xs="10"
                >
                    <Card>
                    <CardHeader>{this.props.place}</CardHeader>
                        <CardBody>
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