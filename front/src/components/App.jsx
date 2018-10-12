import React from 'react';

import { Route, Switch } from 'react-router-dom';

import AddPlace from './AddPlace'
import Footer from './Footer'
import LogoutView from './LogoutView'

import CreateAVote from '../containers/CreateAVote';
import AddAVoice from '../containers/AddAVoice';
import Header from '../containers/Header';
import GetUsersVotes from '../containers/GetUsersVotes';
import BeginVote from '../containers/BeginVote';

const App = () => {

    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route exact path="/" component={BeginVote} />
                <Route exact path="/create-a-vote" component={CreateAVote} />
                <Route exact path="/add-place" component={AddPlace} />
                <Route exact path="/vote/:url" component={AddAVoice} />
                <Route exact path="/my-votes" component={GetUsersVotes} />
                <Route exact path="/logout" component={LogoutView} />
            </Switch>
            <Footer/>
        </div>
    );
}

export default App;