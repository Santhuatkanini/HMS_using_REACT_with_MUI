import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {Box, Typography, Button, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem,} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PatientPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [fullName, setFullName] = useState('');
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [makeFormVisible, setMakeFormVisible] = useState(false);
  const [viewFormVisible, setViewFormVisible] = useState(false);
  const [cancelFormVisible, setCancelFormVisible] = useState(false);
  const [appointments, setAppointments] = useState([]); 

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('token');

    if (!isLoggedIn) {
      // User is not logged in, redirect to login page
      navigate('/login');
    } else {
      // Fetch the logged-in patient's data
      fetchUsersData();
      fetchAppointments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, location]);

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
   
  }, [appointments]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('https://localhost:7095/api/Appointment', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.ok) {
        const appointmentsData = await response.json();
  
        // Fetch the doctor details for each appointment
        const doctorIds = appointmentsData.map((appointment) => appointment.doctorId);
        const doctorsData = await fetchDoctorsByIds(doctorIds);
  
        // Update the appointments data with doctor names
        const appointmentsWithDoctors = appointmentsData.map((appointment) => {
          const doctor = doctorsData.find((doctor) => doctor.id === appointment.doctorId);
          const doctorName = doctor ? getFullNameWithSalutation(doctor) : 'Unknown Doctor';
          return {
            ...appointment,
            doctorName: doctorName,
          };
        });
  
        setAppointments(appointmentsWithDoctors);
      } else {
        console.error('Failed to fetch appointments data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const fetchDoctorsByIds = async (doctorIds) => {
    try {
      const response = await fetch(`https://localhost:7095/api/Auth/users?ids=${doctorIds.join(',')}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Failed to fetch doctors data');
        return [];
      }
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };
  

  const fetchUsersData = async () => {
    try {
      const response = await fetch('https://localhost:7095/api/Auth/users');
      if (response.ok) {
        const usersData = await response.json();

        // Find the logged-in user's data
        const loggedInUser = usersData.find(
          (user) => user.email.toLowerCase() === localStorage.getItem('loggedInUserEmail')?.toLowerCase()
        );

        if (loggedInUser) {
          const { firstName, lastName } = loggedInUser;
          const fullName = `${firstName} ${lastName}`;
          setFullName(fullName);
          document.title = `Welcome ${fullName}!!!`;
        } else {
          console.error('Logged-in user not found');
        }
      } else {
        console.error('Failed to fetch users data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      // Make an API request to fetch doctors data with role "DOCTOR"
      const response = await fetch('https://localhost:7095/api/Auth/users?role=DOCTOR', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const filteredDoctors = data.filter((doctor) => doctor.role === 'DOCTOR');
        setDoctors(filteredDoctors);
      } else {
        // Handle error response
        console.log('Error:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle network error
      console.log('Error:', error.message);
    }
  };

  const handleAppointment = async (doctor) => {
    try {
      // Fetch the logged-in patient's data
      const response = await fetch('https://localhost:7095/api/Auth/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        const loggedInUser = userData.find(
          (user) => user.email.toLowerCase() === localStorage.getItem('loggedInUserEmail')?.toLowerCase()
        );

        if (loggedInUser) {
          const { firstName, lastName } = loggedInUser;
          const patientName = `${firstName} ${lastName}`;

          // Prepare the appointment data
          const appointmentData = {
            doctorId: doctor.id,
            patientName: patientName,
            reason: selectedReasons[doctor.id],
            timeSlot: selectedTimeSlots[doctor.id],
          };

          // Make an API request to create the appointment
          const appointmentResponse = await fetch('https://localhost:7095/api/Appointment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(appointmentData),
          });

          if (appointmentResponse.ok) {
            // Appointment created successfully
            toast.success('Appointment created successfully');
            console.log('Appointment created:', appointmentData);
            
             // Add the newly created appointment to the existing appointments state
             const newAppointment = {
              ...appointmentData,
              doctorName: getFullNameWithSalutation(doctor),
              status: 'Appointment Pending', // Assuming the initial status is "Scheduled"
            };
            setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);

          } else {
            // Handle error response
            const errorData = await appointmentResponse.json();
            const errorMessage = errorData.message || 'Failed to create appointment';
            toast.error(errorMessage);
            console.log('Error:', appointmentResponse.status);
            // You can show the error message to the user
          }
        } else {
          console.error('Logged-in user not found');
        }
      } else {
        // Handle error response
        console.log('Error:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle network error
      console.log('Error:', error.message);
    }
  };

  const handleFormVisibility = (makeVisible, viewVisible, cancelVisible) => {
  
    setMakeFormVisible(makeVisible);
    setViewFormVisible(viewVisible);
    setCancelFormVisible(cancelVisible);
    setWelcomeVisible(false);

  };

  const getFullNameWithSalutation = (doctor) => {
    const { salutation, firstName, lastName } = doctor;
    return `${salutation} ${firstName} ${lastName}`;
  };

  const reasonOptions = ['Consultation', 'Check-up', 'Treatment'];

  const timeSlotOptions = ['10 am', '11 am', '12 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm'];

  const [selectedReasons, setSelectedReasons] = useState({});
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({});

  const handleReasonChange = (event, doctor) => {
    const { value } = event.target;
    setSelectedReasons((prevSelectedReasons) => ({
      ...prevSelectedReasons,
      [doctor.id]: value,
    }));
  };

  const handleTimeSlotChange = (event, doctor) => {
    const { value } = event.target;
    setSelectedTimeSlots((prevSelectedTimeSlots) => ({
      ...prevSelectedTimeSlots,
      [doctor.id]: value,
    }));
  };


  const handleCancelAppointment = async (appointmentId) => {
    try {
      fetchAppointments();
      console.log(appointmentId)

      const response = await fetch(`https://localhost:7095/api/Appointment/${appointmentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.ok) {
        // Appointment canceled successfully
        toast.success('Appointment Cancelled Successfully');
        console.log('Appointment canceled:', appointmentId);
  
        // Remove the canceled appointment from the appointments state
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== appointmentId)
        );
  
        // You can perform further actions or show a success message to the user
      } else {
        
        console.log('Error:', response.status);
        // You can show the error message to the user
      }
    } catch (error) {
      // Handle network error
      console.log('Error:', error.message);
    }
  };

  function getStatusBackgroundColor(status) {
    switch (status) {
      case 'Appointment Pending':
        return 'yellow';
      case 'Appointment Fixed':
        return 'lightgreen';
      case 'Appointment Cancelled':
        return 'red';
      default:
        return 'transparent';
    }
  }
  
  
  
  
  return (
    <Box>
      <br />
      <Box sx={{ border: '1px solid black', padding: '15px' }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: '20px', textAlign: 'center' }}>
        {fullName ? `Welcome, ${fullName}!` : 'Patient Page'}
      </Typography>
      </Box>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Box
            sx={{
              borderRight: '1px solid #ccc',
              paddingRight: '10px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{ marginBottom: '10px' }}
              onClick={() => handleFormVisibility(true, false, false)}
            >
              Make Appointment
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ marginBottom: '10px' }}
              onClick={() => handleFormVisibility(false, true, false)}
            >
              View My Appointments
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ marginBottom: '10px' }}
              onClick={() => handleFormVisibility(false, false, true)}
            >
              Cancel Appointment
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={9}>
          {welcomeVisible && (
            <>
              <Typography variant="h4" component="h1" sx={{ marginBottom: '20px', textAlign: 'center' }}>
                Patient's Dashboard
              </Typography>
              <Typography variant="h6" component="h1" sx={{ marginBottom: '20px', textAlign: 'center' }}>
                You can check the available doctors and make an appointment with them in the hospital
              </Typography>
            </>
          )}

          {makeFormVisible && (
            <>
              {doctors.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">Reason</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">Time Slot</Typography>
                        </TableCell>
                        <TableCell>Appointment</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {doctors.map((doctor) => (
                        <TableRow key={doctor.id}>
                          <TableCell>{getFullNameWithSalutation(doctor)}</TableCell>
                          <TableCell>{doctor.email}</TableCell>
                          <TableCell>
                            <Select
                              value={selectedReasons[doctor.id] || ''}
                              onChange={(event) => handleReasonChange(event, doctor)}
                              fullWidth
                              sx={{ minWidth: '150px' }}
                            >
                              <MenuItem value="">Select Reason</MenuItem>
                              {reasonOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={selectedTimeSlots[doctor.id] || ''}
                              onChange={(event) => handleTimeSlotChange(event, doctor)}
                              fullWidth
                              sx={{ minWidth: '150px' }}
                            >
                              <MenuItem value="">Select Time Slot</MenuItem>
                              {timeSlotOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              disabled={!selectedReasons[doctor.id] || !selectedTimeSlots[doctor.id]}
                              onClick={() => handleAppointment(doctor)}
                            >
                              Make Appointment
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="subtitle2">No doctors available</Typography>
              )}
            </>
          )}

{viewFormVisible && (
  <>
    {appointments.length > 0 ? (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Doctor Name</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Time Slot</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.doctorName}</TableCell>
                <TableCell>{appointment.patientName}</TableCell>
                <TableCell>{appointment.timeSlot}</TableCell>
                <TableCell>{appointment.reason}</TableCell>
                <TableCell>
                  <div
                    style={{
                      backgroundColor: getStatusBackgroundColor(appointment.status),
                      padding: '8px',
                      borderRadius: '4px',
                    }}
                  >
                    {appointment.status}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <Typography variant="subtitle2">No appointments found</Typography>
    )}
  </>
)}

{cancelFormVisible && (
        <>
          {appointments.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Doctor Name</TableCell>
                    <TableCell>Time Slot</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment) => {
                    const doctor = doctors.find((doctor) => doctor.id === appointment.doctorId);
                    const doctorName = doctor ? `${doctor.firstName} ${doctor.lastName}` : '';

                    return (
                      
                      <TableRow key={appointment.id}>
                        <TableCell>{doctorName}</TableCell>
                        <TableCell>{appointment.timeSlot}</TableCell>
                        <TableCell>{appointment.reason}</TableCell>
                        <TableCell>
                          <div
                            style={{
                              backgroundColor: getStatusBackgroundColor(appointment.status),
                              padding: '8px',
                              borderRadius: '4px',
                            }}
                          >
                            {appointment.status}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleCancelAppointment(appointment.id)}
                          >
                            Cancel Appointment
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="subtitle2">No appointments found</Typography>
          )}
        </>
      )}

        </Grid>
      </Grid>

      <ToastContainer />
    </Box>
  );
}

export default PatientPage;
