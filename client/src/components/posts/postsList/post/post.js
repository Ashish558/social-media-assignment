import React from 'react'
import { Grid, Box } from '@mui/material'
import PostCaption from './postCaption'
import Header from './header'
import Image from './Image'
import Icons from './icons/Icons'


export default function Post({ _id, image, caption, createdAt, likesCount, posted_by, route, isLiked }) {

    return (
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ px: 0, mb: '18px' }}>

            <Box sx={styles.post} >
                <Header postedBy={posted_by} />
                <PostCaption caption={caption} isImageAbsent={image !== undefined ? false : true} />
                <Image image={image} />
                <Icons isLiked={isLiked} postId={_id}  />
            </Box>


        </Grid>
    )
}

const styles = {
    post: {
        borderRadius: '8px',
        backgroundColor: 'white',
        py: '10px',
        px: '10px'
    }
}