import { Container } from '@mui/material'
import React from 'react'
import Header from '../components/dashboard/Header/header'
import DashboardPosts from '../components/dashboard/posts/dashboardPosts'
import { containerStyle } from './styles/styles'

export default function Dashboard() {


    return (
        <Container maxWidth={false}
            sx={{ ...containerStyle }}>
            <Header />
            <DashboardPosts />
        </Container>
    )
}
