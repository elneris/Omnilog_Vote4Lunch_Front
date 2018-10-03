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
        console.log(this.props.todayslunchs);

        return (
            <Row className="pb-3">
                <Col>
                    <h3 className='text-white'>Liste des restaurants du jour</h3>
                    {
                        this.props.todayslunchs.map(todayslunch => (
                            <TodaysLunch
                                key={todayslunch.id}
                                place={todayslunch.place}
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

const mstp = ({ todayslunchs }) => ({
    todayslunchs: todayslunchs.list
});

export default connect(mstp)(TodaysLunchs);

