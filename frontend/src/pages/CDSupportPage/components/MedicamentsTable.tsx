import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import * as React from 'react';

interface History {
  date: string;
  patientId: string;
  dosage: number;
}

interface Medication {
  name: string;
  dosage: number;
  frequency: string;
  sideEffects: string;
  price: number;
  history: History[];
}

function createData(
  name: string,
  dosage: number,
  frequency: string,
  sideEffects: string,
  price: number,
): Medication {
  return {
    name,
    dosage,
    frequency,
    sideEffects,
    price,
    history: [
      {
        date: '2023-05-01',
        patientId: '12345',
        dosage: 2,
      },
      {
        date: '2023-05-02',
        patientId: '67890',
        dosage: 1,
      },
    ],
  };
}

function Row(props: { row: Medication; initialOpen?: boolean }) {
  const { row } = props;
  const [open, setOpen] = React.useState(props.initialOpen || false);

  return (
    <React.Fragment>
      <tr>
        <td>
          <IconButton
            aria-label="expand row"
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        <th scope="row">{row.name}</th>
        <td>{row.dosage}</td>
        <td>{row.frequency}</td>
        <td>{row.sideEffects}</td>
      </tr>
      <tr>
        <td style={{ height: 0, padding: 0 }} colSpan={5}>
          {open && (
            <Sheet
              variant="soft"
              sx={{ p: 1, pl: 6, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)' }}
            >
              <Typography level="body-lg" component="div">
                History
              </Typography>
              <Table
                borderAxis="bothBetween"
                size="sm"
                aria-label="medication history"
                sx={{
                  '& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)':
                    { textAlign: 'right' },
                  '--TableCell-paddingX': '0.5rem',
                }}
              >
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Patient</th>
                    <th>Dosage</th>
                    <th>Total price ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {row.history.map((historyRow) => (
                    <tr key={historyRow.date}>
                      <th scope="row">{historyRow.date}</th>
                      <td>{historyRow.patientId}</td>
                      <td>{historyRow.dosage}</td>
                      <td>
                        {Math.round(historyRow.dosage * row.price * 100) / 100}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Sheet>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
}

const rows = [
  createData('Aspirin', 500, 'Twice daily', 'Nausea, Vomiting', 0.10),
  createData('Paracetamol', 650, 'Thrice daily', 'Liver damage', 0.15),
  createData('Ibuprofen', 200, 'Twice daily', 'Stomach ache', 0.20),
  createData('Amoxicillin', 500, 'Once daily', 'Allergic reaction', 0.30),
  createData('Metformin', 1000, 'Twice daily', 'Diarrhea', 0.25),
];

export default function MedicationTable() {
  return (
    <Sheet sx={{padding: "17px",}}>
      <Table
        aria-label="collapsible medication table"
        sx={{
          '& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)':
            { textAlign: 'right' },
          '& > tbody > tr:nth-child(odd) > td, & > tbody > tr:nth-child(odd) > th[scope="row"]':
            {
              borderBottom: 0,
            },
            padding: "2px",
            border: "1px gray solid",
            borderRadius: "8px"
        }}
      >
        <thead>
          <tr>
            <th style={{ width: 40 }} aria-label="empty" />
            <th style={{ width: '40%' }}>Medication</th>
            <th>Dosage (mg)</th>
            <th>Frequency</th>
            <th>Side Effects</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <Row key={row.name} row={row} initialOpen={index === 0} />
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
