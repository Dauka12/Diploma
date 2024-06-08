import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import React, { useState } from 'react';
import base_url from '../../../base-url';

const TableColumnPinning: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);

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
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`${base_url}/prescription/activatePrescription/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Optionally, update the UI or give feedback to the user
    } catch (error) {
      console.error('Error activating prescription:', error);
    }
  };

  const handleCancel = async (id: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`${base_url}/prescription/blockPrescription/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Optionally, update the UI or give feedback to the user
    } catch (error) {
      console.error('Error blocking prescription:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', paddingLeft: '20px', paddingRight: '20px' }}>
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
              <th aria-label="last" style={{ width: 'var(--Table-lastColumnWidth)' }} />
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td>{prescription.id}</td>
                <td>{prescription.doctorId.username}</td>
                <td>{prescription.patientId.username}</td>
                <td>{prescription.status}</td>
                <td>
                  <Button size="sm" variant="soft" color="primary" onClick={() => handleOpen(prescription.tags)}>
                    Open
                  </Button>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="sm" variant="plain" color="success" onClick={() => handleConfirm(prescription.id)}>
                      Confirm
                    </Button>
                    <Button size="sm" variant="soft" color="danger" onClick={() => handleCancel(prescription.id)}>
                      Cancel
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
    </Box>
  );
};

export default TableColumnPinning;
