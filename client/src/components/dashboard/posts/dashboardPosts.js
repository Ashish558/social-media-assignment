import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { withStyles } from '@material-ui/core/styles';

import SingleRow from './singleRow'
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';
import { getUserPosts } from '../../../services/users';
import { updatePosts } from '../../../app/slices/dashboard';

const fnStyles = theme => ({
   root: {
      display: 'flex',

      overflowX: 'hide',
   },
   table: {
      minWidth: 300,
   },
   tableCell: {

      padding: '8px 10px'
   }
})

function DashboardPosts(props) {
   const { width } = useWindowDimensions()

   const { classes } = props
   const dispatch = useDispatch()
   const { dashboardPosts } = useSelector(state => state.dashboard)

   const [data, setData] = useState([])
   const [page, setPage] = React.useState(0);
   // const [rowsPerPage, setRowsPerPage] = React.useState(10);

   useEffect(() => {
      getUserPosts(0, (err, res) => {
         if (err) return console.log(err)
         dispatch(updatePosts(res))
      })
   }, [dispatch])

   const getData = (offset) => {
      const tempData = dashboardPosts.map((item, index) => {
         return { ...item, number: index + 1 }
      })
      const tempData2 = tempData.splice(offset,  5)
      setData(tempData2)
   }
   
   // setting initial array of data
   useEffect(() => {
      getData(0)
   }, [dashboardPosts])


   const handleChangePage = (event, newPage) => {
      setPage(newPage);
      const offset = newPage * 5
      getData(offset)
   };

   const handleChangeRowsPerPage = (event) => {
      // setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   if (dashboardPosts.length < 1) {
      return <></>
   }

   return (
     
      <Box sx={{ backgroundColor: 'white', px: 1, py: 2, pl: 1.5, borderRadius: '10px' }} >
         <Typography variant='h5' fontSize='16px' fontWeight='bold' sx={{ ml: 1, mb: 2 }} > Recent Posts </Typography>
         <TableContainer component={'div'} >
            <Table className={classes.table}
               sx={{ minWidth: 650 }}
               aria-label="simple table"
            >
               <TableHead>
                  <TableRow>
                     <TableCell className={classes.tableCell} sx={{ ...styles.cell, width: '50px' }}>No</TableCell>
                     <TableCell className={classes.tableCell} sx={styles.cell}>Article title</TableCell>
                     {width > 820 &&
                        <>
                           <TableCell className={classes.tableCell} sx={styles.cell}>Date</TableCell>
                           <TableCell className={classes.tableCell} sx={styles.cell}>Likes</TableCell>
                           <TableCell className={classes.tableCell} sx={styles.cell}>Comments</TableCell>
                        </>
                     }
                   

                     <TableCell className={classes.tableCell} sx={{ ...styles.cell, width: '50px' }}></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {data.map(article => (
                     <SingleRow key={article._id} {...article} />
                  ))}
               </TableBody>

            </Table>
            <TablePagination
               component="div"
               count={dashboardPosts.length}
               page={page}
               onPageChange={handleChangePage}
               rowsPerPage={5}
               rowsPerPageOptions={[5]}
               onRowsPerPageChange={handleChangeRowsPerPage}
            />
         </TableContainer>
      </Box>
   )
}

const styles = {
   cell: {
      color: 'rgb(0 0 0 / 57%)',
      borderBottom: 0,
   }
}

export default withStyles(fnStyles)(DashboardPosts);