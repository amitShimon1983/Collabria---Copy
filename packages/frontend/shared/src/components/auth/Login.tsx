import React, { FunctionComponent } from 'react';
import { Box, Text, Button } from '@harmon.ie/collabria-frontend-storybook';

interface LoginProps {
  handleLogin?: () => void;
}

const Login: FunctionComponent<LoginProps> = ({ handleLogin }) => {
  return (
    <Box>
      <Text>Connect</Text>
      <Button onClick={handleLogin}>Connect</Button>
    </Box>
  );
};

export default Login;
