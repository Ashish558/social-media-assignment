 


export const setUserStorage = (token, email, user_id, user_img) => {
    localStorage.setItem("auth-token", token)
    localStorage.setItem("email", email)
    localStorage.setItem("user_id", user_id)
    localStorage.setItem("user_img", user_img)
}