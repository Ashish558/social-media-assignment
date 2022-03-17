import { Stack, Box, Typography } from '@mui/material'
import React from 'react'

export default function Header({ postedBy }) {

    const { username, image } = postedBy[0]
    return (
        <Stack direction='row' alignItems='center' mb='10px' >
            <Box sx={{ width: '45px', height: '45px' }}>
                <Box component='img' src={image} sx={{ width: '100%', borderRadius: '8px' }} />
            </Box>
            <Typography component='p' textTransform='capitalize' fontWeight='600' ml='20px' >
                {username}
            </Typography>
        </Stack>
    )
}
