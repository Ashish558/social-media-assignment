import React from 'react'
import TextTruncate from 'react-text-truncate'
import { Typography } from '@mui/material'

export default function PostCaption({ caption, isImageAbsent }) {

    return (
        <Typography variant="p" component='p' mb='8px' py={isImageAbsent ? '20px' : '5px'}
            textAlign={isImageAbsent ? 'center' : 'none'}
        >
            <TextTruncate
                line={4}
                element="span"
                truncateText="…"
                text={caption}
            />
        </Typography>
    )
}

