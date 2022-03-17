
//when not loggedin
export const topContainer = {
   
    py: '73.1px',
    ['@media (min-width:568px)']: { // eslint-disable-line no-useless-computed-key
        py: '81.1px',
    }
}

//loggedin container with left navbar

export const containerStyle = {
    //nav height increases after 568px
    height: '100vh',
    overflowY: 'scroll',
    ['@media (max-width:970px)']: { // eslint-disable-line no-useless-computed-key
       py: '81.1px',
        pb: '50px'
    },
    ['@media (max-width:568px)']: { // eslint-disable-line no-useless-computed-key
        px: '8px',
        py: '73.1px',
        pb: '50px'
    },
    ['@media (min-width:970px)']: { // eslint-disable-line no-useless-computed-key
        py: '40px',
        ml: '300px',
        width: 'auto',
        pb: '30px'
    }
}
