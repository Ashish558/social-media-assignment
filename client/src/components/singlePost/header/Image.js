import { Box } from '@mui/material'
import React from 'react'

export default function Image({ image }) {


    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: '16px'}}>
            <Box component='img' src={image} sx={{ width: '100%', borderRadius: '8px' }} />
        </Box>
    )
}
