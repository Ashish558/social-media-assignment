import React, { useState } from 'react'
import { MenuItem } from '@mui/material'
import { useDispatch } from 'react-redux';

import DeletePostModal from './deletePostModal';
import { updateDeleteModal } from '../../../../../app/slices/dashboard';

export default function DeleteBtn({ _id, setAnchorEl }) {

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const deletePost = () => {

        setOpen(true)
        dispatch(updateDeleteModal(true))
    }
    
    return (
        <>
            <MenuItem onClick={deletePost} sx={{ ...styles.link }} >
                Delete
            </MenuItem>
            {open && <DeletePostModal _id={_id} open={open} setOpen={setOpen} setAnchorEl={setAnchorEl} />}

        </>
    )
}


const styles = {
    link: {
        color: 'rgb(0 0 0 / 67%)',
        textDecoration: 'none',
        fontSize: '14.5px',
        borderRadius: '3px'
    }
}