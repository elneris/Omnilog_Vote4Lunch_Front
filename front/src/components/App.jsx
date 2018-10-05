import React from 'react';

import {Route, Switch} from 'react-router-dom';

import BeginVote from './BeginVote'
import CreateAVote from '../containers/CreateAVote'
import AddPlace from '../components/AddPlace'

const App = () => {

    return (

        <Switch>
          <Route exact path="/" component={BeginVote} />
          <Route exact path="/begin-vote" component={CreateAVote} />
          <Route exact path="/add-place" component={AddPlace} />
        </Switch>


    );
}

export default App;