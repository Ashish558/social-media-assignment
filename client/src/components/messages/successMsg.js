import React from 'react'
import { Typography } from '@mui/material'

export default function SuccessMsg({msg}) {


    return (

        <Typography color='#65cf87' textAlign='center' mb='17px' >
            {msg}
        </Typography>
    )
}
