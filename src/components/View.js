import * as React from 'react';

import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import { Grid } from '@mui/material';
import { Typography, useTheme } from '@material-ui/core';
import TextField from '@mui/material/TextField';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function View({ appdetails }) {

    const isMobile = window.innerWidth <= 768;

    const theme = useTheme()
    const styles = theme => ({
        multilineColor: {
            color: 'red'
        }
    });

    return (
        <>
            {/* <div style={{ marginLeft: '10%', marginRight: '10%' }}> */}

            <div style={{ marginLeft: isMobile ? 'auto' : '10%', marginRight: isMobile ? 'auto' : '10%' }}>

            {/* <div style={{ marginLeft:'0px', marginRight: '0px' }}> */}

                <Grid container spacing={2} style={{ width: '100%' }}>



              
                    <Grid item lg={12} >
                        <TableContainer component={Paper} style={{ backgroundColor: theme.viewbgtable.backgroundColor }}>
                            <Table  aria-label="simple table">
                                <TableHead style={{ backgroundColor: theme.viewbg.backgroundColor }}>
                                    <TableRow>
                                        <TableCell align="center" style={{ color: theme.typography.primary.paragraphbody,}}>  <b>Email</b></TableCell>
                                        <TableCell align="center" style={{ color: theme.typography.primary.paragraphbody,}}>  <b>Description</b></TableCell>
                                        <TableCell align="center" style={{ color: theme.typography.primary.paragraphbody,}}>  <b>Application Name</b></TableCell>
                                       
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                  
                                    <TableRow
                                    >
                                        <TableCell align="center"  style={{ verticalAlign: 'top', color: theme.typography.primary.paragraphbody, }}>
                                        {appdetails.email}
                                        </TableCell>

                                        <TableCell align="center"  style={{ verticalAlign: 'top' }}>
                                        <TextField
                                               
                                                id="standard-multiline-static"
                                                // label="Multiline"
                                                multiline
                                                rows={4}
                                                defaultValue={appdetails.desc}
                                                variant="standard"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{
                                                    "& .MuiInputBase-root": {
                                                        color: theme.typography.primary.paragraphbody,
                                                        fontSize: '14px',
                                                     
                                                    },

                                                }}

                                            />
                                        </TableCell>

                                        <TableCell align="center"  style={{ verticalAlign: 'top', color: theme.typography.primary.paragraphbody,}}>
                                        {appdetails.appname}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>



                </Grid>

            </div>




        </>
    );
}