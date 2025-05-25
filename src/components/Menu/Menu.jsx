import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material';


const images = import.meta.glob('../../images/*/*.png', { eager: true });

const Menu = ({ food }) => {
  const imageModule = images[`../../images/${food.category}/${food.img}`];
  const imagePath = imageModule?.default;

    return (
     
        <Card sx={{ width: 345, height: 350,  m:3, 
             display: "flex",  
             flexDirection:'column', 
             justifyContent: "center", 
             alignItems: "center", 
             '&:hover': {
              boxShadow: 6
             }
             }}>
          <CardMedia
            sx={{ height: 200, 
            width: 200,          
            objectFit: 'cover' }}
            image={imagePath}
            title="food"
      />
        <CardContent sx={{ textAlign:'center'}}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontSize:15, fontWeight:600 }} >
            {food.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary'}}>
            {food.subtitle}
          </Typography>
          <Typography variant="h6" fontWeight='fontWeightBold'>
          {`$`}{ food.price}
          </Typography>
        </CardContent>
        </Card>
    );
};

export default Menu;