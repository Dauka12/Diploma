import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import base_url from '../../../base-url';
import MapPicker from './GoogleMap.tsx';
import './pharmacyStyle.css';

type MedicamentEntity = {
  id: number;
  name: string;
};

type PharmacyInfo = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  pharmacyId: number;
  city: string;
  medicamentEntities: MedicamentEntity[];
};

const PharmacyTable: React.FC = () => {
  const [pharmacies, setPharmacies] = useState<PharmacyInfo[]>([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [city, setCity] = useState('');
  const [pharmacyId, setPharmacyId] = useState('');
  const [loading, setLoading] = useState(false);
  const [addedPharmacyId, setAddedPharmacyId] = useState<number | null>(null);

  useEffect(() => {
    axios.get<PharmacyInfo[]>(`${base_url}/pharmacyInfo/getAll`)
      .then(response => {
        setPharmacies(response.data);
        console.log(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const createPharmacy = () => {
    setLoading(true);
    const newPharmacy = {
      name,
      address,
      latitude,
      longitude,
      city,
      pharmacyId: parseInt(pharmacyId),
      medicamentEntities: [],
    };

    axios.post(`${base_url}/pharmacyInfo/create`, newPharmacy)
      .then(response => {
        setPharmacies([...pharmacies, response.data]);
        setLoading(false);
        setTimeout(() => setAddedPharmacyId(null), 2000); // Reset the added pharmacy indicator after 2 seconds
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleLocationSelect = useCallback((lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  }, []);

  return (
    <div className="container">
      <h1>Pharmacy Management</h1>
      <div className="form">
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={useCallback(e => setName(e.target.value), [])} 
          className="input"
        />
        <input 
          type="text" 
          placeholder="Address" 
          value={address} 
          onChange={useCallback(e => setAddress(e.target.value), [])} 
          className="input"
        />
        <input 
          type="text" 
          placeholder="City" 
          value={city} 
          onChange={useCallback(e => setCity(e.target.value), [])} 
          className="input"
        />
        <input 
          type="text" 
          placeholder="PharmacyUserId" 
          value={pharmacyId} 
          onChange={useCallback(e => setPharmacyId(e.target.value), [])} 
          className="input"
        />
        <MapPicker onLocationSelect={handleLocationSelect} />
        <button className="button" onClick={createPharmacy} disabled={loading}>
          {loading ? <div className="spinner"></div> : 'Add Pharmacy'}
        </button>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Pharmacy ID</th>
              <th>Name</th>
              <th>Pharmacy User ID</th>
            </tr>
          </thead>
          <tbody>
            {pharmacies.map(pharmacy => (
              <tr key={pharmacy.id} className={pharmacy.id === addedPharmacyId ? 'highlight' : ''}>
                <td>{pharmacy.id}</td>
                <td>{pharmacy.name}</td>
                <td>{pharmacy.pharmacyId.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PharmacyTable;
