import React from 'react';

import {Route, Switch} from 'react-router-dom';

import BeginVote from './BeginVote'
import AddPlace from './AddPlace'

import CreateAVote from '../containers/CreateAVote'
import AddAVoice from '../containers/AddAVoice';

const App = () => {

    return (

        <Switch>
          <Route exact path="/" component={BeginVote} />
          <Route exact path="/begin-vote" component={CreateAVote} />
          <Route exact path="/add-place" component={AddPlace} />
          <Route exact path="/vote/:url" component={AddAVoice} />
        </Switch>


    );
}

export default App;