import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';

interface GithubData {
  avatar_url: string;
}

function Info() {
  const [githubData, setGithubData] = useState<GithubData | null>(null);
  const [githubUser] = useState<string>("andresdanielmtz");

  const fetchData = () => {
    return fetch(`https://api.github.com/users/${githubUser}`)
      .then((response) => response.json())
      .then((data: GithubData) => setGithubData(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 'auto',
        marginTop: 5,
        padding: 2,
        boxShadow: 3,
        borderRadius: 2, // Add this line to round the card
      }}
    >
      <CardContent>
        <Avatar
          alt="Andrés Martínez"
          src={githubData?.avatar_url || ''}
          sx={{
            width: 108, // 12 * 8 (theme.spacing(12))
            height: 108, // 12 * 8 (theme.spacing(12))
            margin: 'auto',
          }}
        />
        <Typography
          variant="h5"
          component="h3"
          align="center"
          sx = {{
            marginTop: 2,
          }}
        >
          Andrés Martínez
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          sx={{
            textAlign: 'center',
            marginTop: 1,
          }}
        >
          CRUD Introduction Project, Application Developer Intern @ IBM
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Info;