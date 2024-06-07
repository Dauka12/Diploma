import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { Theme, ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
import AppAppBar from './Components/AppAppBar.tsx';
import FAQ from './Components/FAQ.tsx';
import Features from './Components/Features.tsx';
import Footer from './Components/Footer.tsx';
import Hero from './Components/Hero.tsx';
import Highlights from './Components/Highlights.tsx';
import Testimonials from './Components/Testimonials.tsx';
import getLPTheme from './getLPTheme.tsx';

const LandingPage: React.FC = () => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const [showCustomTheme] = React.useState<boolean>(true);
  const LPtheme: Theme = createTheme(getLPTheme(mode));
  const defaultTheme: Theme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={showCustomTheme ? defaultTheme : LPtheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Divider />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;
