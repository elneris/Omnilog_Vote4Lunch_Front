import React from 'react';

import { VoteTitle, VoteHeaderButtonBar } from '../..';

import './VoteHeader.scss';

const VoteHeader = () => (
  <div className="VoteHeader row justify-content-center py-2">
    <div className="col-8 text-center">
      <VoteTitle />
    </div>
    <div className="col-4 text-right">
      <VoteHeaderButtonBar />
    </div>
  </div>

);


export default VoteHeader;
