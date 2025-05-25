import React from 'react';
import Menu from '../Menu/Menu';
import "./Categories.css";
import data from '../../data/data.json'
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router';



//   console.log(data);

const Categories = () => {
    const [category, setCategory] = useState('lunch');

    const onClickHandler = (e)=>{
        e.preventDefault();
        const category = e.target.name;
        setCategory(category);
    }
    // console.log(category);
    return (
        <div style={{marginTop:'50px'}}>
            <div className='categories'>
                <a  href="" className= {`tabs ${category==='breakfast'? 'active': ''}`} name='breakfast' 
                   onClick={(e)=>{onClickHandler(e)}} >Breakfast</a>
                <a href=""  className= {`tabs ${category==='lunch'? 'active': ''}`}  name='lunch' 
                    onClick={(e)=>{onClickHandler(e)}} >Lunch</a>
                <a href=""  className= {`tabs ${category==='dinner'? 'active': ''}`} name='dinner' 
                    onClick={(e)=>{onClickHandler(e)}} >Dinner</a>
            </div>
            <Box  sx={{ display: 'flex', flexWrap:'wrap', justifyContent:'center' }}>
                {data.filter(food=>food.category===category)
                    .map(food=>(
                        <Link to= {`/menu/${food.id}`} style={{textDecoration:'none'}}>
                            <Menu key={food.id} food={food} />
                        </Link>
                    ))}
            </Box> 

            <Typography gutterBottom variant="h5" component="div" sx={{display:'flex', justifyContent:'center'}}>
                <Button variant="contained" sx={{ color: 'text.secondary', backgroundColor:grey[400]}}>Checkout your Food</Button>
            </Typography>
        </div>
    );
};

export default Categories;