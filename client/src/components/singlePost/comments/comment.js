import React from 'react'
import { Stack, Box, Typography } from '@mui/material'

export default function Comment({ commentedBy, body, createdAt }) {

    return (
        <Stack direction='row' spacing={1} sx={{ mb: '16px' }} >
            <Box sx={{ width: '35px', height: '35px' }}>
                <Box component='img' src={commentedBy.image} sx={{ width: '35px', height: '35px', borderRadius: '8px' }} />
            </Box>
            <Box sx={{ backgroundColor: '#dedede', px: 1, py: 0.5, borderRadius: '6px' }} >
                <Typography fontWeight='600' textTransform='capitalize' mb='4px' >
                    {commentedBy.username}
                </Typography>
                <Typography component='p' >
                    {body}
                </Typography>
            </Box>

        </Stack>
    )
}
