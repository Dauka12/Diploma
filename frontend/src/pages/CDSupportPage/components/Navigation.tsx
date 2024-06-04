import Chip from '@mui/joy/Chip';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListSubheader from '@mui/joy/ListSubheader';
import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';


const paths = [
    "/clinical-decision-support/prescriptions-management",
    "/clinical-decision-support/medicaments-management",
    "/clinical-decision-support/users-management",
  ];
  

export default function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();

    const selectedIndex = React.useMemo(() => {
        return paths.indexOf(location.pathname);
    }, [location.pathname]);

    const handleListItemClick = (index: number, path: string) => {
        navigate(path);
    };
  return (
    <List
      size="sm"
      sx={{ '--ListItem-radius': 'var(--joy-radius-sm)', '--List-gap': '4px' }}
    >
      <ListItem nested>
        <ListSubheader sx={{ letterSpacing: '2px', fontWeight: '800' }}>
          Browse
        </ListSubheader>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            '& .JoyListItemButton-root': { p: '8px' },
          }}
        >
          <ListItem>
            <ListItemButton onClick={() => handleListItemClick(0, paths[0])} selected={selectedIndex === 0}>
              <ListItemDecorator>
                <ArticleRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Managing Prescriptions</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => handleListItemClick(1, paths[1])} selected={selectedIndex === 1}>
              <ListItemDecorator sx={{ color: 'neutral.500' }}>
                <AssignmentIndRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Managing Medicaments</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => handleListItemClick(2, paths[2])} selected={selectedIndex === 2}>
              <ListItemDecorator sx={{ color: 'neutral.500' }}>
                <PeopleRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Managing users</ListItemContent>
              <Chip variant="soft" color="warning" size="sm">
                2
              </Chip>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}