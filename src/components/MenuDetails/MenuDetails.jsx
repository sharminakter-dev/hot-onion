import React, { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import data from '../../data/data.json';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, IconButton } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slice/cartSlice';





const images = import.meta.glob('../../images/*/*.png', { eager: true });
// console.log(images);


const MenuDetails = () => {
    const {id} = useParams();
    const quantityRef = useRef(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menu = data.find(item => item.id===parseInt(id));
    // console.log(menu);
    const menuCategory = data.filter(item=>item.category===menu.category);
    // console.log(menuCategory);
    const imageModule = images[`../../images/${menu.category}/${menu.img}`];
    const imagePath = imageModule?.default;




    //cart
    const handleIncrease = ()=>{
       quantityRef.current +=1;
       forceUpdate();// to refresh UI
    }

    const handleDecrease = ()=>{
        if(quantityRef.current>1){
            quantityRef.current -=1;
            forceUpdate();// to refresh UI
        }
    }

    const handleAddToCart = ()=>{
       const item = {...menu, quantity: quantityRef.current};
       dispatch(addToCart(item));
        navigate('/placeorder');
    }

    // Rerender trick since useRef doesn't update component
    const [,setRerender] = React.useState(0);
    const forceUpdate = ()=>setRerender(prev=>prev+1);


    // preview image
    const [selected, setSelected] = useState(0);
    const [ visibleStart, setVisibleStart ] = useState(0);

    const visibleThumbnails = menuCategory.slice(visibleStart, visibleStart+2);

    const handleNext = ()=>{
    if(visibleStart+2 < menuCategory.length){
        setVisibleStart(visibleStart+1);
    }
    }

    const handlePrev = ()=>{
        if(visibleStart>0){
            setVisibleStart(visibleStart-1);
        }
    }


    return (
        <Box sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
          }}>
            <Card sx={{ display: 'flex',
                 height:'500px', 
                 width:'80%' , 
                 justifyContent:'center', 
                 alignItems:'center', 
                 mt:2 , boxShadow:'none', 
                 border:'none'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:'space-evenly', width:'45%'}}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                {menu.name}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ color: 'text.secondary' }}
                            >
                                {menu.description}
                            </Typography>
                            <Box sx={{display:'flex', mt:2}}>
                                 <Typography  component="div" variant="h4"  sx={{ display: "flex", alignItems: "center"}}>
                                    <AttachMoneyIcon fontSize='large'/>
                                    {menu.price}                                    
                                </Typography>

                                {/*  cart quantity */}
                                <Box sx={{
                                  ml:4, 
                                  display:'flex', 
                                  alignItems:'center', 
                                  color:'black',
                                  width:'110px', 
                                  border:'1px solid grey', 
                                  borderRadius: "999px",
                                  px:1
                                  }}>
                                    <IconButton size="small" >
                                        <RemoveIcon  sx={{color:'#dc3545ed'}} onClick={handleDecrease} />
                                    </IconButton> 
                                    <Typography  sx={{ mx:2 }}>{quantityRef.current}</Typography>
                                    <IconButton size="small" >
                                        <AddIcon sx={{color:'#dc3545'}} onClick={handleIncrease} />
                                    </IconButton>
                                </Box>
                            </Box>

                            <Button 
                              variant="outlined" 
                              size="large" 
                              sx={{mt:4, color:'white', backgroundColor:'#dc3545', border:'none' , borderRadius: "999px"}}
                              onClick={handleAddToCart}>
                                <ShoppingCartOutlined/>
                                <Typography component="div" variant="p" sx={{ mx:2}}>Add</Typography>
                            </Button>

                            {/* Thumbnails */}
                            <Box sx={{display:'flex', mt:5}} >
                                <IconButton onClick={handlePrev} disabled={visibleStart===0} >
                                     <ArrowBackIosIcon />
                                </IconButton>
                                
                                {visibleThumbnails.map((food, idx)=>{
                                    const realIndex = visibleStart + idx;
                                    return(
                                        <Box 
                                         key={realIndex}
                                         onClick={()=> setSelected(realIndex)}
                                         sx={{
                                            width: 70,
                                            height: 70,
                                            overflow: 'hidden',
                                            mx: 1,
                                            border: realIndex === selected ? '2px solid #F91944' : '2px solid transparent',
                                            cursor: 'pointer',
                                        }}>

                                        <img src={images[`../../images/${food.category}/${food.img}`]?.default} alt="" 
                                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                                        </Box>
                                    );
                                })}

                                <IconButton>
                                    <ArrowForwardIosIcon onClick={handleNext} disabled={visibleStart+2===menuCategory.length} />
                                </IconButton>

                            </Box>
                           

                        </CardContent>  
                    </Box>
                    {/*  Main Image */}
                    <CardMedia
                        component="img"
                        sx={{ width: 400, ml:4}}
                        image={imagePath}
                        alt="food"
                    />
            </Card>
    </Box>
    );
};

export default MenuDetails;