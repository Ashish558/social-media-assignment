import React, { useEffect, useState } from 'react'
import { Container, Stack } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles"
import { LoadingButton } from '@mui/lab'

import Caption from '../components/createPost/caption'

import { containerStyle } from './styles/styles'
import { editPost, getSinglePost } from '../services/posts/posts'
import { withRouter } from '../utils/withRouter'

const useStyles = makeStyles((theme) => ({
    input: {
        "& .MuiFilledInput-root": {
            background: "#f3f3f3"
        }
    }
}));


function EditPost(props) {
    const classes = useStyles();
    const postId = props.params.id

    const [caption, setCaption] = useState('')
    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        setLoading(true)
        getSinglePost(postId, (err, res) => {
            if (err) return console.log(err)
            const { caption } = res.data[0]
            setCaption(caption)
         
            setLoading(false)
        })
    }, [postId])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!caption) return console.log('fill all fields')
        setIsEditing(true)

        const data = { caption }
        editPost(postId, data, (err, res) => {
            if (err) return console.log(err)
            setIsEditing(false)
            window.location = '/dashboard'
        })
    }
    if (loading) return <></>

    return (
        <Container sx={{ ...containerStyle }} >
            <form onSubmit={handleSubmit} >

                <Stack spacing={4} alignItems='flex-start' >

                    <Caption caption={caption} classes={classes} setCaption={setCaption} />

                    <Stack direction='column' alignItems='center' spacing={0} sx={{ mt: 0 }} >

                     

                    </Stack>

                    <LoadingButton
                        type='submit'
                        loading={isEditing}
                        loadingPosition="center"
                        variant="contained"
                        mt='20px'
                        sx={{ display: 'inline-block' }}
                    >
                        Edit

                    </LoadingButton>
                </Stack>

            </form>
        </Container>
    )
}


export default withRouter(EditPost)