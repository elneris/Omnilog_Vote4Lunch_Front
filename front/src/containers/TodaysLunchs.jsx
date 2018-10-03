import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTodaysLunchs } from '../actions/todayslunchs';

import TodaysLunch from './TodaysLunch'

class TodaysLunchs extends Component {

    componentDidMount() {
        this.props.dispatch(fetchTodaysLunchs());
    }

    render() { 
        console.log(this.props.todayslunchs);
        
        return ( 
<div>
                <h3 className='text-white'>Liste des restaurants du jour</h3>
            {
                this.props.todayslunchs.map(todayslunch => (
                  <TodaysLunch 
                    key = {todayslunch.id}
                    place = {todayslunch.place}
                    username = {todayslunch.username}
                    vote = {todayslunch.vote}
                    />
                ))
            }
</div>
         );
    }
}

const mstp = ({ todayslunchs }) => ({
    todayslunchs: todayslunchs.list
  });
  
export default connect(mstp)(TodaysLunchs);

