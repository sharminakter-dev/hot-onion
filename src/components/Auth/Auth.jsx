import React, { useEffect, useState } from 'react';
import { FormControl, TextField, Checkbox, Input, FormHelperText, InputLabel, Button, Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import logo2 from '../../images/logo2.png';
import bannerbackground from '../../images/bannerbackground.png';
import { useDispatch, useSelector } from 'react-redux';
import { signin, signup, toggleNewUser } from '../../redux/slice/authSlice';
import './firebase.config';
import './authManager'
import { createNewUser, facebookSignIn, googlesignIn, resetPassword, signInUser } from './authManager';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import GoogleIcon from '@mui/icons-material/Google';
import { useLocation, useNavigate } from 'react-router';
import { clearCart, setCart } from '../../redux/slice/cartSlice';
import store, { loadCartFromSession } from "../../redux/store/store";

const Auth = () => {
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const user = useSelector(state=>state.auth.user);
  let isNewUser = useSelector(state=>state.auth.isNewUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from?.pathname|| '/';
  const navigate = useNavigate();



  // form submission
  const handlesubmit = (e)=>{
    e.preventDefault();
    // const name  = user.name;
    const email = formData.email;
    const password = formData.password;
    // createNewUser
    if(isNewUser){
      createNewUser(formData.name, email, password)
      .then(res=>{
       handleResponse(res, true);
    })
    }
    if(!isNewUser){
      signInUser(email, password)
      .then(res=>{
        handleResponse(res, true)
      })
    }
  }

  // handleFaceBookLogIn
  const handleFaceBookLogIn = ()=>{
    facebookSignIn()
    .then(res=>{
     handleResponse(res, true)
    })
  }

   // handleGoogleLogIn
  const handleGoogleLogIn = ()=>{
    googlesignIn()
    .then(res=>{
      handleResponse(res, true)
    })
  }

  const handleResponse = (res, redirect)=>{
    dispatch(signin(res));
    dispatch(clearCart());
    const userCart = loadCartFromSession(res.email);
    dispatch(setCart(userCart));
    if(redirect){
      navigate(from, {replace: true});
    }
   
  }

  // input validation
  const handlleOnBlur=(e)=>{
    let isValidField = true;
    // email
    if(e.target.name==='email'){
      let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      isValidField = regex.test(e.target.value);
    }
    // password
    if(e.target.name==='password'){
      const passLength = e.target.value.length>=6;
      const passHasNum = /\d/.test(e.target.value);
      const passHasUppercase = /[A-Z]/.test(e.target.value);
      isValidField = passLength && passHasNum && passHasUppercase;
    }
    // confirmPassword
    if(e.target.name==='confirmPassword'){
      isValidField = e.target.value === formData.password;    
    }
    if(isValidField){
      const newUserInfo = {...formData};
      newUserInfo[e.target.name] = e.target.value;
      setFormData(newUserInfo)
      // dispatch(updateField({fieldName:e.target.name, value:e.target.value}));
    }
  }

// console.log(formData.email);
  return ( 
  <div style={{ 
    height:'600px', 
    backgroundImage:`url(${bannerbackground})`,
    backgroundSize: 'cover',         // fills entire box
    backgroundPosition: 'center',    // centers the image
    backgroundRepeat: 'no-repeat' }}>
      <Box
          sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb:5,
          }}>
              <img src={logo2} alt="logo" width='200px' style={{marginTop:'20px'}} />
      </Box>
      <form style={{
          display:'flex', 
          flexDirection:'column',
          justifyContent:'center', 
          alignItems:'center', 
          gap:'5px',
          }}
          onSubmit={handlesubmit}>

          {
            isNewUser &&
             <TextField 
              label="Name"
              name='name'
              type="text"
              variant="outlined" 
              sx={{backgroundColor:grey[200]}} 
              onChange={handlleOnBlur}
              required/>
          }
         
          <TextField  
              label="email" variant="outlined" 
              sx={{backgroundColor:grey[200]}} 
              name='email'
              type="email"
              onChange={handlleOnBlur}
              required />
          <TextField    
            label="password" 
            variant="outlined" 
            sx={{backgroundColor: grey[200]}}
            name='password' 
            type="password"
            onChange={handlleOnBlur}
            required/>

          {
            isNewUser && 
            <TextField 
            label="confirm password" 
            variant="outlined" 
            sx={{backgroundColor: grey[200]}} 
            name='confirmPassword'
            type="password"
            onChange={handlleOnBlur}
            required/>
          }

        
          <Button 
            type="submit"  
            variant="contained" 
            color="error"
            sx={{width:'225px'}}> { isNewUser?`sign up`:'sign in'}
          </Button>
          {!isNewUser &&
          <a  style={{marginTop:'10px', color:'red', textDecoration:'underline', cursor:'pointer'}}  
           onClick={()=>{resetPassword(formData.email)}}>  
           forgot Password?
        </a>
          }
        <a  style={{marginTop:'10px', color:'blue', textDecoration:'underline', cursor:'pointer'}}  
           onClick={()=>{dispatch(toggleNewUser())}}>  
           { isNewUser?'Already have an account?':'create a new account?'}
        </a>
       
        <Typography color='error' mt={2} > {user.error} </Typography>

      </form>
      {/* hr line */}
      <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        gap:'10px',
        margin: '20px auto',
        width:'20%'
      }}>
        <hr style={{backgroundColor:'black', height:'1px', flex:1}} />
        <p style={{margin: 0 }}>or</p>
        <hr style={{backgroundColor:'black', height:'1px', flex:1}} />
      </div>
      
      {/* social login buttons */}
      <Box sx={{display:'flex', justifyContent:'center', flexDirection:'column', gap:'5px'}}>
        <Button 
          variant="outlined" 
          sx={{
            margin:'auto', 
            borderRadius:'20px',
            backgroundColor:'#1877F2',
            color:'white',
            '&:hover':{backgroundColor: '#145DBF'},
            width:'275px'
            }}
            onClick={handleFaceBookLogIn}>

              <FacebookTwoToneIcon sx={{mr:2, }}/>
              Continue with Facebook
            </Button>

          <Button 
            variant="outlined" 
            sx={{
              margin:'auto', 
              borderRadius:'20px',
              backgroundColor:'#DB4437',
              color:'white',
              '&:hover':{backgroundColor: '#C33D2E'},
              width:'275px'
              }}
              onClick={handleGoogleLogIn}>

              <GoogleIcon sx={{mr:2 }}/>
              Continue with Google
          </Button>
      </Box>
      
      </div>
  );
};

export default Auth;