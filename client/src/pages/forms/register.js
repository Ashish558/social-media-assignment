import React, { useState } from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import InputField from '../../components/form/inputField'
import { registerUser } from '../../services/users'
import ErrorMsg from '../../components/messages/errorMsg'
import SuccessMsg from '../../components/messages/successMsg'
import { Link } from 'react-router-dom'
import FormTitle from '../../components/form/formTitle'

export default function RegisterForm() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = (e) => {

        e.preventDefault()
        const data = { username, email, password }

        registerUser(data, (err, res) => {
            if (err) {
                if (err.response.status === 400) return setErrorMsg(err.response.data)
                return
            } else {
                setErrorMsg('')
                setSuccessMsg('Account created! Login to continue')
            }
        })
    }


    return (
        <Container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: { md: 'center' } }}>
            <Box>

                <form onSubmit={handleSubmit} >
                    <FormTitle title='Register' />

                    {errorMsg !== '' ?
                        <ErrorMsg msg={errorMsg} /> : <SuccessMsg msg={successMsg} />
                    }

                    <Box mb='16px' >
                        <InputField type='text' label='Username' value={username} setValue={setUsername} />
                        <InputField type='email' label='Email' value={email} setValue={setEmail} />
                        <InputField type='password' label='password' value={password} setValue={setPassword} />
                    </Box>

                    <Button type='submit' variant='contained' sx={styles.btn} >
                        Sign up
                    </Button>
                </form>
                
                <Typography component='p' color='#8e8e8e' >
                    Already have an account ? <Link to='/login' style={{ textDecoration: '' }} > login </Link>
                </Typography>

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