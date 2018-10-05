import React from 'react';

import {Route, Switch} from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap'

import BeginVote from './BeginVote'
import CreateAVote from '../containers/CreateAVote'

const App = () => {

    return (

        <Switch>
          <Route exact path="/" component={BeginVote} />
          <Route exact path="/second-step" component={CreateAVote} />
        </Switch>


    );
}

export default App;