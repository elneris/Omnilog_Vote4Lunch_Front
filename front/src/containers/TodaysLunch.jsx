import React, { Component } from 'react';
import {
    Row, Col, Card, CardText, CardBody,
    CardHeader, Button, ButtonGroup
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchUpVote } from '../actions';
import { fetchTodaysLunchs } from '../actions/todayslunchs';

class TodaysLunch extends Component {

    render() {
        const { fetchUpVote, upvote, fetchTodaysLunchs } = this.props
        
        if (upvote.completed && upvote.vote_id ===this.props.id) {
            fetchTodaysLunchs()
        }

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
                            <ButtonGroup>
                                <Button><FontAwesomeIcon icon={faMinus} /></Button>
                                <Button onClick={() => fetchUpVote(this.props.id)}><FontAwesomeIcon icon={faPlus} /></Button>
                            </ButtonGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

const mstp = ({ upvote }) => ({
    upvote: upvote
});

const mdtp = (dispatch) => {
    return bindActionCreators({ fetchUpVote, fetchTodaysLunchs }, dispatch);
}

export default connect(mstp, mdtp)(TodaysLunch);