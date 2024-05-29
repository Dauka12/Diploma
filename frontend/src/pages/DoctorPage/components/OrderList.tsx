/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Typography from '@mui/joy/Typography';
import { ColorPaletteProp } from '@mui/joy/styles';
import axios from "axios";
import * as React from 'react';

import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import BlockIcon from '@mui/icons-material/Block';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function OrderList() {

  const [patients, setPatients] = React.useState<any[]>([]);
  const [prescriptions, setPrescriptions] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        // Fetch patients
        const patientsResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/getPatients`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const prescriptionsResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/prescription/findAllPresByDoctor`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPatients(patientsResponse.data);
        setPrescriptions(prescriptionsResponse.data);
        console.log(patientsResponse.data);
        console.log(prescriptionsResponse.data);
        
        
      } catch (error) {
        console.error('Error fetching patients or tags:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
      {prescriptions.map((prescription) => (
        <List
          key={prescription.id}
          size="sm"
          sx={{
            '--ListItem-paddingX': 0,
          }}
        >
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
            }}
          >
            <ListItemContent sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
              <div>
                <Typography fontWeight={600} gutterBottom>
                  , {prescription.patientId.phoneNumber}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  <Typography level="body-xs">&bull;</Typography>
                  <Typography level="body-xs">{prescription.patientId.id}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Link level="body-sm" component="button">
                    Download
                  </Link>
                  <RowMenu />
                </Box>
              </div>
            </ListItemContent>
            <Chip
              variant="soft"
              size="sm"
              startDecorator={
                {
                  "ACTIVE": <CheckRoundedIcon />,
                  "INACTIVE": <AutorenewRoundedIcon />,
                  "EXPIRED": <BlockIcon />,
                }[prescription.status]
              }
              color={
                {
                  "ACTIVE": 'success',
                  "INACTIVE": 'neutral',
                  "EXPIRED": 'danger',
                }[prescription.status] as ColorPaletteProp
              }
            >
              {prescription.status}
            </Chip>
          </ListItem>
          <ListDivider />
        </List>
      ))}
      <Box
        className="Pagination-mobile"
        sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', py: 2 }}
      >
        <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Typography level="body-sm" mx="auto">
          Page 1 of 10
        </Typography>
        <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}