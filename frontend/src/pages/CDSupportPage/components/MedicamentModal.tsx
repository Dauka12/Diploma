import axios from 'axios';
import React, { useEffect, useState } from 'react';
import base_url from '../../../base-url';
import './medicamentModal.css';

type MedicamentEntity = {
  id: number;
  medName: string;
};

interface MedicamentsModalProps {
  pharmacyId: number;
  onClose: () => void;
}

const MedicamentsModal: React.FC<MedicamentsModalProps> = ({ pharmacyId, onClose }) => {
  const [medicaments, setMedicaments] = useState<MedicamentEntity[]>([]);
  const [filteredMedicaments, setFilteredMedicaments] = useState<MedicamentEntity[]>([]);
  const [selectedMedicaments, setSelectedMedicaments] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const medicamentsResponse = await axios.get<MedicamentEntity[]>(`${base_url}/medicament/getAll`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMedicaments(medicamentsResponse.data);
        setFilteredMedicaments(medicamentsResponse.data);
      } catch (error) {
        console.error('Error fetching medicaments:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelect = (id: number) => {
    setSelectedMedicaments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSubmit = () => {
    const selectedIds = { medicament_id: Array.from(selectedMedicaments) };
    const token = localStorage.getItem('accessToken');

    axios.put(`${base_url}/pharmacyInfo/addNewMedicament/${pharmacyId}`, selectedIds, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    })
      .then(response => {
        console.log('Medicaments added:', response.data);
        onClose();
      })
      .catch(error => {
        console.error('Error adding medicaments:', error);
      });
  };

  const handleSearch = () => {
    const filtered = medicaments.filter(medicament => 
      medicament.medName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMedicaments(filtered);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Select Medicaments</h2>
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search medicaments"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <ul>
          {filteredMedicaments.map(medicament => (
            <li key={medicament.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedMedicaments.has(medicament.id)}
                  onChange={() => handleSelect(medicament.id)}
                />
                {medicament.medName}
              </label>
            </li>
          ))}
        </ul>
        <div className="modal-actions">
          <button onClick={handleSubmit}>Add Medicaments</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default MedicamentsModal;
