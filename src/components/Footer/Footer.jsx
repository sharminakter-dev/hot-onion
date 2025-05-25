import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import { List, ListSubheader, ListItem, ListItemText } from '@mui/material';
import logo from '../../images/logo.png';
import { grey } from '@mui/material/colors';


const Footer = () => {

    const liStyle = {
                        color: 'grey.500',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        '&:hover': {
                            color: 'white',
                            textDecoration: 'underline',
                        }
                    }

    return (
        <Container sx={{backgroundColor:'black', color:'white', height:'400px'}} >
            <Grid 
              container 
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{m:3, padding: '2.5rem' }}>
                <Grid  xs={12}  md={5}  >
                    <img src={logo} alt="" style={{width:'120px'}} />
                </Grid>
                <Grid item  xs={12} md={7}>
                    <Box display="flex" justifyContent="space-between">
                        <List>
                            <ListSubheader sx={{backgroundColor:'black', color:'white'}} >
                               About Us
                            </ListSubheader>

                             <ListItem>
                                <Typography sx={liStyle}> About Red Onion Foods </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography sx={liStyle}> Careers </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography sx={liStyle}> Our Blog </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography sx={liStyle}> Contact Us </Typography>
                            </ListItem>
                        </List>

                        <List  sx={{ml:5}}>
                             <ListSubheader sx={{backgroundColor:'black', color:'white'}} >
                               Services
                            </ListSubheader>

                            <ListItem>
                                <Typography sx={liStyle}> Sign Up to Deliver </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography sx={liStyle}> Add Your Restaurant </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography sx={liStyle}> Track Your Order </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography sx={liStyle}> Corporate Catering </Typography>
                            </ListItem>                   
                        </List>
                    </Box>
                </Grid>
            </Grid>


            <Grid
             container 
             sx={{
                display:'flex',
                justifyContent:'space-between',
                mx:5
             }}>
                <Grid item xs={6} md={5}>
                    <Typography sx={{ color: grey[500], fontSize:'.60rem'}}>Copyright© 2025 Red Onion Foods</Typography>
                </Grid>
                <Grid item xs={6} md={7}
                  sx={{display:'flex', justifyContent:'flex-end'}}>
                    <Typography  sx={{ ml: 2,  fontSize:'.75rem', fontWeight: 200 }}>Privacy Policy</Typography>
                    <Typography  sx={{ ml: 2,  fontSize:'.75rem', fontWeight: 200 }}>Terms of Use</Typography>
                    <Typography  sx={{ ml: 2,  fontSize:'.75rem', fontWeight: 200 }}>Pricing</Typography>
                </Grid>
            </Grid>
        </Container>
      
    );
};

export default Footer;