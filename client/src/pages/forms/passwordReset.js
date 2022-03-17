import React, { useState } from 'react'
import { Box, Button, Container } from '@mui/material'

import InputField from '../../components/form/inputField'
import ErrorMsg from '../../components/messages/errorMsg'

import { resetPassword } from '../../services/users'
import FormTitle from '../../components/form/formTitle'
import { withRouter } from '../../utils/withRouter'

function PasswordReset(props) {

    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')


    const userId = props.params.id
    const token = props.params.token

    const handleSubmit = (e) => {

        e.preventDefault()
        resetPassword(userId, token, password, (err, res) => {
            if (err) {
                console.log(err.response)
                if (err.response.status === 400) return setErrorMsg(err.response.data)
            }
            window.location = '/login'
        })
    }

    return (
        <Container sx={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: { md: 'center' }
        }}>
            <Box>
                <form onSubmit={handleSubmit} >
                    <FormTitle title='Reset Password' />
                    {errorMsg && <ErrorMsg msg={errorMsg} />}
                    <Box mb='16px' >
                        <InputField type='password' label='New Password' value={password} setValue={setPassword} />
                    </Box>
                    <Button type='submit' variant='contained' sx={styles.btn} >
                        Change Password
                    </Button>
                </form>
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

export default withRouter(PasswordReset)