import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

const ExpandableButton = ({data}) => {
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
        <Box className={'notification'} sx={{height: '2rem', mb: '.5rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', }} onClick={handleClick} variant="contained" color="primary">
                <Typography variant={'h5'} fontWeight={'500'} sx={{textOverflow: 'ellipsis', width: '18.5rem' }} >{data.title}</Typography>
            {/* <Box sx={{ textOverflow: 'ellipsis', background: 'coral' }}>
            </Box> */}
        </Box>
        <Collapse in={expanded}>
            <Typography variant="h6" fontWeight={'400'} mb={'1rem'} >
                {data.message}
            </Typography>
        </Collapse>
        </div>
    );
};

export default ExpandableButton;


export const ExpandableNone = ({}) => {
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
        <Box className={'notification'} sx={{height: '2rem', mb: '.5rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', }} onClick={handleClick} variant="contained" color="primary">
                <Typography variant={'h5'} fontWeight={'500'} sx={{textOverflow: 'ellipsis', width: '18.5rem', color: '#FF571A' }} >Network Error!!!</Typography>
        </Box>
        <Collapse in={expanded}>
            <Typography variant="h6" fontWeight={'400'} mb={'1rem'} color={'#FF571A'} >
                Connect your device to the internet and refresh.
            </Typography>
        </Collapse>
        </div>
    );
};