import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';


export default function CircularAnimation() {
    return (
        <Box sx={{ display: 'flex',justifyContent: 'center', alignItems: 'center', background: 'white', height: '100%' }}>
        <CircularProgress  color='primary' value={'progress'}/>
        </Box>
    );
}


export function SkeletonAnimations() {
    return (
        <Skeleton animation="wave" />
    );
    }