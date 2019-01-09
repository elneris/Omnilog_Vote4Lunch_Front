import React from 'react';

import {
  MailToButton,
  CopyTo,
  OClock,
} from '../..';

const SideButtonGroup = () => (
  <div className="btn-group" role="group" aria-label="Basic example">
    <button type="button" className="btn bg-lemon text-center"><CopyTo /></button>
    <button type="button" className="btn bg-lemon"><MailToButton /></button>
    <button type="button" className="btn bg-lemon"><OClock /></button>
  </div>
);

export default SideButtonGroup;
