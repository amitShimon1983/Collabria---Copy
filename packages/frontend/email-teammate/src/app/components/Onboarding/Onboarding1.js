import React from 'react';
import Bubbles from './bbls.png';
import { Text } from 'office-ui-fabric-react/lib/Text';
import './Onboarding.scss';
import { DefaultButton } from 'office-ui-fabric-react';

const Onboarding1 = ({ onNext, exitOnboarding }) => {
  return (
    <div className="onboarding-1 backdrop-blur">
      <div className="circle-container">
        <img className="bubbles" src={Bubbles} alt="bubbles" />
        <div className="text">
          <div className="huge-number">10</div>
          Free email shares!
        </div>
      </div>

      <div className="explain-text">
        <b>The first 10 email shares are free.</b>
        <br />
        Enjoy it!
      </div>

      <div className="lower-buttons">
        <DefaultButton text="Show me how" onClick={onNext} />
        <Text onClick={exitOnboarding} className="maybe-later">
          Maybe later
        </Text>
      </div>
    </div>
  );
};

export default Onboarding1;
