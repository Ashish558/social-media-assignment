import React from 'react'
import { Typography } from '@mui/material'

export default function ErrorMsg({ msg }) {


    return (
        <Typography color='#e84141' textAlign='center' mb='17px' >
            {msg}
        </Typography>
    )
}
