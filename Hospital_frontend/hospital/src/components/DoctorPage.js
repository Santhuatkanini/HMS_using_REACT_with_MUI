import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {Box,Typography,Button,Grid,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DoctorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [fullName, setFullName] = useState("");
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [makeFormVisible, setMakeFormVisible] = useState(false);
  const [viewFormVisible, setViewFormVisible] = useState(false);
  const [cancelFormVisible, setCancelFormVisible] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");

    if (!isLoggedIn) {
      navigate("/login");
    } else {
      fetchUsersData();
    }
  }, [navigate, location]);

  const fetchUsersData = async () => {
    try {
      const response = await fetch("https://localhost:7095/api/Auth/users");
      if (response.ok) {
        const usersData = await response.json();

        const loggedInUser = usersData.find(
          (user) =>
            user.email.toLowerCase() ===
            localStorage.getItem("loggedInUserEmail")?.toLowerCase()
        );

        if (loggedInUser) {
          const { firstName, lastName } = loggedInUser;
          const fullName = `${firstName} ${lastName}`;
          setFullName(fullName);
          document.title = `Welcome ${fullName}!!!`;
        } else {
          console.error("Logged-in user not found");
        }
      } else {
        console.error("Failed to fetch users data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleApproveAppointment = async (id) => {
    try {
      const response = await fetch(
        `https://localhost:7095/api/Appointment/update-status/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: "APPOINTMENT FIXED" }),
        }
      );

      if (response.ok) {
        toast.success("Appointment approved successfully");
        console.log("Appointment approved successfully");
        fetchAppointments();
      } else {
        toast.error("Failed to approve appointment");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  const handleCancelAppointment = async (id) => {
    try {
      const response = await fetch(
        `https://localhost:7095/api/Appointment/update-status2/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: "APPOINTMENT CANCELLED" }),
        }
      );

      if (response.ok) {
        toast.success("Appointment Cancelled successfully");
        console.log("Appointment Cancelled successfully");
        fetchCancelAppointments();
      } else {
        toast.error("Failed to approve appointment");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  const handleFormVisibility = (makeVisible, viewVisible, cancelVisible) => {
    setMakeFormVisible(makeVisible);
    setViewFormVisible(viewVisible);
    setCancelFormVisible(cancelVisible);
    setWelcomeVisible(false);

    if (makeVisible) {
      fetchViewAppointments();
    }

    if (viewVisible) {
      fetchAppointments();
    }
    if (cancelVisible) {
      fetchCancelAppointments();
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch("https://localhost:7095/api/Appointment", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const appointmentsData = await response.json();
        const filteredAppointments = appointmentsData.filter(
          (appointment) => appointment.status === "Appointment Pending"
        );
        setAppointments(filteredAppointments);
      } else {
        console.error("Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchViewAppointments = async () => {
    try {
      const response = await fetch("https://localhost:7095/api/Appointment", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const appointmentsData = await response.json();
        setAppointments(appointmentsData);
      } else {
        console.error("Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchCancelAppointments = async () => {
    try {
      const response = await fetch("https://localhost:7095/api/Appointment", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const appointmentsData = await response.json();
        const filteredAppointments = appointmentsData.filter(
          (appointment) =>
            appointment.status === "Appointment Pending" ||
            appointment.status === "Appointment Fixed"
        );
        setAppointments(filteredAppointments);
      } else {
        console.error("Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function getStatusBackgroundColor(status) {
    switch (status) {
      case "Appointment Pending":
        return "yellow";
      case "Appointment Fixed":
        return "lightgreen";
      case "Appointment Cancelled":
        return "red";
      default:
        return "transparent";
    }
  }

  return (
    <Box>
      <br />
      <Box sx={{ border: "1px solid black", padding: "15px" }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ marginBottom: "20px", textAlign: "center" }}
        >
          {fullName ? `Welcome,Dr. ${fullName}!` : "Doctor !!"}
        </Typography>
      </Box>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Box
            sx={{
              borderRight: "1px solid #ccc",
              paddingRight: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{ marginBottom: "10px" }}
              onClick={() => handleFormVisibility(true, false, false)}
            >
              View My Appointments
            </Button>

            <Button
              variant="outlined"
              color="primary"
              sx={{ marginBottom: "10px" }}
              onClick={() => handleFormVisibility(false, true, false)}
            >
              Approve My Appointments
            </Button>

            <Button
              variant="outlined"
              color="primary"
              sx={{ marginBottom: "10px" }}
              onClick={() => {
                handleFormVisibility(false, false, true);
                fetchCancelAppointments();
              }}
            >
              Cancel My Appointments
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={9}>
          {welcomeVisible && (
            <>
              <Typography
                variant="h4"
                component="h1"
                sx={{ marginBottom: "20px", textAlign: "center" }}
              >
                Doctor's Dashboard
              </Typography>
              <Typography
                variant="h6"
                component="h1"
                sx={{ marginBottom: "20px", textAlign: "center" }}
              >
                You can check the available Appointments and make an appointment
                with them in the hospital
              </Typography>
            </>
          )}

          {makeFormVisible && (
            <>
              <Typography
                variant="h6"
                component="h1"
                sx={{ marginBottom: "20px", textAlign: "center" }}
              >
                View My Appointments
              </Typography>
              {appointments.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Appointment ID</TableCell>
                        <TableCell>Patient Name</TableCell>
                        <TableCell>Time Slot</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {appointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>{appointment.id}</TableCell>
                          <TableCell>{appointment.patientName}</TableCell>
                          <TableCell>{appointment.timeSlot}</TableCell>
                          <TableCell>{appointment.reason}</TableCell>
                          <TableCell>
                            <div
                              style={{
                                backgroundColor: getStatusBackgroundColor(
                                  appointment.status
                                ),
                                padding: "8px",
                                borderRadius: "4px",
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
                <Typography variant="subtitle2">
                  No appointments found
                </Typography>
              )}
            </>
          )}

          {viewFormVisible && (
            <>
              <Typography
                variant="h6"
                component="h1"
                sx={{ marginBottom: "20px", textAlign: "center" }}
              >
                Approve Appointments
              </Typography>
              {appointments.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Appointment ID</TableCell>
                        <TableCell>Patient Name</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell>Time Slot</TableCell>
                        <TableCell>Action</TableCell>{" "}
                        {/* Added Action column */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {appointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>{appointment.id}</TableCell>
                          <TableCell>{appointment.patientName}</TableCell>
                          <TableCell>{appointment.reason}</TableCell>
                          <TableCell>{appointment.timeSlot}</TableCell>
                          <TableCell>
                            {appointment.status === "Appointment Fixed" ? (
                              <Button
                                variant="contained"
                                color="success"
                                enabled
                              >
                                APPROVED
                              </Button>
                            ) : (
                              <Button
                                variant="outlined"
                                color="success"
                                onClick={() =>
                                  handleApproveAppointment(appointment.id)
                                }
                              >
                                Approve
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ marginBottom: "20px", textAlign: "center" }}
                >
                  No appointments available
                </Typography>
              )}
            </>
          )}

          {cancelFormVisible && (
            <>
              <Typography
                variant="h6"
                component="h1"
                sx={{ marginBottom: "20px", textAlign: "center" }}
              >
                View My Appointments
              </Typography>
              {appointments.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Appointment ID</TableCell>
                        <TableCell>Patient Name</TableCell>
                        <TableCell>Time Slot</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {appointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>{appointment.id}</TableCell>
                          <TableCell>{appointment.patientName}</TableCell>
                          <TableCell>{appointment.timeSlot}</TableCell>
                          <TableCell>{appointment.reason}</TableCell>
                          <TableCell>
                            <div
                              style={{
                                backgroundColor: getStatusBackgroundColor(
                                  appointment.status
                                ),
                                padding: "8px",
                                borderRadius: "4px",
                              }}
                            >
                              {appointment.status}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() =>
                                handleCancelAppointment(appointment.id)
                              }
                            >
                              Cancel
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="subtitle2">
                  No appointments found
                </Typography>
              )}
            </>
          )}
        </Grid>
      </Grid>

      <ToastContainer />
    </Box>
  );
}

export default DoctorPage;
