import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import { FaBriefcaseMedical, FaMandalorian, FaRunning, FaUserNurse } from "react-icons/fa";
import { TbBed } from "react-icons/tb";
import { FcAbout} from "react-icons/fc";
import { Outlet } from "react-router-dom";
import { Container } from '@mui/material';
import { FaAccessibleIcon, FaAmbulance} from "react-icons/fa";
import { GiCherish, } from "react-icons/gi";
import { Paper} from '@mui/material'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {CardActionArea, CardActions, Grid } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import alvin from '../utils/2.jpg';
import chetna from '../utils/3.jpg';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import hospital1 from '../utils/c1.jpg';
import hospital2 from '../utils/c2.jpg';
import hospital3 from '../utils/c3.jpg';
import hospital4 from '../utils/c4.jpg';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import GenderPieChart from '../GenderPieChart/GenderPieChart';
import { Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Blink from './ReactBlinkText';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[600],
    },
  },
});


const drawerWidth = 240;

const data = [{ name: 'Doctor', uv: 128, pv: 2400, amt: 2400 },
    { name: 'Patient', uv: 368, pv: 2400, amt: 2400 },
    { name: 'Bed', uv: 142, pv: 2400, amt: 2400 },
    { name: 'Ambulance', uv: 120, pv: 2400, amt: 2400 },];

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function NewHeader() {
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    

    return (
        <Box sx={{ display: 'flex', background: '#F6F6F6' }} >
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar style={{ background: '#fff', color: '#000' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6"
                        fontFamily={'Roboto'}
                        noWrap component='div' sx={{ width: '90%', display: 'flex', justifyContent: 'center' }}>
                        Hospital Management System
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Toolbar style={{ color: '#000' }}>
                        <Typography variant="h6" noWrap> SanthuCare </Typography>
                        <FaMandalorian style={{ fontSize: '1.5rem', marginLeft: '20px' }} />
                    </Toolbar>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <List>
                    <NavLink to="/welcome" style={{ textDecoration: 'none', width: '100%', color: '#000' }}>
                        <ListItem disablePadding>
                            <ListItemButton style={{ borderRadius: '0 40px 40px 0' }}>
                                <ListItemIcon>
                                    <FaBriefcaseMedical style={{ color: '#000', fontSize: '1.5rem' }} />
                                </ListItemIcon>
                                <ListItemText primary="Register" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>

                    <NavLink to="/login" style={{ textDecoration: 'none', width: '100%', color: '#000' }}>
                        <ListItem disablePadding>
                            <ListItemButton style={{ borderRadius: '0 40px 40px 0' }}>
                                <ListItemIcon>
                                    <FaUserNurse style={{ color: '#000', fontSize: '1.5rem' }} />
                                </ListItemIcon>
                                <ListItemText primary="Doctor Login" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>

                    <NavLink to="/login" style={{ textDecoration: 'none', width: '100%', color: '#000' }}>
                        <ListItem disablePadding>
                            <ListItemButton style={{ borderRadius: '0 40px 40px 0' }}>
                                <ListItemIcon>
                                    <TbBed style={{ color: '#000', fontSize: '1.5rem' }} />
                                </ListItemIcon>
                                <ListItemText primary="Patient Login" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>

                    <NavLink to="/login" style={{ textDecoration: 'none', width: '100%', color: '#000' }}>
                        <ListItem disablePadding>
                            <ListItemButton style={{ borderRadius: '0 40px 40px 0' }}>
                                <ListItemIcon>
                                    <FaRunning style={{ color: '#000', fontSize: '1.5rem' }} />
                                </ListItemIcon>
                                <ListItemText primary="Admin Login" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>

                    <NavLink to="/about" style={{ textDecoration: 'none', width: '100%', color: '#000' }}>
                        <ListItem disablePadding>
                            <ListItemButton style={{ borderRadius: '0 40px 40px 0' }}>
                                <ListItemIcon>
                                    <FcAbout style={{ color: '#000', fontSize: '1.5rem' }} />
                                </ListItemIcon>
                                <ListItemText primary="About Us" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                </List>
            </Drawer>


            <Main open={open}>
                <DrawerHeader />
                <Container maxWidth='lg'>
                <Blink>  </Blink>

                <Carousel
                showThumbs={false}
                showStatus={false}
                autoPlay={true}
                infiniteLoop={true}
                interval={3000}>
                    
                    
                    <img src={hospital1} alt="Carousel Slide 2" />
                   
                    <img src={hospital2} alt="Carousel Slide 1" />
                   
                    <img src={hospital3} alt="Carousel Slide 2" />
                    
                    <img src={hospital4} alt="Carousel Slide 2" />
                    
                </Carousel>
                    <br/>
                <Grid container direction="column" alignItems="center">
                    <Typography variant="h4" component="h2"  margin= "10" >
                        Our Specialists:
                    </Typography>
                <Grid
                    container
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    sx={{
                        margin: "2rem 0",
                        padding: "3rem 1rem",
                        background: "#fff",
                        borderRadius: "0.5rem",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}
                    >

                        
      
          <Card elevation={1}>
            <CardActionArea>
              <CardMedia component="img" height="160"
                image="https://media.istockphoto.com/id/1470505351/photo/portrait-of-a-smiling-doctor-holding-glasses-and-a-mobile-phone-at-the-office.jpg?s=1024x1024&w=is&k=20&c=7qEjVevQHDkL8dPHuwJ3uRVGH4uOOljLhCtSq4vsA-Q="
                alt="dr.jeeva"/>

              <CardContent sx={{ textAlign: "left" }}>
                <Typography gutterBottom variant="h6" component="div">
                  Dr. Jeevanandh
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} >
                  Speciality: Oncologist
                </Typography>
                <Typography variant="body2" color="text.secondary"sx={{ mb: 1 }} >
                  Gender: Male
                </Typography>
              </CardContent>
            </CardActionArea>
            <Divider />
            <CardActions sx={{ display: "flex", justifyContent: "center", color: "#999",}}>
              <AccessTimeIcon sx={{ mr: 2 }} />
              <Typography> 10 AM to 4 PM</Typography>
            </CardActions>
          </Card>

          <Card elevation={1}>
            <CardActionArea>
              <CardMedia component="img" height="160"
                image= {alvin}
                alt="dr. alvin"/>

              <CardContent sx={{ textAlign: "left" }}>
                <Typography gutterBottom variant="h6" component="div">
                  Dr. Alvin T Jose
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} >
                  Speciality: CARDIO SURGEON
                </Typography>
                <Typography variant="body2" color="text.secondary"sx={{ mb: 1 }} >
                  Gender: Male
                </Typography>
              </CardContent>
            </CardActionArea>
            <Divider />
            <CardActions sx={{ display: "flex", justifyContent: "center", color: "#999",}}>
              <AccessTimeIcon sx={{ mr: 2 }} />
              <Typography> 3 PM to 8 PM</Typography>
            </CardActions>
          </Card>

          
          <Card elevation={3}>
            <CardActionArea>
              <CardMedia component="img" height="160"
                image={chetna}
                alt="dr.chetna"/>

              <CardContent sx={{ textAlign: "left" }}>
                <Typography gutterBottom variant="h6" component="div">
                  Dr. Chetna Shekhawat
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} >
                  Speciality: OPTHAMOLOGIST
                </Typography>
                <Typography variant="body2" color="text.secondary"sx={{ mb: 1 }} >
                  Gender: Female
                </Typography>
              </CardContent>
            </CardActionArea>
            <Divider />
            <CardActions sx={{ display: "flex", justifyContent: "center", color: "#999",}}>
              <AccessTimeIcon sx={{ mr: 2 }} />
              <Typography> 9 AM to 3 PM</Typography>
            </CardActions>
          </Card>

          <Card elevation={3}>
            <CardActionArea>
              <CardMedia component="img" height="160"
                image = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
                alt="dr.dhyan"/>

              <CardContent sx={{ textAlign: "left" }}>
                <Typography gutterBottom variant="h6" component="div">
                  Dr. Dhyan N
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} >
                  Speciality: ENT SPECIALIST
                </Typography>
                <Typography variant="body2" color="text.secondary"sx={{ mb: 1 }} >
                  Gender: Female
                </Typography>
              </CardContent>
            </CardActionArea>
            <Divider />
            <CardActions sx={{ display: "flex", justifyContent: "center", color: "#999",}}>
              <AccessTimeIcon sx={{ mr: 2 }} />
              <Typography> 9 AM to 12 PM</Typography>
            </CardActions>
          </Card>

    </Grid>
    </Grid>

    
      <Box >
      <Box sx={{
        display: 'flex',
        justifyContent : {xs:'center', sm:'center', md:'space-around', lg:'space-around', xl:'center'},
        alignItems: 'center',
        gap: '1rem 2.6rem',
        flexWrap: 'wrap',
        width: '100%',
        fontFamily:'monospace',
        marginBottom: '40px' 

      }}>


            <BarChart width={400} height={300} data={data}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
                <Bar dataKey="uv" fill="#8884d8" barSize={30} />
            </BarChart>
            <GenderPieChart></GenderPieChart>
       

        <Paper elevation={2} sx={{ padding: '1rem', width:'14rem',}} >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            
            <div>
              <GiCherish style={{
                fontSize: '3rem',
                color: '#22577E',
                border: '2px solid #22577E',
                borderRadius: '20%',
                padding: '5px'
              }} />
            </div>
            <div>
              <Typography sx={{ fontWeight: '800' }}>128</Typography>
              <p>Doctors</p>
            </div>
          </Box>
          <Typography>
            3 doctors joined today
          </Typography>
        </Paper>
        <Paper elevation={2} sx={{ padding: '1rem', width:'14rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div>
              <FaAccessibleIcon style={{
                fontSize: '3rem',
                color: '#125B50',
                border: '2px solid #125B50',
                borderRadius: '20%',
                padding: '5px'
              }} />
            </div>
            <div>
              <Typography sx={{ fontWeight: '800' }}>155K</Typography>
              <p>Patients</p>
            </div>
          </Box>
          <Typography>
            35 new patients admitted
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ padding: '1rem', width:'14rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div>
              <TbBed style={{
                fontSize: '3rem',
                color: '#0E3EDA',
                border: '2px solid #0E3EDA',
                borderRadius: '20%',
                padding: '5px'
              }} />
            </div>
            <div>
              <Typography sx={{ fontWeight: '800' }}>142</Typography>
              <p>Beds</p>
            </div>
          </Box>
          <Typography>
            10 beds Available
          </Typography>
        </Paper>
        <Paper elevation={2} sx={{ padding: '1rem', width:'14rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div>
              <FaAmbulance style={{
                fontSize: '3rem',
                color: '#B33030',
                border: '2px solid #B33030',
                borderRadius: '20%',
                padding: '5px'
              }} />
            </div>
            <div>
              <Typography sx={{ fontWeight: '800' }}>120</Typography>
              <p>Ambulance</p>
            </div>
          </Box>
          <Typography>
            19 Ambulance In service
          </Typography>
        </Paper>
      </Box>

    </Box>

   

    <Outlet />
    </Container>
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ background: '#333', padding: '1rem', color: '#FFF' }}>
        <Grid item>
          <Typography variant="body2" color="inherit" component="span">
            &copy; 2023 Santhosh's  HealthcareWebsite. All rights reserved.
          </Typography>
          <InsertEmoticonIcon fontSize="small" style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }} />
        </Grid>
        <Grid item>
          <Link href="https://www.facebook.com" target="_blank" rel="noopener" color="inherit">
            <IconButton color="inherit">
              <FacebookIcon />
            </IconButton>
          </Link>
          <Link href="https://www.instagram.com" target="_blank" rel="noopener" color="inherit">
            <IconButton color="inherit">
              <InstagramIcon />
            </IconButton>
          </Link>
          <Link href="https://www.linkedin.com" target="_blank" rel="noopener" color="inherit">
            <IconButton color="inherit">
              <LinkedInIcon />
            </IconButton>
          </Link>
        </Grid>
      </Grid>
    </ThemeProvider>
    </Main>
    </Box>
    );
}