import React, { useState } from 'react'
import { Container, Box, Stack, TextField } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles"
import { LoadingButton } from '@mui/lab'

import Caption from '../components/createPost/caption'
import Inputfile from '../components/createPost/inputFile'

import { containerStyle } from './styles/styles'
import { createPost, updateImage } from '../services/posts/posts'

const useStyles = makeStyles((theme) => ({
    input: {
        "& .MuiFilledInput-root": {
            background: "#f3f3f3"
        }
    }
}));


export default function CreatePost() {
    const classes = useStyles();

    const [caption, setCaption] = useState('')
    const [loading, setLoading] = useState(false)

    const [imageSrc, setImageSrc] = useState(null)
    const [image, setImage] = useState(null)

    const onImageChange = (event) => {
        setImage(event.target.files[0])
        if (event.target.files && event.target.files[0]) {
            setImageSrc(URL.createObjectURL(event.target.files[0]));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!caption && !image) return console.log('fill all fields')
        setLoading(true)
        const data = { caption }
      
        createPost(data, (err, res) => {
            if (err) return console.log(err)
            console.log('post created')
            if (image === null) {
                window.location = '/'
                setLoading(false)
            }else{
                uploadImage(res.data._id)
            }
        })
    }

    const uploadImage = (postId) => {
        const formData = new FormData()
        formData.append("postImage", image)

        updateImage(postId, formData, (err, res) => {
            if (err) return console.log(err)
            window.location = '/'
            setLoading(false)
            console.log(res)
        })
    }

    return (
        <Container sx={{ ...containerStyle }} >
            <form onSubmit={handleSubmit} >

                <Stack spacing={4} alignItems='flex-start' >

                    <Caption caption={caption} classes={classes} setCaption={setCaption} />

                    <Stack direction='column' alignItems='center' spacing={0} sx={{ mt: 0 }} >

                        {
                            imageSrc !== null &&
                             <Box sx={{ maxWidth: '500px', mb: '16px' }} >
                                <Box component='img' src={imageSrc} sx={{ width: '100%' }} />
                            </Box>
                        }

                        <Inputfile onImageChange={onImageChange} />

                    </Stack>

                    <LoadingButton
                        type='submit'
                        loading={loading}
                        loadingPosition="center"
                        variant="contained"
                        mt='20px'
                        sx={{ display: 'inline-block' }}
                    >
                        Publish

                    </LoadingButton>
                </Stack>

            </form>
        </Container>
    )
}
