import axios from 'axios';
import React, { useEffect, useState } from 'react';
import base_url from '../../../base-url';
import './userStyle.css';

type Role = {
  id: number;
  name: string;
};

type User = {
  id: number;
  username: string;
  userSecondname: string | null;
  userThirdname: string | null;
  iin: string;
  phone_number: string;
  imageUrl: string | null;
  roles: Role[];
};

const roleEndpoints: { [key: string]: string } = {
  ROLE_PHARMACY: `${base_url}/user/getPharmacies`,
  ROLE_DOCTOR: `${base_url}/user/getDoctors`,
  ROLE_ADMIN:  `${base_url}/user/getAdmins`,
  ROLE_USER: `${base_url}/user/getPatients`,
};

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('ROLE_USER');

  useEffect(() => {
    fetchUsers(selectedRole);
  }, [selectedRole]);

  const fetchUsers = async (role: string) => {
    try {
      const response = await axios.get(roleEndpoints[role]);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${base_url}/user/deleteById/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>User Management</h1>
        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
          <option value="ROLE_USER">User</option>
          <option value="ROLE_ADMIN">Admin</option>
          <option value="ROLE_DOCTOR">Doctor</option>
          <option value="ROLE_PHARMACY">Pharmacy</option>
        </select>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Second Name</th>
              <th>IIN</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.userSecondname}</td>
                <td>{user.iin}</td>
                <td>{user.phone_number}</td>
                <td>{user.roles[0]?.name}</td>
                <td>
                  <button className="button" onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="scroll-shadow" />
      </div>
    </div>
  );
};

export default UserTable;
