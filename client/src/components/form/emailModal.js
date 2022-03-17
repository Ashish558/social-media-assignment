import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Modal, Stack, Typography } from '@mui/material';

export default function EmailModal({ open, setOpen, getResetLink }) {

    const handleClose = () => setOpen(false);

    const handleSend = () => {
        handleClose()
        getResetLink()
    }

    return (
        <div>
            <Modal open={open} onClose={handleClose} sx={styles.modal} >
                <Box sx={styles.box} >
                    <Typography mb='20px' fontWeight='600' variant="p" component='p' color='#4c4c4c' >
                        Do you want us to send password reset link to your email ?
                    </Typography>
                    <Stack direction='row' spacing={1} >
                        <Button fullWidth variant='outlined' onClick={() => handleClose()} sx={{ ...styles.btn, ...styles.cancelBtn }}  >
                            Close
                        </Button>
                        <Button fullWidth variant='contained' onClick={handleSend} sx={{ ...styles.btn }}  >
                            Send
                        </Button>

                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}


const styles = {
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: '10px',
    },
    box: {
        bgcolor: 'background.paper',
        boxShadow: 24,
        px: { xs: 2, md: 3 },
        py: { xs: 2.5, md: 3 },
        maxWidth: '400px'
    },
    btn: {
        textTransform: 'capitalize',
    },
    cancelBtn: {
        border: '1px solid #c93952',
        color: '#c93952',
        '&:hover': {
            border: '1px solid #c93952',
        }
    },
    acceptBtn: {

    }

};