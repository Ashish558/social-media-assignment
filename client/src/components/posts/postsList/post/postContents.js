import React from 'react'
import TextTruncate from 'react-text-truncate'
import { Typography, CardContent } from '@mui/material'

const styles = {
    caption: {
        color: '#5a5a5a'
    }
}

export default function PostContents({ createdAt, caption }) {

    return (
        <CardContent>
           <Typography variant="body2" sx={styles.caption}>
                <TextTruncate
                    line={4}
                    element="span"
                    truncateText="…"
                    text={caption}
                />
            </Typography>

            <Typography fontSize='14px'
                variant="p"
                component="p"
                color="#bdbdbd"
                fontFamily='Nunito'
                sx={{ mb: 2.5 }} >
                {new Date(createdAt).toDateString()}
            </Typography>

            
        </CardContent>
    )
}
