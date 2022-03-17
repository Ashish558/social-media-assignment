import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import AppRoutes from './AppRoutes'
import { verifyAuth } from './services/users'
import { useDispatch } from 'react-redux'
import { updateIsAuthenticated } from './app/slices/auth'

const theme = createTheme({
   breakpoints: {
      values: {
         xs: 0,
         sm: 568,
         md: 760,
         lg: 970,
         xl: 1200,
      }
   },
   palette: {
      background: {
         blue: '#1081e8c2',
         default: '#f9f8ffe3'
      },
      color: {
         blue: '#1976d2',
         secondary: '#505050',
         white: '#fff',
         black: '#000',
         primary: '#1081e8',
      }
   },
   typography: {
      fontFamily: [
         "Sans-Serif",
         "Helvetica Neue",
         "Arial",
         "sans-serif"
      ].join(",")
   },

})
const App = () => {
   const dispatch = useDispatch()
   const [isLoading, setIsLoading] = useState(true)
   useEffect(() => {
      setIsLoading(true)
      verifyAuth((err, res) => {
         if (!res) {
            dispatch(updateIsAuthenticated(false))
            setIsLoading(false)
            return
         }
         dispatch(updateIsAuthenticated(true))
         setIsLoading(false)

      })
   }, [dispatch])

   if (isLoading) return <>Loading</>

   return (
      <ThemeProvider theme={theme}>
         <GlobalStyles styles={{ listStyle: 'none', body: { backgroundColor: "#f9f8ffe3" }, }} />
         <CssBaseline />
         <AppRoutes />

      </ThemeProvider>
   )
}


export default App
