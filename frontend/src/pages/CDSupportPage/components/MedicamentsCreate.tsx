import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CircularProgress from '@mui/joy/CircularProgress';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Snackbar from '@mui/joy/Snackbar';
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import * as React from 'react';
import base_url from '../../../base-url';
import SelectMultiple from './SelectMultiple.tsx';

interface Medication {
  medName: string;
  description: string;
  country: string;
  producer: string;
  category: number[];
  price: number;
  tags: number[];
  imageUrl?: string;
}

interface Tag {
  id: number;
  tagName: string;
}

interface Category {
  id: number;
  name: string;
}

const MedicationForm: React.FC = () => {
  const [medication, setMedication] = React.useState<Medication>({
    medName: '',
    description: '',
    country: '',
    producer: '',
    price: 0,
    category: [],
    tags: []
  });
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<number[]>([]);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const [tagsResponse, categoriesResponse] = await Promise.all([
          axios.get(`${base_url}/tag/getAll`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${base_url}/category/getAll`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setTags(tagsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching tags and categories:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMedication((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      let imageUrl = '';
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const imageResponse = await axios.post(`${base_url}/image/uploadImage`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });

        imageUrl = imageResponse.data.url;
      }

      await axios.post(`${base_url}/medicament/create`, {
        ...medication,
        imageUrl,
        tags: selectedTags,
        category: selectedCategories
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess(true);
      setMedication({
        medName: '',
        description: '',
        country: '',
        producer: '',
        price: 0,
        category: [],
        tags: []
      });
      setSelectedTags([]);
      setSelectedCategories([]);
      setImageFile(null);
    } catch (error) {
      console.error('Error adding medication:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setMedication((prev) => ({
      ...prev,
      category: selectedCategories,
      tags: selectedTags,
    }));
  }, [selectedCategories, selectedTags]);

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          maxHeight: 'max-content',
          maxWidth: '100%',
          mx: 'auto',
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
            <Input name="medName" value={medication.medName} onChange={handleChange} />
          </FormControl>
          <FormControl sx={{ gridColumn: '1/-1' }}>
            <FormLabel>Description</FormLabel>
            <Input name="description" value={medication.description} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Input name="country" value={medication.country} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Producer</FormLabel>
            <Input name="producer" value={medication.producer} onChange={handleChange} />
          </FormControl>
          <FormControl sx={{ gridColumn: '1/-1' }}>
            <FormLabel>Select Tags</FormLabel>
            <SelectMultiple items={tags} setSelectedItems={setSelectedTags} placeholder="Select tags" selectedItems={selectedTags} />
          </FormControl>
          <FormControl sx={{ gridColumn: '1/-1' }}>
            <FormLabel>Select Categories</FormLabel>
            <SelectMultiple items={categories} setSelectedItems={setSelectedCategories} placeholder="Select categories" selectedItems={selectedCategories} />
          </FormControl>
          <FormControl>
            <FormLabel>Price ($)</FormLabel>
            <Input name="price" type="number" value={medication.price} onChange={handleChange} />
          </FormControl>
          <FormControl sx={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <FormLabel>Upload Image</FormLabel>
            <Input type="file" onChange={handleImageChange} sx={{ border: '4px solid #e2e2e9', padding: '8px', borderRadius: '12px', width: '100%' }} />
          </FormControl>
          <CardActions sx={{ gridColumn: '1/-1' }}>
            <Button variant="solid" color="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? <CircularProgress size="sm" /> : 'Add Medication'}
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Medication successfully created!</Alert>
      </Snackbar>
    </>
  );
}

export default MedicationForm;
