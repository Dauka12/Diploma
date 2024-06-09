import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import CssBaseline from '@mui/joy/CssBaseline';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';
import * as React from 'react';
import PharmacyTable from './components/PharmacyTable.tsx';
import Table from './components/Table.tsx';

import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

import Header from './components/Header.tsx';
import Layout from './components/Layout.tsx';
import Navigation from './components/Navigation.tsx';

export default function CDSupportMedicamentsManagementPage() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
                {drawerOpen && (
                    <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
                    <Navigation />
                    </Layout.SideDrawer>
                )}
        <Stack
            id="tab-bar"
            direction="row"
            justifyContent="space-around"
            spacing={1}
            sx={{
                display: { xs: 'flex', sm: 'none' },
                zIndex: '999',
                bottom: 0,
                position: 'fixed',
                width: '100dvw',
                py: 2,
                backgroundColor: 'background.body',
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
        <Button
            variant="plain"
            color="neutral"
            aria-pressed="true"
            component="a"
            href="/joy-ui/getting-started/templates/team/"
            size="sm"
            startDecorator={<PeopleAltRoundedIcon />}
            sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
            Team
        </Button>
        </Stack>
        <Layout.Root
            sx={{
            ...(drawerOpen && {
                height: '100vh',
                overflow: 'hidden',
            }),
        }}
        >
        <Layout.Header>
            <Header />
        </Layout.Header>
        <Layout.SideNav>
            <Navigation />
        </Layout.SideNav>
        <Layout.SidePane>
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
            <Typography level="title-lg" textColor="text.secondary" component="h1">
                People
            </Typography>
            <Button startDecorator={<PersonRoundedIcon />} size="sm">
                Add new
            </Button>
            </Box>

            <Table /> {/*TableColumnPinning*/}
        </Layout.SidePane>
                <Layout.Main>
                    <PharmacyTable />
                </Layout.Main>
    </Layout.Root>
    </CssVarsProvider>
    );
    }