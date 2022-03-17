import React from 'react'
import { Typography } from '@mui/material'

export default function FormTitle({ title }) {


    return (
        <Typography variant='h4' fontSize='34px' fontWeight='600' mb='20px' textAlign='center' >
            {title}
        </Typography>
    )
}
