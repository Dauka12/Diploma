import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import GlobalStyles from '@mui/joy/GlobalStyles';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { doc, getDoc } from 'firebase/firestore';
import * as React from 'react';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from '../../../firebase.js';
import { endSession, isLoggedIn } from "../../../session.js";


import ColorSchemeToggle from './ColorSchemeToggle.tsx';
import { closeSidebar } from './utils.tsx';

export type User = {
  firstName: string;
  lastName: string;
  uid: string;
  email: string;
};

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/sign-in");
    } else {
      const uid = localStorage.getItem("uid");
      if (uid) {
        const getUser = async () => {
          try {
            const userDocRef = doc(db, "users", uid);
            const userDocSnapshot = await getDoc(userDocRef);
            if (userDocSnapshot.exists()) {
              setUser(userDocSnapshot.data() as User);
              dispatch({ type: 'SET_USER', payload: userDocSnapshot.data() });
              console.log(userDocSnapshot.data());
              
            } else {
              console.log("Документ с UID пользователя не найден.");
            }
          } catch (error) {
            console.error("Ошибка при получении пользователя:", error.message);
          }
        };
        getUser();
      }
    }
  }, [navigate, dispatch]);
  const onLogout = async () => {
    await endSession();
    navigate("/sign-in");
  }

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography level="title-lg">ePrescription</Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
      <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" />
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton
              role="menuitem"
              component="a"
              href="/profile"
            >
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">My Profile</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
             role="menuitem"
             component="a"
             href="/prescriptions"
            >
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Prescriptions</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AssignmentRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Tasks</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton>All tasks</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Backlog</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>In progress</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Done</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
          <ListItem>
            <ListItemButton
              role="menuitem"
              component="a"
              href="/messages"
            >
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Messages</Typography>
              </ListItemContent>
              <Chip size="sm" color="primary" variant="solid">
                4
              </Chip>
            </ListItemButton>
          </ListItem>
          <ListItem nested>
            <Toggler
              defaultExpanded
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Users</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem>
                  <ListItemButton>Add patient</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>My patients</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
        </List>
        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <SupportRoundedIcon />
              Support service
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://i.guim.co.uk/img/media/ce9c149506881191caa4b1f838575d0dbb07e520/734_381_6827_4098/master/6827.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=c38e5e77b9f3882e14b633932e18cea5"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">  {user ? `${user.firstName} ${user.lastName}` : ''}</Typography>
          {/* <Typography level="body-xs">{ localStorage.email }</Typography> */}
        </Box>
        <IconButton size="sm" variant="plain" color="neutral">
          <LogoutRoundedIcon onClick={onLogout} />
        </IconButton>
      </Box>
    </Sheet>
  );
}