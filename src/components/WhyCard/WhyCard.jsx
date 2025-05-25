import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { red, green } from '@mui/material/colors';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const WhyCard = ({cardData}) => {
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
               component="img"
               image={cardData.img}
               alt="why_us"
              />
                <CardContent sx={{display:'flex'}}>
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" >
                        <img src={cardData.icon} alt=""/>
                    </Avatar>
                    <Box sx={{ml:2}}>
                         <Typography sx={{ marginBottom: 2 }}>{cardData.title}</Typography>
                         <Typography variant="body2" sx={{ color: 'text.secondary', textAlign:'start' }}>
                           {cardData.description}
                         </Typography>
                          <CardActions >
                            <Button size="small">see more</Button>
                            <ArrowForwardIcon  sx={{ color: 'white', backgroundColor:green[400], borderRadius:'50px' }} />
                          </CardActions>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
};

export default WhyCard;