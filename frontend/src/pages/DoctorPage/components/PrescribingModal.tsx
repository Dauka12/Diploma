import Add from '@mui/icons-material/Add';
import Button from '@mui/joy/Button';
import DialogTitle from '@mui/joy/DialogTitle';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import axios from 'axios';
import * as React from 'react';

function SelectMultiple({ tags, setSelectedTags }) {
  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: Array<string> | null,
  ) => {
    console.log(`You have choosen "${newValue}"`);
    setSelectedTags(newValue)
  };
  return (
    <Select
      defaultValue={['0']}
      multiple
      placeholder="Select a drugs"
      onChange={handleChange}
      sx={{
        minWidth: '13rem',
      }}
      slotProps={{
        listbox: {
          sx: {
            width: '100%',
          },
        },
      }}
    >
     {tags.map((tag) => (
        <Option key={tag.id} value={tag.id}>
          {tag.tagName}
        </Option>
      ))}
    </Select>
  );
}


function SelectBasic({ patients, setSelectedPatientId }) {
  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setSelectedPatientId(newValue)
  };
  return (
    <Select defaultValue="0" placeholder="Select a patient"  onChange={handleChange}>
      {patients.map((patient) => (
                <Option key={patient.id} value={patient.id} >
                  {patient.username}
                </Option>
              ))}
    </Select>
  );
}



export default function BasicModalDialog() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [patients, setPatients] = React.useState<any[]>([]);
  const [tags, setTags] = React.useState<any[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<number[]>([]);
  const [selectPatientId, setSelectedPatientID] = React.useState<string[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        // Fetch patients
        const patientsResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/getPatients`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPatients(patientsResponse.data);
        console.log(patientsResponse.data);
        

        // Fetch tags
        const tagsResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tag/getAll`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTags(tagsResponse.data);
        console.log(tagsResponse.data);
        
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
  
      // Создание объекта с данными для отправки
      const data = {
        patientId: selectPatientId,
        tags: selectedTags
      };
    
      // Отправка данных на сервер в формате JSON
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/prescription/create`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      console.log(response.data);
      
      
      // Очистка состояния формы
      setOpen(false);
      setSelectedTags([]);
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
              <SelectMultiple tags = {tags} setSelectedTags={setSelectedTags}/>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}