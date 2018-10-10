import React from 'react';

import { Route, Switch } from 'react-router-dom';

import BeginVote from './BeginVote'
import AddPlace from './AddPlace'
import Header from './Header'

import CreateAVote from '../containers/CreateAVote'
import AddAVoice from '../containers/AddAVoice';

const App = () => {

    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route exact path="/" component={BeginVote} />
                <Route exact path="/begin-vote" component={CreateAVote} />
                <Route exact path="/add-place" component={AddPlace} />
                <Route exact path="/vote/:url" component={AddAVoice} />
            </Switch>
        </div>
    );
}

export default App;