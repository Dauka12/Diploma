import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import * as React from 'react';

interface Medication {
    name: string;
    dosage: number;
    frequency: string;
    sideEffects: string;
    price: number;
    history: History[];
  }
  
export default function MedicationForm() {
  const [medication, setMedication] = React.useState<Medication>({
    name: '',
    dosage: 0,
    frequency: '',
    sideEffects: '',
    price: 0,
    history: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMedication((prev) => ({
      ...prev,
      [name]: name === 'dosage' || name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = () => {
    console.log('New Medication:', medication);
    // Add logic to save medication to the database
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: 'max-content',
        maxWidth: '100%',
        mx: 'auto',
        // to make the demo resizable
        overflow: 'auto',
        resize: 'horizontal',
      }}
    >
      <Typography level="title-lg" startDecorator={<InfoOutlined />}>
        Add New Medication
      </Typography>
      <Divider inset="none" />
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
          gap: 1.5,
        }}
      >
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Medication Name</FormLabel>
          <Input name="name" value={medication.name} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Dosage (mg)</FormLabel>
          <Input
            name="dosage"
            type="number"
            value={medication.dosage}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Frequency</FormLabel>
          <Input
            name="frequency"
            value={medication.frequency}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Side Effects</FormLabel>
          <Input
            name="sideEffects"
            value={medication.sideEffects}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Price ($)</FormLabel>
          <Input
            name="price"
            type="number"
            value={medication.price}
            onChange={handleChange}
          />
        </FormControl>
        <CardActions sx={{ gridColumn: '1/-1' }}>
          <Button variant="solid" color="primary" onClick={handleSubmit}>
            Add Medication
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
