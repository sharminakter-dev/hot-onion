import React, { useEffect, useRef, useState } from "react";
import './Hero.css'
import banner from '../../images/bannerbackground.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import data from '../../data/data.json'
import { useDispatch, useSelector } from "react-redux";
import { setQuery, filterFood } from "../../redux/slice/searchFoodSlice";
import { useNavigate } from "react-router";


const Hero = ()=>{
    const dispatch = useDispatch();
    const {query, filtered} = useSelector(state=>state.searchFood);
    const inputRef = useRef(null);
    const navigate = useNavigate()

    const handleInput = (e)=>{
        dispatch(setQuery(e.target.value))
    }

    const handleSearch = ()=>{
        if(query!=''){
          dispatch(filterFood());
          navigate('/search');
        }else{
            inputRef.current.focus();
        }
    }
    const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if(query!=''){
        handleSearch();
        navigate('/search');
      }else{
        e.target.focus();
      }
    }
  };

    return(
        <div className="hero-components" style={{ height:'400px'}} >
            <div className='hero-contents'>
                <h2 style={{marginTop:"95px"}}>Best food waiting for your belly</h2>
                <Box>
                    <TextField 
                      id="outlined-basic" 
                      label="Search food items" 
                      variant="outlined" 
                      sx={{backgroundColor:"white"}} 
                      onChange={handleInput}
                      onKeyDown={handleKeyDown}
                      ref={inputRef} />
                    <Button variant="contained" color="error" sx={{height:'56px'}} onClick={handleSearch} > search</Button>
                </Box>    
            </div>
        </div>
    );
};

export default Hero;