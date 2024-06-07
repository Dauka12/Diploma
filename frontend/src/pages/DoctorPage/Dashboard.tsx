import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import CssBaseline from '@mui/joy/CssBaseline';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';
import axios from "axios";
import * as React from 'react';
import { FormEvent } from 'react';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import base_url from '../../base-url.js';
import Header from '../common/Header/Header.tsx';
import Sidebar from '../common/Sidebar/Sidebar.tsx';
import OrderList from './components/OrderList.tsx';
import OrderTable from './components/OrderTable.tsx';
import PrescribingModal from './components/PrescribingModal.tsx';

function InputFormProps(): JSX.Element {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const token = localStorage.getItem('accessToken');

    try {
      const response = await axios.post(`${base_url}/tag/create`, JSON.stringify(formJson), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      alert(`Response: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={1} direction="row">
        <Input placeholder="Add Medicaments" name="tagName" required />
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
}

export default function JoyOrderDashboardTemplate(): JSX.Element {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon style={{ fontSize: "sm" }} />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                href="#some-link"
                fontSize={12}
                fontWeight={500}
              >
                Dashboard
              </Link>
              <Typography color="primary" fontWeight={500} fontSize={12}>
                Prescriptions
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              display: 'flex',
              mb: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2" component="h1">
              Prescriptions
            </Typography>
            <InputFormProps />
            <PrescribingModal />
          </Box>
          <OrderTable />
          <OrderList />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
