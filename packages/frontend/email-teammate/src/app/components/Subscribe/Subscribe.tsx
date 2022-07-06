import React from 'react';
import SubscribeButton from './SubscribeButton';
import {
  AnimationStyles,
  appContextVar,
  useCustomizations,
  useReactiveVar,
} from '@harmon.ie/collabria-frontend-shared';
import { Text } from '@harmon.ie/collabria-frontend-storybook';
import useUserStatus from '~/app/hookes/useUserStatus';

const subscribeText = {
  fontWeight: 'Bold',
  fontFamily: 'inherit',
  cursor: 'default',
};

const subscribeButton = {
  //TODO move to scss
  textDecoration: 'none',
  padding: '10px',
  background: 'transparent linear-gradient(82deg, #ffffff 0%, #adaff1 100%) 0% 0% no-repeat padding-box',
  borderRadius: '9px',
  cursor: 'pointer',
  textAlign: 'center',
  color: '#212e44',
  fontWeight: '600',
  marginLeft: '10px',
};

const Subscribe = () => {
  const { user } = useReactiveVar(appContextVar);

  if (user.status === 'active' || !user || !user.status) {
    return '';
  }
  return (
    <div style={AnimationStyles.fadeIn200 as any}>
      <SubscribeCount />
      <SubscribeButton className="" style={subscribeButton} tid={user?.tid} upn={user?.upn} />
    </div>
  );
};

export const SubscribeCount = () => {
  const { customizations, sementicColors } = useCustomizations();
  const { palette } = customizations?.settings?.theme;
  const [user] = useUserStatus();

  if (user.status === 'active' || !user || !user.status) {
    return null;
  }
  const emailSharesLeft = Math.max(10 - user.emailsShared, 0);

  return (
    <Text
      style={{
        ...subscribeText,
        color: emailSharesLeft === 0 ? palette.redDark : sementicColors.messageText,
      }}
    >
      {`${emailSharesLeft} emails to share`}
    </Text>
  );
};

export default Subscribe;
