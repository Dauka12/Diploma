import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import base_url from '../../../base-url';

interface Medication {
  medName: string;
  description: string;
  country: string;
  producer: string;
  category: string[];
  price: number;
  tags: Tag[];
  imageUrl?: string;
}

interface Tag {
  id: number;
  tagName: string;
}

interface Category {
  id: number;
  categoryName: string;
}

function Row(props: { row: Medication; initialOpen?: boolean; onDelete: (medName: string) => void }) {
  const { row, onDelete } = props;
  const [open, setOpen] = useState(props.initialOpen || false);

  const truncatedDescription = row.description.length > 40 ? row.description.slice(0, 37) + '...' : row.description;

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
          <IconButton
            aria-label="delete medication"
            variant="plain"
            color="danger"
            size="sm"
            onClick={() => onDelete(row.medName)}
          >
            <DeleteIcon />
          </IconButton>
        </td>
        <th scope="row">{row.medName}</th>
        <td>{truncatedDescription}</td>
        <td>{row.country}</td>
        <td>{row.producer}</td>
        <td>{row.price}</td>
      </tr>
      <tr>
        <td style={{ height: 0, padding: 0 }} colSpan={6}>
          {open && (
            <Sheet
              variant="soft"
              sx={{ p: 1, pl: 6, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)' }}
            >
              <Typography level="body-lg" component="div">
                Categories
              </Typography>
              <ul>
                {row.category.map((category) => (
                  <li key={category}>{category}</li>
                ))}
              </ul>
              <Typography level="body-lg" component="div">
                Tags
              </Typography>
              <ul>
                {row.tags.map((tag) => (
                  <li key={tag.id}>{tag.tagName}</li>
                ))}
              </ul>
            </Sheet>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
}

export default function MedicationTable() {
  const [medicamentsArray, setMedicamentsArray] = useState<Medication[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const medicamentsResponse = await axios.get(`${base_url}/medicament/getAll`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMedicamentsArray(medicamentsResponse.data);
      } catch (error) {
        console.error('Error fetching medicaments:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (medName: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`${base_url}/medicament/delete/${medName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMedicamentsArray((prev) => prev.filter((med) => med.medName !== medName));
    } catch (error) {
      console.error('Error deleting medicament:', error);
    }
  };

  return (
    <Sheet sx={{ padding: '17px' }}>
      <Table
        aria-label="collapsible medication table"
        sx={{
          '& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)': { textAlign: 'right' },
          '& > tbody > tr:nth-child(odd) > td, & > tbody > tr:nth-child(odd) > th[scope="row"]': {
            borderBottom: 0,
          },
          padding: '2px',
          border: '1px #e2e2e9 solid',
          borderRadius: '8px',
        }}
      >
        <thead>
          <tr>
            <th style={{ width: 40 }} aria-label="empty" />
            <th style={{ width: '20%' }}>Medication</th>
            <th style={{ width: '25%' }}>Description</th>
            <th style={{ width: '15%' }}>Country</th>
            <th style={{ width: '20%' }}>Producer</th>
            <th style={{ width: '10%' }}>Price ($)</th>
          </tr>
        </thead>
        <tbody>
          {medicamentsArray.map((row, index) => (
            <Row key={row.medName} row={row} initialOpen={index === 0} onDelete={handleDelete} />
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
