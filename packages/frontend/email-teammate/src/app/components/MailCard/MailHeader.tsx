import React from 'react';
import styled from 'styled-components';
import { Persona } from '@harmon.ie/collabria-frontend-storybook';
import { getRelativeDisplayDate } from '@harmon.ie/collabria-frontend-shared/src/utils';

const SubjectAndEditContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: baseline;
`;
const EditModeTooltip = styled.div`
  margin: 10px;
  color: #6264a7;
  font-weight: 600;
  line-height: 1.3;
`;

const TooltipHeading = styled.div`
  font-size: 18px;
  line-height: 2.3;
`;
const MailHeader = ({ fromAddress, subject, sentDateTime }) => {
  const profilePic = '';
  return (
    <div className="main-header-details">
      <Persona imageUrl={profilePic} text={fromAddress} size={3} />
      <SubjectAndEditContainer>
        <div className="subject-and-sent-date">
          <div className="title">{subject}</div>
          <div>{getRelativeDisplayDate(new Date(sentDateTime))}</div>
        </div>
      </SubjectAndEditContainer>
    </div>
  );
};

export default MailHeader;
