import React from 'react';
import { Container, Typography, Grid, Box, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import john from '../utils/4.jpg'
import jane from '../utils/5.jpg'
import mic from '../utils/3.jpg'

const AboutUsPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>About Us</Typography>
        <Typography variant="body1" align="center">
        Our healthcare organization is dedicated to serving the healthcare needs of individuals and communities. With a team of highly skilled healthcare professionals, we offer a wide range of medical services, from primary care to specialized treatments. Our focus is on delivering patient-centered care that emphasizes empathy, respect, and collaboration.
        </Typography>
        <Typography variant="body1" align="center">
        We prioritize preventive care, recognizing the importance of early detection and intervention in maintaining good health. Through education and outreach programs, we aim to empower individuals to take an active role in managing their health and well-being.
        </Typography>
        <Typography variant="body1" align="center">
        We are committed to medical innovation and staying at the forefront of advancements in healthcare. We leverage cutting-edge technology and evidence-based practices to deliver the most effective treatments and interventions. Our team is continuously learning and adapting to provide the best possible care to our patients.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: '2rem',textAlign:'justify' }}>
            <Typography variant="h5" gutterBottom>Our Mission</Typography>
            <Typography variant="body1">
            Our mission is to provide high-quality, compassionate healthcare services to improve the well-being and overall health of individuals and communities. We strive to deliver personalized care, promote preventive measures, and enhance access to healthcare for all.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: '2rem', textAlign:'justify' }}>
            <Typography variant="h5" gutterBottom>Our Vision</Typography>
            <Typography variant="body1">
            Our vision is to be a leading healthcare organization dedicated to excellence in care, innovation, and community wellness. We aspire to be recognized for our commitment to advancing healthcare services and empowering individuals to lead healthier lives.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>Meet Our Team</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: '2rem', textAlign: 'center' }}>
              <img src={jane} alt="Team Member 1" width="150" height="150" />
              <Typography variant="h6" gutterBottom>John Doe</Typography>
              <Typography variant="body2" color="textSecondary">CEO</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: '2rem', textAlign: 'center' }}>
              <img src= {john} alt="Team Member 2" width="150" height="150" />
              <Typography variant="h6" gutterBottom>Jane Smith</Typography>
              <Typography variant="body2" color="textSecondary">CTO</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: '2rem', textAlign: 'center' }}>
              <img src={mic} alt="Team Member 3" width="150" height="150" />
              <Typography variant="h6" gutterBottom>Michael Johnson</Typography>
              <Typography variant="body2" color="textSecondary">COO</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ paddingBottom: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>Contact Us</Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary="Phone: +91 4469044000" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Email: transformations@kanini.com" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Address: Rattha Tek Meadows, Tower A, 1st Floor
                                    51, Rajiv Gandhi Salai (OMR)
                                    Sholinganallur, Chennai _600119
                                    Tamil Nadu, India" />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default AboutUsPage;
