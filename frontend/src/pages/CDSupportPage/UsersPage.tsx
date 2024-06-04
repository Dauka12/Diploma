import CssBaseline from '@mui/joy/CssBaseline';
import Stack from '@mui/joy/Stack';
import { CssVarsProvider } from '@mui/joy/styles';
import * as React from 'react';
import MedicamentsCreate from './components/MedicamentsCreate.tsx';
import MedicamentsTable from './components/MedicamentsTable.tsx';


import Header from './components/Header.tsx';
import Layout from './components/Layout.tsx';
import Navigation from './components/Navigation.tsx';

export default function TeamExample() {
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
                    <MedicamentsTable />    
        </Layout.SidePane>
        <Layout.Main>
                    <MedicamentsCreate />
        </Layout.Main>
    </Layout.Root>
    </CssVarsProvider>
    );
    }