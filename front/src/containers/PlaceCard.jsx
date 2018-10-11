import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap'

import axios from 'axios'

import { getVoiceCount } from '../actions/getVoiceCount'
import { addVoice } from '../actions/addVoice'

import MaterialIcon from 'material-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { faSmileBeam } from '@fortawesome/free-regular-svg-icons'

class PlaceCard extends Component {

    constructor() {
        super()
        this.getVoteId = this.getVoteId.bind(this)

        this.state = {
            vote_id:''
        }
    }

    componentDidMount() {
        this.props.dispatch(getVoiceCount(this.props.vote_url, this.props.restaurant.id))
        this.getVoteId()
    }

    async getVoteId() {
        const vote_id = await axios
            .get(`/api/vote/get?vote_url=${this.props.vote_url}`)
            .then( result => result.data.id)

        await this.setState({
            vote_id: vote_id
        })
    }

    render() {

        const { restaurant, voiceCount } = this.props
        
        let filteredVoiceCountValue = { count: 0, place: restaurant.id }        

        if (voiceCount.length > 0) {

            const filteredVoiceCount = voiceCount.filter(element => element.place === restaurant.id && element.vote_id === this.state.vote_id);

            if (filteredVoiceCount.length !== 0) {
                filteredVoiceCountValue = filteredVoiceCount[0]
            }
        }

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
                        <CardText>Votes : { filteredVoiceCountValue.count }</CardText>
                        <Button onClick={()=> this.props.dispatch(addVoice(this.props.vote_url, this.props.restaurant.id)) }color='success'>Je vote pour ! <FontAwesomeIcon icon={faSmileBeam} /></Button>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

const mstp = ({ getVoicesCount }) => ({
    voiceCount: getVoicesCount,
});

export default connect(mstp)(PlaceCard);