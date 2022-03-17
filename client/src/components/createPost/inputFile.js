import { Box } from '@material-ui/core'
import React, { useRef } from 'react'
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';

export default function Inputfile({ onImageChange }) {

    const hiddenFileInput = useRef(null)

    const handleClick = () => {
        hiddenFileInput.current.click()
    }
    return (
        <Box sx={{ position: 'relative', component: 'div', width: '100%' }} >
            <input id='postImage' name='postImage' ref={hiddenFileInput} onChange={onImageChange} type='file' style={styles.input} />
            <label>
                {/* <span style={styles.fileBox}>
                    {imageName}
                </span> */}
                <span onClick={handleClick} style={styles.fileBtn} >
                    {/* <i class="fa fa-upload" aria-hidden="true"></i> */}
                    <Box sx={styles.fileBtnWrapper} >
                        <PhotoSizeSelectActualIcon sx={{ mr: 1 }} />
                        Select Image
                    </Box>
                </span>
            </label>
        </Box>
    )
}


const styles = {
    input: {
        display: 'none'
    },
    fileBox: {
        display: 'inline-block',
        width: '100%',
        borderBottom: '1px solid #e9e9e9',
        padding: '5px 0px 5px 5px',
        boxSizing: 'border-box',
        height: '36px',
    },
    fileBtn: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    },
    fileBtnWrapper: {
        padding: '5px',
        border: '1px solid rgb(29 136 234)',
        borderRadius: '4px',
        color: 'rgb(29 136 234)',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
    }
}
