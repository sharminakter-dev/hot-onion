import { Container } from '@mui/system';
import React from 'react';
import Box from '@mui/material/Box';
import {Card, CardActions, CardContent, CardMedia, CardHeader } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { red, green } from '@mui/material/colors';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WhyCard from '../WhyCard/WhyCard';



const images = import.meta.glob('../../images/**/*.png', { eager: true });

// console.log(images);

const getImage = (fileName) => {
  const match = Object.entries(images).find(([key]) => key.endsWith(fileName));
  return match ? match[1].default : '';
};


const data = [
    {
      "icon":  getImage('icons/Group 204.png'),
      "img":  getImage('adult-blur-blurred-background-687824.png') ,
      "title": "Fast Delivery",
      "description": "Hot, fresh meals delivered in under 30 minutes with real-time tracking and responsive support."
    },
    {
      "icon":  getImage('icons/Group 1133.png'),
      "img": getImage('chef-cook-food-33614.png'),
      "title": "Professional Chefs",
      "description": "Expert chefs prepare every dish with premium ingredients and world-class techniques."
    },
    {
      "icon": getImage('icons/Group 245.png'),
      "img": getImage('architecture-building-city-2047397.png'),
      "title": "Fresh Ingredients, Bold Flavors",
      "description": "Enjoy meals made from farm-fresh ingredients with an ever-changing menu full of delicious variety."
    }
  ]

  // console.log(data);

const WhyChooseUs = () => {

    return (
        <Container sx={{mt:6, textAlign:'center'}}>
            <h2>Why You Choose Us</h2>
            <p style={{fontWeight:'500'}}>
                We’re not just delivering food  <br /> we’re delivering flavor, freshness, and reliability.
            </p>


        <Box sx={{display:'flex', justifyContent:'space-between', mt:2}}>
          { data.map(cardData	 => <WhyCard cardData={cardData}></WhyCard> )}
        </Box>


        </Container>
    );
};

export default WhyChooseUs;