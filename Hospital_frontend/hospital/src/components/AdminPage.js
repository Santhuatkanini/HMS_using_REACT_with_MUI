import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {Box,Typography,Table,TableContainer,TableHead,TableRow,TableCell,TableBody,Button,} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    
    const isLoggedIn = localStorage.getItem('token');

    if (!isLoggedIn) {
     
      navigate('/login');
    } else {
      
      fetchUsersData();
    }
  }, [navigate, location]);

  const fetchUsersData = async () => {
    try {
      const response = await fetch('https://localhost:7095/api/Auth/users');
      if (response.ok) {
        const users = await response.json();
        const doctorData = users.filter((user) => user.role === 'DOCTOR');
        const patientData = users.filter((user) => user.role === 'PATIENT');
        setDoctors(doctorData);
        setPatients(patientData);
      } else {
        console.error('Failed to fetch users data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getFullName = (user) => {
    return `${user.firstName} ${user.lastName}`;
  };

  const handleEnable = (user) => {
    
    const updatedUser = { ...user, status: 'Active' };
   
    fetch(`https://localhost:7095/api/Auth/enable/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.ok) {
          
          const updatedDoctors = doctors.map((doctor) => (doctor.id === user.id ? updatedUser : doctor));
          setDoctors(updatedDoctors);
          console.log('User enabled');
          toast.success('User enabled');
        } else {
          console.error('Failed to enable user');
          toast.error('Failed to enable user');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Error occurred');
      });
  };

  const handleDisable = (user) => {
    
    const updatedUser = { ...user, status: 'Inactive' };
  
    fetch(`https://localhost:7095/api/Auth/disable/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.ok) {
          
          const updatedDoctors = doctors.map((doctor) => (doctor.id === user.id ? updatedUser : doctor));
          setDoctors(updatedDoctors);
          console.log('User disabled');
          toast.success('User disabled');
        } else {
          console.error('Failed to disable user');
          toast.error('Failed to disable user');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Error occurred');
      });
      };

      const handleDelete = (user) => {
       
        fetch(`https://localhost:7095/api/Auth/users/${user.id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
             
              const updatedDoctors = doctors.filter((doctor) => doctor.id !== user.id);
              const updatedPatients = patients.filter((patient) => patient.id !== user.id);
              setDoctors(updatedDoctors);
              setPatients(updatedPatients);
              console.log('User deleted');
              toast.success('User deleted');
            } else {
              console.error('Failed to delete user');
              toast.error('Failed to delete user');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            toast.error('Error occurred');
          });

  };

  return (
    <Box textAlign="center" paddingTop="50px">
      <Typography variant="h3" component="h1" marginBottom="20px">
        Welcome Admin!
      </Typography>

      <ToastContainer />

      <Box marginBottom="20px">
        <Typography variant="h5" component="h2">
          Doctors
        </Typography>
        {doctors.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '33%' }}>Name</TableCell>
                  <TableCell style={{ width: '33%' }}>Email</TableCell>
                  <TableCell style={{ width: '33%' }}>Status</TableCell>
                  <TableCell style={{ width: '33%' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {doctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell style={{ width: '33%' }}>{getFullName(doctor)}</TableCell>
                    <TableCell style={{ width: '33%' }}>{doctor.email}</TableCell>
                    <TableCell style={{ width: '33%' }}>{doctor.status}</TableCell>
                    <TableCell style={{ width: '33%' }}>
                      {/* Actions buttons */}
                      <Box display="flex" justifyContent="center">
                        <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => handleEnable(doctor)}>
                          Enable
                        </Button>
                        <Button variant="contained" color="secondary" style={{ marginRight: '10px' }} onClick={() => handleDisable(doctor)}>
                          Disable
                        </Button>
                        <Button variant="contained" color="error" style={{ marginRight: '10px' }} onClick={() => handleDelete(doctor)}>
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No doctors found.</Typography>
        )}
      </Box>

      <Box>
        <Typography variant="h5" component="h2">
          Patients
        </Typography>
        {patients.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '33%' }}>Name</TableCell>
                  <TableCell style={{ width: '33%' }}>Email</TableCell>
                  <TableCell style={{ width: '33%' }}>Status</TableCell>
                  <TableCell style={{ width: '33%' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell style={{ width: '33%' }}>{getFullName(patient)}</TableCell>
                    <TableCell style={{ width: '33%' }}>{patient.email}</TableCell>
                    <TableCell style={{ width: '33%' }}>{patient.status}</TableCell>
                    <TableCell style={{ width: '33%' }}>
                      {/* Actions buttons */}
                      <Box display="flex" justifyContent="center">
                        <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => handleEnable(patient)}>
                          Enable
                        </Button>
                        <Button variant="contained" color="secondary" style={{ marginRight: '10px' }} onClick={() => handleDisable(patient)}>
                          Disable
                        </Button>
                        <Button variant="contained" color="error" onClick={() => handleDelete(patient)}>
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No patients found.</Typography>
        )}
      </Box>
    </Box>
  );
}

export default AdminPage;
