import { TextField } from '@mui/material'
import React from 'react'

export default function Caption({ caption, classes, setCaption }) {


    return (
        <TextField fullWidth variant='filled'
            size='small'
            placeholder='Caption...'
            value={caption}
            onChange={e => setCaption(e.target.value)}
            sx={{ py: 4, mt: 1, pb: 1 }}
            className={classes.input}
            multiline
            rows={6}
            InputProps={{
                disableUnderline: true,
                style: { fontSize: '16px' , padding: '14px 14px' }
            }} 
            InputLabelProps={{ style: { fontSize: '16px' } }}
        />
    )
}
