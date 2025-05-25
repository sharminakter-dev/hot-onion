import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import map from '../../images/map.jpg';
import userImg from '../../images/icons/Group 2.png'
import riderLogo from '../../images/Group 1152.png';
import deliveryMan from '../../images/Group 1151.png'
import { Badge, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useSelector } from 'react-redux';
const TrackOrder = () => {
    const formData = useSelector(state=>state.deliveryForm);
    const user = useSelector(state=>state.auth.user);
    console.log(user)

    return (
        <div style={{height:'600px', textAlign:'center'}} >
            <h1>Your order has been placed</h1>
            <div style={{display:'flex', justifyContent:'space-around', marginTop:'2rem'}}>
                {/* map image */}
                <img src={map} alt="" width="600" height="500" />

                {/* contact card */}
                <Card sx={{ maxWidth: 345, borderRadius:'5px', backgroundColor:grey[100]}}>
                    <CardMedia
                        sx={{ height: 55, width:60 , ml:'2rem', mt:'1rem'}}
                        image={deliveryMan}
                        title="deliveryMan"
                    />
                    <CardContent>
                        <Box sx={{backgroundColor:'white', width:'200px', borderRadius:'5px', gap:'5px', textAlign:'start'}} >
                            <div style={{marginLeft:'10px'}}>
                                <img src={userImg} alt="" width="30" height="30" style={{marginTop:'10px'}} />
                                <Typography sx={{fontSize:'13px'}}> <b>{user.name}</b> </Typography>
                            </div>

                            
                           <div style={{display:'flex'}}>
                                <div style={{display:'flex', flexDirection:'column'}} >
                                    <Badge color="error" variant="dot" sx={{mx:1, mt:1.5}}></Badge>
                                    <hr style={{
                                        backgroundColor:'red',  
                                        height: '5rem', 
                                        width:'1px', 
                                        margin: '0px 0px 0px 7.5px', 
                                        border:'none'}} />
                                    <Badge color="error" variant="dot" sx={{mx:1}}></Badge>
                                </div>
                                <div style={{ textAlign:'start', marginTop:'6px'}}>
                                    <Typography gutterBottom variant="body2" component="div" sx={{fontSize:'13px' }}>
                                        Your location
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize:'12px' }}>
                                        {formData.streetAddress},{formData.Area}, {formData.City}
                                    </Typography>

                                    <Typography gutterBottom variant="body2" component="div" sx={{mt:2, fontSize:'13px' }} >
                                        Restaurant location
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize:'12px', mb:1  }}>
                                        Gulshan plaza restaurant GPR
                                    </Typography>
                                </div>
                           </div>
                        </Box>

                        <Typography gutterBottom variant="h5" component="div" sx={{mt:2, textAlign:'start'}} >
                             9.30
                        </Typography>
                         <Typography variant="body2" sx={{ color: 'text.secondary', textAlign:'start', fontSize:'12px', mt:'-10px'  }}>
                            Estimated delivery time
                        </Typography>
                         <Box sx={{ display:'flex', backgroundColor:'white', width:'200px', borderRadius:'5px',gap:'5px', mt:1, py:1}} >
                                <img src={riderLogo} alt=""  width="30" height="30" style={{margin:'0px 0px 0px 5px' }} />
                            <div style={{alignSelf:'center'}}>
                                <Typography variant="body2" sx={{  fontSize:'12px', textAlign:'start'  }}>
                                    Hamim
                                </Typography>
                                 <Typography variant="body2" sx={{ color: 'text.secondary', fontSize:'12px', textAlign:'start'   }}>
                                    your rider
                                </Typography> 
                            </div>
                         </Box>
                    </CardContent>
                    <CardActions>
                        <Button size="small"  variant="contained" color='error' sx={{fontSize:'12px', margin:'auto', width:'13rem', mb:2 }} >
                            Contact
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
};

export default TrackOrder;