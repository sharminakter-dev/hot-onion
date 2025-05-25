import React from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router';

const images = import.meta.glob('../../images/*/*.png', { eager: true });

const SearchedFood = () => {
    const searchedFood = useSelector(state=>state.searchFood.filtered);
    console.log(searchedFood.length)
    return (
        <div style={{ display: 'flex', flexWrap:'wrap', justifyContent:'center' }}>

            {searchedFood.length<=0 &&
                <Typography variant="h5" height={400} mt={5} fontWeight='fontWeightBold' >
                    No such food
                </Typography>
            }

            {searchedFood.map(food=>(
                <Link to= {`/menu/${food.id}`} style={{textDecoration:'none'}}>
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
                        image={ images[`../../images/${food.category}/${food.img}`]?.default}
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
                </Link>
            ))}

        </div>
    );
};

export default SearchedFood;