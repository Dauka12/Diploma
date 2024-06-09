import Add from '@mui/icons-material/Add';
import { Autocomplete, Chip, TextField } from '@mui/joy';
import Button from '@mui/joy/Button';
import DialogTitle from '@mui/joy/DialogTitle';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import axios from 'axios';
import * as React from 'react';
import base_url from '../../../base-url';

interface Tag {
  id: number;
  tagName: string;
}

interface Patient {
  id: string;
  username: string;
}

interface SelectMultipleProps {
  tags: Tag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<number[]>>;
  selectedTags: Tag[];
}

interface SelectBasicProps {
  patients: Patient[];
  setSelectedPatientId: React.Dispatch<React.SetStateAction<string>>;
}

function SelectMultiple({ tags, setSelectedTags, selectedTags }: SelectMultipleProps) {
  const selectedTagObjects = tags.filter(tag => selectedTags.includes(tag.id));

  return (
    <Autocomplete
      multiple
      options={tags}
      value={selectedTagObjects}
      placeholder="Select drugs"
      getOptionLabel={(option: Tag) => option.tagName}
      filterSelectedOptions
      onChange={(event, newValue: Tag[]) => {
        setSelectedTags(newValue.map(tag => tag.id));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option: Tag, index: number) => (
          <Chip
            variant="soft"
            color="primary"
            label={option.tagName} // Fix: access tagName from option
            {...getTagProps({ index })}
          />
        ))
      }
    />
  );
}

function SelectBasic({ patients, setSelectedPatientId }: SelectBasicProps) {
  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setSelectedPatientId(newValue || '');
  };

  return (
    <Select defaultValue="0" placeholder="Select a patient" onChange={handleChange}>
      {patients.map((patient) => (
        <Option key={patient.id} value={patient.id}>
          {patient.username}
        </Option>
      ))}
    </Select>
  );
}

export default function BasicModalDialog() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<number[]>([]);
  const [selectPatientId, setSelectedPatientID] = React.useState<string>('');
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        const patientsResponse = await axios.get(`${base_url}/user/getPatients`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPatients(patientsResponse.data);

        const tagsResponse = await axios.get(`${base_url}/tag/getAll`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTags(tagsResponse.data);

      } catch (error) {
        console.error('Error fetching patients or tags:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');

      const data = {
        patientId: selectPatientId,
        tags: selectedTags
      };

      await axios.post(`${base_url}/prescription/create`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      setOpen(false);
      setSelectedTags([]);
      setSelectedPatientID('');
    } catch (error) {
      console.error('Error saving prescription:', error);
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        Add Prescription
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Create new prescription</DialogTitle>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <SelectBasic patients={patients} setSelectedPatientId={setSelectedPatientID} />
              <SelectMultiple tags={tags} setSelectedTags={setSelectedTags} selectedTags={selectedTags} />
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
