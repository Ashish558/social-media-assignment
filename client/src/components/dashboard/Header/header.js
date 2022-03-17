
import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import Headeritem from './headerItem'
import { getUserDashboardDetails } from '../../../services/users'

function Header() {

    const [isLoading, setIsLoading] = useState(true)
    const [details, setDetails] = useState({})

    useEffect(() => {
        setIsLoading(true)
        getUserDashboardDetails((err, res) => {
            if (err) return console.log(err)

            setDetails({
                posts: res.posts,
                likes: res.likes,
                comments: res.comments,
            })

            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <></>
    }

    return (
        <Box sx={{ mb: 3 }} component='div' >
            <Grid container rowSpacing={1} spacing={2} >
                {
                    data.map(item => {
                        return (
                            <Grid key={item.name} item xs={6} sm={4} md={4} lg={4} xl={3} sx={{ display: 'flex', justifyContent: 'center' }} >
                                <Headeritem details={details} {...item} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

let data = [
    {
        name: 'posts',
        icon: ArticleIcon,
        color: '#f78b13',
        bgColor: '#fff3e3'
    },
    {
        name: 'likes',
        icon: FavoriteIcon,
        color: '#ff4d6e',
        bgColor: '#ffedf1'
    },
    {
        name: 'comments',
        icon: ChatBubbleIcon,
        color: '#05afb9',
        bgColor: '#e1f8f8'

    },
]



export default Header
