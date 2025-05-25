import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Cart from '../Cart/Cart';
import { Badge, Button, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import { formSubmit } from '../../redux/slice/formSlice';
import { clearCart } from '../../redux/slice/cartSlice';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const PlaceOrder = () => {
  const cartItems = useSelector(state=>state.cart);
  const user = useSelector(state=>state.auth.user);
  const [showError, setShowError] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  // console.log(cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemTotal = cartItems.reduce((acc, item) =>{
    acc.totalQuantity +=  item.quantity;
    acc.subTotal += item.price * item.quantity;
    return acc;
  }, {totalQuantity:0, subTotal:0 });

  itemTotal.subTotal = formatPrice(itemTotal.subTotal);
  const tax = formatPrice( 0.08 * itemTotal.subTotal);

  let delCharge = 5;
  

  if(itemTotal.subTotal >100){
    delCharge = 0;
  }else if (itemTotal.subTotal >50){
    delCharge = 2;
  }
  if(cartItems.length===0){
    delCharge = 0;
  }
  

  const grandTotal = formatPrice(itemTotal.subTotal + tax + delCharge);
  // console.log(typeof grandTotal);

  //Two decimal places
  function formatPrice(price) {
    return Number(price.toFixed(2));
  }
  const handleError = ()=>{
    dispatch(clearCart());
    sessionStorage.removeItem(`cart-${user.email}`);
  }
  // handlePlaceOrder
  const handlePlaceOrder = ()=>{
    if(isFormFilled){
      dispatch(clearCart());
      sessionStorage.removeItem(`cart-${user.email}`);
      navigate('/trackOrder');
    }else{
      setShowError(true);
    }
  }

  // delivery form
   const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(formSubmit(data));
    setIsFormFilled(true)
  }

  // console.log(watch()); // watch input value by passing the name of it

  const inpFieldstyle = {
    backgroundColor:grey[100],
    border: 'none',
    height:'40px',
    borderRadius:'5px', 
    paddingLeft: '20px'
  }

  const btn = {
    backgroundColor:'#d32f2f',
    color:'white',
    border: 'none',
    height:'40px',
    borderRadius:'5px', 
  }


  return (
      <Box sx={{ flexGrow: 1, p: 2, mt:2,}}>

          <Grid container spacing={2}  >

              <Grid size={7}>

              {/* delivery form using react hook */}
                <Item sx={{width:'60%', margin:'auto', boxShadow:'none'}}>
                  <Typography sx={{color:'black', textAlign:'start'}}>Edit delivery details</Typography>
                  <hr />
                  <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex', flexDirection:'column', gap:'5px'}} >

                    <input 
                      placeholder="Full Name" 
                      type='text' 
                      {...register("fullName",  { required: true })} 
                      style={inpFieldstyle} disabled={isFormFilled} />
                    <input 
                      placeholder="Phone Number" 
                      type='tel' 
                      // pattern=''
                      {...register("phoneNumber", { required: true })} 
                      style={inpFieldstyle} disabled={isFormFilled} />
                    <input 
                      placeholder="Street Address" 
                      type='text'
                      {...register("streetAddress", { required: true })} 
                      style={inpFieldstyle} disabled={isFormFilled} />
                    <input 
                      placeholder="Area " 
                      type='text'
                      {...register("Area", { required: true })} 
                      style={inpFieldstyle} disabled={isFormFilled} />
                    <input 
                      placeholder="City" 
                      type='text'
                      {...register("City", { required: true })} 
                      style={inpFieldstyle} disabled={isFormFilled} />
                    <input 
                      placeholder="Postal Code / ZIP " 
                      type='text'
                      {...register("postalCode", { required: true })} 
                      style={inpFieldstyle} disabled={isFormFilled} />

                      <input 
                      placeholder="Delivery Instructions" 
                      type='text'
                      {...register("instruction", { required: false })} 
                      style={inpFieldstyle} disabled={isFormFilled} />

                    {/* errors will return when field validation fails  */}
                    {errors.fullName && <Typography color="error">Full Name is required</Typography>}
                    {errors.phoneNumber && <Typography color="error">Phone Number is required</Typography>}
                    {errors.streetAddress && <Typography color="error">Street Address is required</Typography>}
                    {errors.Area && <Typography color="error">Area is required</Typography>}
                    {errors.City && <Typography color="error">City is required</Typography>}
                    {errors.postalCode && <Typography color="error">Postal Code is required</Typography>}

                    { !isFormFilled && 
                      <input  type="submit" value="Save & Continue" style={btn} />
                    }{ isFormFilled && 
                      <input value="submitted" style={{
                        backgroundColor:'#4caf50', 
                        color:'white', 
                        border: 'none', 
                        height:'40px',
                        textAlign:'center',
                        borderRadius:'5px',}} disabled />
                    }
                  </form>
                </Item>
              </Grid>

              {/* card */}
              <Grid size={5} >
              <Item sx={{boxShadow:'none', ml:4 }}>

                {/* devilery Info */}
                <Box sx={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'flex-start',
                    
                }}>
                    <Typography  component="div"  variant="body2" >From <b>gulshan plaza restaura GPR</b> </Typography>
                    <Typography  component="div"  variant="body2" > Ariving in 20-30 min </Typography>
                    <Typography  component="div"  variant="body2" >  107 Rd No 8 </Typography>
                </Box>



                {/* cart */}
                <div style={{maxHeight: '340px', overflowY:'scroll'}}>
                  {cartItems.map(item=> <Cart key={item.id} item={item} /> )}
                </div>
                {cartItems.length ?
                  <Button color='error' variant="contained" size='small' sx={{mt:1, mr:4}} onClick={handleError} >Remove all</Button>
                  :null
                }

                {/* price */}
                <Box sx={{ display:'flex', justifyContent:'space-between', width:'75%', mt:3}}>

                  <Typography  component="div"  variant="body2" sx={{ display:'flex'}} > 
                    <p>SubTotal </p>
                    <Badge color="error" variant="dot" sx={{mx:1, mt:3}}>
                    </Badge>
                    <p> {itemTotal.totalQuantity} item </p>
                    </Typography>                   
                  <Typography  component="div"  variant="body1" sx={{textAlign:'start', width:'70px', mt:2 }} >
                     $ {itemTotal.subTotal} 
                     </Typography>

                </Box>

                <Box sx={{ display:'flex', justifyContent:'space-between',  width:'75%'}}>
                  <Typography  component="div"  variant="body2" > Tax </Typography>
                  <Typography  component="div"  variant="body1" sx={{textAlign:'start', width:'70px' }} > $ {tax} </Typography>
                </Box>
                <Box sx={{ display:'flex', justifyContent:'space-between', width:'75%'}}>
                  <Typography  component="div"  variant="body2" > Delivery fee </Typography>
                  <Typography  component="div"  variant="body1" sx={{textAlign:'start', width:'70px' }} > $ {delCharge} </Typography>
                </Box>
                <Box sx={{ display:'flex', justifyContent:'space-between',  width:'75%'}}>
                  <Typography  component="div"  variant="body2" > 
                      <b>Total</b> 
                  </Typography>
                  <Typography  component="div"  variant="body1" sx={{textAlign:'start', width:'70px' }} > 
                    <b>$ {grandTotal}</b> 
                  </Typography>
                </Box>

                <Button sx={{backgroundColor: grey[400], color:'white', width:'85%', mt:3, mr:10 , ml:0}} onClick={handlePlaceOrder} > 
                  Place order
                </Button>  

              </Item>
              </Grid>
              {showError &&
              <Typography color='error' sx={{margin:'auto'}} > 
                Please fill out all delivery information before placing the order.
              </Typography>
              }
          </Grid>
      </Box>
    );
};

export default PlaceOrder;