import { Container } from '@mui/material'
import React from 'react'
import PostsList from '../components/posts/postsList/postsList'
import { containerStyle } from './styles/styles'

export default function Posts() {


    return (
        <Container maxWidth={false}
            sx={{ ...containerStyle }}>

            <PostsList />
        </Container>
    )
}
