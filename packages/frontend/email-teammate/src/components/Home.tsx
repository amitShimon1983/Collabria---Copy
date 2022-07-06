import React from 'react';
import { Box, Text } from '@harmon.ie/collabria-frontend-storybook';

const Home = () => {
  const handleLogout = () => {
    const requestUrl = `${'https://f2623d582b83.ngrok.io/api/getTest'}`;
    fetch(requestUrl, {
      method: 'GET',
      credentials: 'include',
      redirect: 'follow',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(error => {
      console.log('error', error);
    });
  };
  return (
    <Box asColumn padding="xl">
      <Box justify="space-between">
        <Box>
          <button onClick={handleLogout}>getTest</button>
          <Text>Home 222</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
