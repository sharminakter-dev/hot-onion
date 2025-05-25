import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import logo2 from "../../images/logo2.png";
import { Link } from 'react-router';
import { Badge } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setNewUser, signout } from '../../redux/slice/authSlice';
import { signOutUser } from '../Auth/authManager';
import { clearCart } from '../../redux/slice/cartSlice';


const Header = () => {
    const isSignedIn = useSelector(state=>state.auth.isSignedIn);
    const userEmail = useSelector(state=>state.auth.user.email);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart);
 
    // handle logout using firebase
    const handleSignOut = () =>{
        dispatch(clearCart());
        signOutUser()
        .then(res=> {
            dispatch(signout(res));
        });
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1, width:"100%"}}>
                <AppBar position="static" sx={{backgroundColor:"white", color:"black", }}>
                    <Toolbar>                       
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to='/' >
                                <img src={logo2} alt="logo2" style={{width:"80px", height:"25px"}} />
                            </Link>
                        </Typography>
                        <Link to='/placeorder' >
                            <Badge badgeContent={isSignedIn&&cartItems.length>0?cartItems.length:null} color="primary" sx={{mr:2}}>
                                <ShoppingCartOutlined sx={{color:'black'}}/>
                            </Badge>
                        </Link>
                        
                        <Link to='/auth'>
                        {!isSignedIn && (
                            <>
                                <Button color="inherit" sx={{mr:1}} onClick={()=>{dispatch(setNewUser(false))}} >Login</Button>
                                <Button variant="contained" color="error" onClick={()=>{dispatch(setNewUser(true))}} > SignUp</Button>
                            </>
                        )
                        }
                        {isSignedIn &&
                            <Button variant="contained"  color="error" onClick={handleSignOut} > Logout</Button>
                        }
                        </Link>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default Header;