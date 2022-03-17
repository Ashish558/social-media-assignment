import React, { useState } from 'react'
import { Box, Button, Container, Typography } from '@mui/material'

import InputField from '../../components/form/inputField'
import ErrorMsg from '../../components/messages/errorMsg'
import SuccessMsg from '../../components/messages/successMsg'

import { loginUser, sendResetLink } from '../../services/users'
import FormTitle from '../../components/form/formTitle'
import EmailModal from '../../components/form/emailModal'
import { useDispatch } from 'react-redux'
import { updateIsAuthenticated } from '../../app/slices/auth'
import { setUserStorage } from '../../utils/functions'

export default function LoginForm() {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    //for modal
    const [open, setOpen] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = { username, password }
        loginUser(data, (err, res) => {
            if (err) {
                if (err.response.status === 400) return setErrorMsg(err.response.data)
                return
            } else {
                const { token, email, user_id, user_img } = res.data
                setUserStorage(token, email, user_id, user_img)

                setErrorMsg('')
                setSuccessMsg(`Authenticated as ${username}`)
                dispatch(updateIsAuthenticated(true))
                window.location='/'
            }
        })
    }

    //send  reset pword link
    const getResetLink = (e) => {
        const data = { username }
        sendResetLink(data, (err, res) => {
            if (err) return console.log(err.response)
        })
    }

    return (
        <Container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: { md: 'center' } }}>
            <Box>
                <form onSubmit={handleSubmit} >
                    <FormTitle title='Login' />
                    {errorMsg !== '' ?
                        <ErrorMsg msg={errorMsg} /> : <SuccessMsg msg={successMsg} />
                    }
                    <Box mb='16px' >
                        <InputField type='text' label='Username' value={username} setValue={setUsername} />
                        <InputField type='password' label='password' value={password} setValue={setPassword} />
                    </Box>
                    <Button type='submit' variant='contained' sx={styles.btn} >
                        Login
                    </Button>
                </form>
                <Typography component='p' color='#8e8e8e' >
                    Forgot Password

                    <Typography component='span' varaint='span' sx={{ ml: '4px', cursor: 'pointer', textDecoration: '', color: '#5566bc' }}
                        onClick={() => setOpen(true)} >
                        forgot
                    </Typography>

                </Typography>

                <EmailModal open={open} setOpen={setOpen} getResetLink={getResetLink} />

            </Box>
        </Container>
    )
}

const styles = {
    btn: {
        textTransform: 'capitalize',
        mb: '26px',
        boxShadow: '0',
        '&:hover': {
            boxShadow: '0',
        },
    }
}
