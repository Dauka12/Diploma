import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import CssBaseline from '@mui/joy/CssBaseline';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';
import * as React from 'react';
import Table from './components/Table.tsx';

import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

import Header from './components/Header.tsx';
import Layout from './components/Layout.tsx';
import Navigation from './components/Navigation.tsx';

export default function TeamExample() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const peopleData = [
        {
            name: 'Dr. Alina Kairat',
            position: 'Therapist',
            avatar2x: 'https://www.vectorlogo.zone/logos/medicalcenter/medicalcenter-icon.svg',
            companyData: [
        {
            role: 'The Best Therapist',
            name: 'Astana Medical Center',
            logo: 'https://www.vectorlogo.zone/logos/medicalcenter/medicalcenter-icon.svg',
            years: '2016-now',
        },
        {
            role: 'Resident Therapist',
            name: 'Astana City Hospital',
            logo: 'https://www.vectorlogo.zone/logos/cityhospital/cityhospital-icon.svg',
            years: '2012-2016',
        },
        ],
            skills: ['General Medicine', 'Patient Care'],
    },
    {
        name: 'Dr. Timur Nursultan',
        position: 'Dentist',
        avatar2x: 'https://www.vectorlogo.zone/logos/medicalcenter/medicalcenter-icon.svg',
        companyData: [
        {
            role: 'Lead Dentist',
            name: 'Astana Dental Clinic',
            logo: 'https://www.vectorlogo.zone/logos/dentalclinic/dentalclinic-icon.svg',
            years: '2018-now',
        },
        {
            role: 'Assistant Dentist',
            name: 'Kazakhstan National Dental Center',
            logo: 'https://www.vectorlogo.zone/logos/nationaldentalcenter/nationaldentalcenter-icon.svg',
            years: '2014-2018',
        },
        ],
        skills: ['Oral Surgery', 'Cosmetic Dentistry'],
    },
    {
        name: 'Dr. Aigerim Zhanna',
        position: 'Pediatrician',
        avatar2x: 'https://www.vectorlogo.zone/logos/medicalcenter/medicalcenter-icon.svg',
        companyData: [
        {
            role: 'Chief Pediatrician',
            name: 'Children\'s Hospital Astana',
            logo: 'https://www.vectorlogo.zone/logos/childrenshospital/childrenshospital-icon.svg',
            years: '2017-now',
        },
        {
            role: 'Pediatric Specialist',
            name: 'Astana General Hospital',
            logo: 'https://www.vectorlogo.zone/logos/generalhospital/generalhospital-icon.svg',
            years: '2013-2017',
        },
        ],
        skills: ['Child Health', 'Vaccinations'],
    },
    {
        name: 'Dr. Erlan Serik',
        position: 'Cardiologist',
        avatar2x: 'https://www.vectorlogo.zone/logos/medicalcenter/medicalcenter-icon.svg',
        companyData: [
        {
            role: 'Head Cardiologist',
            name: 'Astana Heart Institute',
            logo: 'https://www.vectorlogo.zone/logos/heartinstitute/heartinstitute-icon.svg',
            years: '2015-now',
        },
        {
            role: 'Cardiology Fellow',
            name: 'Astana Medical University',
            logo: 'https://www.vectorlogo.zone/logos/medicaluniversity/medicaluniversity-icon.svg',
            years: '2010-2015',
        },
        ],
        skills: ['Cardiac Surgery', 'Heart Disease Management'],
    },
    ];

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

            <Table />
        </Layout.SidePane>
        <Layout.Main>
        <List
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 2,
            }}
            >
            {peopleData.map((person, index) => (
            <Sheet
                key={index}
                component="li"
                variant="outlined"
                sx={{
                    borderRadius: 'sm',
                    p: 2,
                    listStyle: 'none',
                }}
                >
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar
                        variant="outlined"
                        src={person.avatar2x}
                        srcSet={`${person.avatar2x} 2x`}
                        sx={{ borderRadius: '50%' }}
                    />
                    <div>
                        <Typography level="title-md">{person.name}</Typography>
                        <Typography level="body-xs">{person.position}</Typography>
                    </div>
                </Box>
                <Divider component="div" sx={{ my: 2 }} />
                <List sx={{ '--ListItemDecorator-size': '40px', gap: 2 }}>
                    {person.companyData.map((company, companyIndex) => (
                        <ListItem key={companyIndex} sx={{ alignItems: 'flex-start' }}>
                            <ListItemDecorator
                                sx={{
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    height: '100%',
                                    width: '1px',
                                    bgcolor: 'divider',
                                    left: 'calc(var(--ListItem-paddingLeft) + 12px)',
                                    top: '50%',
                                },
                                }}
                        >
                        <Avatar
                            src={company.logo}
                            sx={{ '--Avatar-size': '24px' }}
                        />
                        </ListItemDecorator>
                    <ListItemContent>
                        <Typography level="title-sm">{company.role}</Typography>
                        <Typography level="body-xs">{company.name}</Typography>
                    </ListItemContent>
                    <Typography level="body-xs">{company.years}</Typography>
                </ListItem>
                ))}
                </List>
                <Button
                    size="sm"
                    variant="plain"
                    endDecorator={<KeyboardArrowRightRoundedIcon fontSize="small" />}
                    sx={{ px: 1, mt: 1 }}
                >
                    Expand
                </Button>
                <Divider component="div" sx={{ my: 2 }} />
                <Typography level="title-sm">Skills tags:</Typography>
                <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
                    {person.skills.map((skill, skillIndex) => (
                        <Chip
                            key={skillIndex}
                            variant="outlined"
                            color="neutral"
                            size="sm"
                        >
                        {skill}
                    </Chip>
                    ))}
                </Box>
                </Sheet>
                ))}
            </List>
        </Layout.Main>
    </Layout.Root>
    </CssVarsProvider>
    );
    }