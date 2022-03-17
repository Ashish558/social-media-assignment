import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { addLikeToPost, removeLikeFromPost } from '../../../../../services/posts/posts';
import { updateLikes } from '../../../../../app/slices/posts';

export default function LikeBtn({ isLiked, postId }) {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const addLike = () => {
        setLoading(true);
        addLikeToPost(postId, (err, res) => {
            if (err) return setLoading(false)
            setLoading(false)
            const payload = { postId: postId, isLiked: true, likesCount: res }
            dispatch(updateLikes(payload))
        })
    }

    const removeLike = () => {
        setLoading(true);
        removeLikeFromPost(postId, (err, res) => {
            if (err) return setLoading(false)
            setLoading(false)
            const payload = { postId: postId, isLiked: false, likesCount: res }
            dispatch(updateLikes(payload))
        })
    }

    return (
        isLiked ?
            <LoadingButton
                loading={loading}
                onClick={removeLike}
                loadingPosition="center" sx={{ minWidth: 'auto', p: 0 }} >
                <FavoriteIcon sx={{ color: '#4a4a4a' }} />
            </LoadingButton>
            :
            <LoadingButton
                loading={loading}
                onClick={addLike}
                loadingPosition="center" sx={{ minWidth: 'auto', p: 0 }} >
                <FavoriteBorderIcon sx={{ color: '#4a4a4a' }} />
            </LoadingButton>
    )
}
