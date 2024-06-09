import Alert from '@mui/joy/Alert';
import CircularProgress from '@mui/joy/CircularProgress';
import Snackbar from '@mui/joy/Snackbar';
import axios from 'axios';
import React, { useState } from 'react';
import base_url from '../../../base-url';
import './style.css';

type Role = {
  id: number;
  name: string;
};

const roles: Role[] = [
  { id: 1, name: 'ROLE_USER' },
  { id: 2, name: 'ROLE_ADMIN' },
  { id: 3, name: 'ROLE_DOCTOR' },
  { id: 4, name: 'ROLE_PHARMACY' },
];

const CreateUser: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    userSecondName: '',
    userThirdName: '',
    password: '',
    confirmPassword: '',
    iin: '',
    phone_number: '',
    role_id: 1,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${base_url}/user/createUserByRole`, formData);
      console.log('User created:', response.data);
      setSuccess(true);
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="text-field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-field">
          <label htmlFor="userSecondName">Second Name</label>
          <input
            id="userSecondName"
            name="userSecondName"
            value={formData.userSecondName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-field">
          <label htmlFor="userThirdName">Third Name</label>
          <input
            id="userThirdName"
            name="userThirdName"
            value={formData.userThirdName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-field">
          <label htmlFor="iin">IIN</label>
          <input
            id="iin"
            name="iin"
            value={formData.iin}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-field">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="select-field">
          <label htmlFor="role_id">Role</label>
          <select
            id="role_id"
            name="role_id"
            value={formData.role_id}
            onChange={handleChange}
            required
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="button" disabled={loading}>
          {loading ? <CircularProgress size="sm" /> : 'Create User'}
        </button>
      </form>
      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert severity="success">User successfully created!</Alert>
      </Snackbar>
    </>
  );
};

export default CreateUser;
