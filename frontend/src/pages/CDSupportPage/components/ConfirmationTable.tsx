import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';
import Input from '@mui/joy/Input';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Sheet from '@mui/joy/Sheet';
import Snackbar from '@mui/joy/Snackbar';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import React, { useState } from 'react';
import base_url from '../../../base-url';

const ConfirmationTable: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [cancelAlert, setCancelAlert] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'time' | 'id'>('time');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [doctorNameFilter, setDoctorNameFilter] = useState('');
  const [patientNameFilter, setPatientNameFilter] = useState('');

  const [anchorElStatus, setAnchorElStatus] = useState<null | HTMLElement>(null);
  const [anchorElSort, setAnchorElSort] = useState<null | HTMLElement>(null);

  const handleStatusClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElStatus(event.currentTarget);
  };

  const handleStatusClose = () => {
    setAnchorElStatus(null);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSort(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorElSort(null);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const prescriptionsResponse = await axios.get(`${base_url}/prescription/getAllPres`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPrescriptions(prescriptionsResponse.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };
    fetchData();
  }, []);

  const handleOpen = (tags: any[]) => {
    setSelectedTags(tags);
    setOpenModal(true);
  };

  const handleConfirm = async (id: number) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`${base_url}/prescription/activatePrescription/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConfirmAlert(true);
    } catch (error) {
      console.error('Error activating prescription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: number) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`${base_url}/prescription/blockPrescription/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCancelAlert(true);
    } catch (error) {
      console.error('Error blocking prescription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDoctorNameFilter(e.target.value);
  };

  const handlePatientNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientNameFilter(e.target.value);
  };

  const handleStatusFilterChange = (status: string | null) => {
    setStatusFilter(status);
    handleStatusClose();
  };

  const handleSortChange = (field: 'time' | 'id') => {
    setSortField(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    handleSortClose();
  };

  const filteredPrescriptions = prescriptions
    .filter(prescription =>
      (!statusFilter || prescription.status === statusFilter) &&
      prescription.doctorId.username.toLowerCase().includes(doctorNameFilter.toLowerCase()) &&
      prescription.patientId.username.toLowerCase().includes(patientNameFilter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === 'time') {
        return sortOrder === 'asc' ? a.timestamp - b.timestamp : b.timestamp - a.timestamp;
      }
      return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
    });

  const getButtonStyles = (status: string) => {
    switch (status) {
      case 'BLOCKED':
        return {
          cursor: 'not-allowed',
          opacity: 0.5,
          pointerEvents: 'none' as 'none'
        };
      case 'ACTIVE':
        return {
          confirm: {
            cursor: 'not-allowed',
            opacity: 0.5,
            pointerEvents: 'none' as 'none'
          },
          cancel: {}
        };
      default:
        return {};
    }
  };

  return (
    <Box sx={{ width: '100%', paddingLeft: '20px', paddingRight: '20px' }}>
      <Box sx={{ marginBottom: 2, display: 'flex', gap: 2 }}>
        <Input
          placeholder="Search by doctor name"
          value={doctorNameFilter}
          onChange={handleDoctorNameFilterChange}
        />
        <Input
          placeholder="Search by patient name"
          value={patientNameFilter}
          onChange={handlePatientNameFilterChange}
        />
        <Button
          aria-controls="status-menu"
          aria-haspopup="true"
          onClick={handleStatusClick}
        >
          Filter by Status
        </Button>
        <Menu
          id="status-menu"
          anchorEl={anchorElStatus}
          open={Boolean(anchorElStatus)}
          onClose={handleStatusClose}
        >
          <MenuItem onClick={() => handleStatusFilterChange('ACTIVE')}>ACTIVE</MenuItem>
          <MenuItem onClick={() => handleStatusFilterChange('INACTIVE')}>INACTIVE</MenuItem>
          <MenuItem onClick={() => handleStatusFilterChange('EXPIRED')}>EXPIRED</MenuItem>
          <MenuItem onClick={() => handleStatusFilterChange('BLOCKED')}>BLOCKED</MenuItem>
          <MenuItem onClick={() => handleStatusFilterChange('HANDED')}>HANDED</MenuItem>
          <MenuItem onClick={() => handleStatusFilterChange(null)}>Clear</MenuItem>
        </Menu>
        <Button
          aria-controls="sort-menu"
          aria-haspopup="true"
          onClick={handleSortClick}
        >
          Sort
        </Button>
        <Menu
          id="sort-menu"
          anchorEl={anchorElSort}
          open={Boolean(anchorElSort)}
          onClose={handleSortClose}
        >
          <MenuItem onClick={() => handleSortChange('time')}>
            Sort by Time {sortField === 'time' && (sortOrder === 'asc' ? '▲' : '▼')}
          </MenuItem>
          <MenuItem onClick={() => handleSortChange('id')}>
            Sort by ID {sortField === 'id' && (sortOrder === 'asc' ? '▲' : '▼')}
          </MenuItem>
        </Menu>
      </Box>
      <Sheet
        variant="outlined"
        sx={{
          '--TableCell-height': '40px',
          '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
          '--Table-firstColumnWidth': '80px',
          '--Table-lastColumnWidth': '144px',
          overflow: 'auto',
          background: theme => `
            linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(farthest-side at 0 50%, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0)),
            radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0)) 0 100%
          `,
          backgroundSize: '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'local, local, scroll, scroll',
          backgroundPosition: 'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
          backgroundColor: 'background.surface',
        }}
      >
        <Table
          borderAxis="bothBetween"
          stripe="odd"
          hoverRow
          sx={{
            '& tr > *:first-child': {
              position: 'sticky',
              left: 0,
              boxShadow: '1px 0 var(--TableCell-borderColor)',
              bgcolor: 'background.surface',
            },
            '& tr > *:last-child': {
              position: 'sticky',
              right: 0,
              bgcolor: 'var(--TableCell-headBackground)',
            },
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 'var(--Table-firstColumnWidth)' }}>Prescription ID</th>
              <th style={{ width: 100 }}>Doctor Name</th>
              <th style={{ width: 100 }}>Patient Name</th>
              <th style={{ width: 100 }}>Drug List</th>
              <th style={{ width: 100 }}>Status</th>
              <th aria-label="last" style={{ width: 'var(--Table-lastColumnWidth)' }} />
            </tr>
          </thead>
          <tbody>
            {filteredPrescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td>{prescription.id}</td>
                <td>{prescription.doctorId.username}</td>
                <td>{prescription.patientId.username}</td>
                <td>
                  <Button size="sm" variant="soft" color="primary" onClick={() => handleOpen(prescription.tags)}>
                    Open
                  </Button>
                </td>
                <td>{prescription.status}</td>
                <td>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="sm"
                      variant="plain"
                      color="success"
                      onClick={() => handleConfirm(prescription.id)}
                      disabled={loading || prescription.status === 'BLOCKED' || prescription.status === 'ACTIVE'}
                      sx={getButtonStyles(prescription.status)}
                    >
                      {loading ? <CircularProgress size="sm" /> : 'Confirm'}
                    </Button>
                    <Button
                      size="sm"
                      variant="soft"
                      color="danger"
                      onClick={() => handleCancel(prescription.id)}
                      disabled={loading || prescription.status === 'BLOCKED'}
                      sx={getButtonStyles(prescription.status)}
                    >
                      {loading ? <CircularProgress size="sm" /> : 'Cancel'}
                    </Button>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalDialog>
          <Typography level="h6">Tags</Typography>
          {selectedTags.map((tag) => (
            <Typography key={tag.id}>{tag.tagName}</Typography>
          ))}
          <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
            <Button onClick={() => setOpenModal(false)}>Close</Button>
          </Box>
        </ModalDialog>
      </Modal>

      <Snackbar open={confirmAlert} autoHideDuration={6000} onClose={() => setConfirmAlert(false)}>
        <Alert severity="success">Prescription successfully confirmed!</Alert>
      </Snackbar>
      <Snackbar open={cancelAlert} autoHideDuration={6000} onClose={() => setCancelAlert(false)}>
        <Alert severity="warning">Prescription successfully canceled!</Alert>
      </Snackbar>
    </Box>
  );
};

export default ConfirmationTable;
