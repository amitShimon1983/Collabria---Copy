import React from 'react';

import './Onboarding.scss';
import MailIcon from './noun_Mail_1988539.svg';

const Onboarding2 = () => {
  return (
    <div className="onboarding-2">
      <div className="onboarding-2-top">
        <div className="container">
          <img src={MailIcon} className="mail-icon" alt="mailIcon" />
          <div className="first-line">
            <b>Select</b> the email you want to share
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding2;
