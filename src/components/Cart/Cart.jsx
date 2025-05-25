import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, IconButton, Tooltip } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { grey } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../redux/slice/cartSlice';

const Cart = ({item}) => {

    const images = import.meta.glob('../../images/*/*.png', { eager: true });
    const imageModule = images[`../../images/${item.category}/${item.img}`];
    const imagePath = imageModule.default;
    // console.log(imagePath);
    const dispatch = useDispatch();
    const cart = useSelector(state=>state.cart);
    // console.log(cart);

    const handleIncrease = ()=>{
        dispatch(increaseQuantity(item.id));
    }
    const handleDecrease = ()=>{
        dispatch(decreaseQuantity(item.id));
    }

    const handleDelete = ()=>{
        dispatch(removeFromCart(item.id))
    }

    // console.log(cart.auth.user.email); 
    return (         
            //   cart
            <Card sx={{ 
                 width:'85%',
                 display: 'flex',
                 justifyContent:'center', 
                 alignItems:'center', 
                 mt:2 , 
                 boxShadow:'none',
                 backgroundColor: grey[100]
                }}>
                    {/*  Main Image */}
                    <CardMedia
                        component="img"
                        sx={{ width: 60, ml:4}}
                        image={imagePath}
                        alt="food"
                    />

                        <CardContent sx={{ 
                          width:'100%',
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'flex-start',
                           }}>
                            <Typography component="div" variant="h6" sx={{ fontSize:'0.65rem', textAlign:'start', width:'100px' }}>
                                {item.name}
                            </Typography>
                            <Typography
                                component="div" 
                                variant="h6"
                                sx={{ color: '#d32f2f', display:'flex', alignItems: 'center' }}
                            >
                                <AttachMoneyIcon fontSize='medium'/>
                                {item.price}
                            </Typography>

                            {item.price>15 && 
                            <Typography component="div" variant="h6" sx={{ fontSize:'0.65rem', color: 'text.secondary' }}>
                                free delivery
                            </Typography>
                            }

                        </CardContent> 
                        
                    {/*  cart quantity */}
                        <Box sx={{ 
                          display: 'flex',
                          flexDirection:'column',
                          alignItems:'center',
                         }}>
                            <CardContent sx={{
                                display:'flex', 
                                alignItems:'center', 
                                color:'black',          
                                }}>
                                <IconButton size="small" >
                                    <RemoveIcon fontSize="small" onClick={handleDecrease} />
                                </IconButton> 
                                <Typography  sx={{ 
                                    backgroundColor:'white', 
                                    px:2, borderRadius:'10px', 
                                    fontSize:'15px' }}>
                                        {item.quantity}
                                </Typography>
                                <IconButton size="small" >
                                    <AddIcon fontSize="small" onClick={handleIncrease} />
                                </IconButton>


                                 {/* remove from cart */}
                            
                            <Tooltip title="Remove item ">
                                <IconButton size="small" sx={{mx:2}} onClick={handleDelete} > 
                                    <DeleteOutlineIcon  fontSize="medium" sx={{color:'#d32f2f'}} />
                                </IconButton>
                            </Tooltip>

                            </CardContent> 
                            
                           
                        </Box>                        

                    
                  
            </Card>
    );
};

export default Cart;