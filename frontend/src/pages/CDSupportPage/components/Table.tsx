import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import * as React from 'react';

function createData(
  id: number, 
  doctorName: string,
  patientName: string,
  drugList: string,
) {
  return { id, doctorName, patientName, drugList };
}

const prescriptions = [
  createData(1, "Daulet A.", "Madenali Bakhyt", "some list"),
  createData(2, "Daulet A.", "Cristiano Ronaldo", "some list"),
  createData(3, "Ali O.", "Leo Messi", "some list"),
  createData(4, "Daulet A.", "Gennadiy Golovkin", "some list"),
];

export default function TableColumnPinning() {
  return (
    <Box sx={{ width: '100%', paddingLeft:"20px", paddingRight:"20px" }}>
      <Sheet
        variant="outlined"
        sx={{
          '--TableCell-height': '40px',
          // the number is the amount of the header rows.
          '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
          '--Table-firstColumnWidth': '80px',
          '--Table-lastColumnWidth': '144px',
          // background needs to have transparency to show the scrolling shadows
          '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
          '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
          overflow: 'auto',
          background: (
            theme,
          ) => `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 0 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 100% 50%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
          backgroundSize:
            '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'local, local, scroll, scroll',
          backgroundPosition:
            'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
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
              <th
                aria-label="last"
                style={{ width: 'var(--Table-lastColumnWidth)' }}
              />
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription) => (
            <tr key={prescription.id}>
                <td>{prescription.id}</td>
                <td>{prescription.doctorName}</td>
                <td>{prescription.patientName}</td>
                    <td>
                        <Button size="sm" variant="soft" color="primary">
                            Open
                        </Button>
                    </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="sm" variant="plain" color="success">
                      Confirm
                    </Button>
                    <Button size="sm" variant="soft" color="danger">
                      Cancel
                    </Button>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
}