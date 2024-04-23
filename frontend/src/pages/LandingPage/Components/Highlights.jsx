import Diversity3Icon from '@mui/icons-material/Diversity3';
import HealingIcon from '@mui/icons-material/Healing';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import WifiIcon from '@mui/icons-material/Wifi';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const items = [
  {
    icon: <WifiIcon />,
    title: 'Remote renewal',
    description:
      "You don't have to see a doctor to renew a prescription, you can submit a request through the app (available for people with a chronic condition)",
  },
  {
    icon: <SmartphoneIcon />,
    title: 'Recipes are always with you',
    description:
      'Get a history of prescriptions from private and public clinics. Now your prescriptions will always be at your fingertips and will never be lost.',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: "It's understandable",
    description:
      'No problems with incomprehensible handwriting and keeping prescription slips. The electronic prescription is issued in a clear and convenient form and is always with you.',
  },
  {
    icon: <Diversity3Icon />,
    title: "Relatives' recipes",
    description:
      'It is possible to connect children and grandparents to electronic prescriptions and find out what they have been prescribed and keep track of their medication intake.',
  },
  {
    icon: <HealingIcon />,
    title: 'Conveniently book',
    description:
      'The app already picks up the right medicines and can be booked at a bargain price.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Price comparison',
    description:
      'You can find out where to buy medicines more favourably: compare prices, location of pharmacies and different medicines with the same active ingredient.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'black',
        bgcolor: '#29d2b5',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" style={{color:"white"}}>
          Why do you need to install the e-Prescription app?
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: '#ffffff',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}