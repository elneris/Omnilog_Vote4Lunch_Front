import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap'

import { fetchTodaysLunchs } from '../actions/todayslunchs';

import TodaysLunch from './TodaysLunch'



class TodaysLunchs extends Component {

    componentDidMount() {
        this.props.dispatch(fetchTodaysLunchs());

    }

    render() {

        const{ voteData } = this.props
        
        return (
            <Row className="pb-3">
                <Col>
                    <h5 className='text-white'>Maintenant { voteData.pseudo }, ajoute des restaurants</h5>
                    {
                        this.props.todayslunchs.map(todayslunch => (
                            <TodaysLunch
                                key={todayslunch.id}
                                id={todayslunch.id}
                                place={todayslunch.place.name}
                                username={todayslunch.username}
                                vote={todayslunch.vote}
                            />
                        ))
                    }
                </Col>
            </Row>
        );
    }
}

const mstp = ({ todayslunchs, voteData }) => ({
    todayslunchs: todayslunchs.list,
    voteData: voteData
});

export default connect(mstp)(TodaysLunchs);

