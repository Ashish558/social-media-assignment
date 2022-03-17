
export const domain = 'https://social-media-234.herokuapp.com'

export const authHeader = {
    headers: {
        'auth-token': localStorage.getItem('auth-token')
    }
}
