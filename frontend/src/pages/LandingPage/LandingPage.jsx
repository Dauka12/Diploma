import * as React from 'react';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar.jsx';
import FAQ from './components/FAQ.jsx';
import Features from './components/Features.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Highlights from './components/Highlights.jsx';
import Testimonials from './components/Testimonials.jsx';
import getLPTheme from './getLPTheme';

export default function LandingPage() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={showCustomTheme ? defaultTheme : LPtheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode}/>
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
}