import Card from '@material-tailwind/react/Card';
import { useTheme } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import React from "react";
import { FcCancel, FcCheckmark } from 'react-icons/fc';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';


export default function AllowedOperations({ Operations }) {

    const isMobile = window.innerWidth <= 768;


    const theme = useTheme()
    return (
        <>
            <div style={{ marginLeft: isMobile ? 'auto' : '10%', marginRight: isMobile ? 'auto' : '10%' }}>
                <Grid container spacing={2} style={{ width: '100%' }}>
                    <Grid item lg={12} >
                        <TableContainer component={Paper} style={{ backgroundColor: theme.viewbgtable.backgroundColor }}>
                            <Table aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" style={{ verticalAlign: 'top', color: theme.typography.primary.paragraphbody, }}>
                                            <div align="center" style={{ color: theme.typography.primary.paragraphbody, border: '1px ridge  skyblue ' }}>Store UID
                                                {
                                                    Operations.is_Struid == true ? <FcCheckmark /> : <FcCancel />
                                                }
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" style={{ verticalAlign: 'top', color: theme.typography.primary.paragraphbody, }}>
                                            <div align="center" style={{ color: theme.typography.primary.paragraphbody, border: '1px ridge skyblue ' }}>Get Reference Number
                                                {
                                                    Operations.is_Getrefnum == true ? <FcCheckmark /> : <FcCancel />
                                                }
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" style={{ verticalAlign: 'top', color: theme.typography.primary.paragraphbody, }}>
                                            <div align="center" style={{ color: theme.typography.primary.paragraphbody, border: '1px ridge skyblue ' }}>Get UID
                                                {
                                                    Operations.is_Getuid == true ? <FcCheckmark /> : <FcCancel />
                                                }
                                            </div>
                                        </TableCell>


                                    </TableRow>

                                    <TableRow>
                                        <TableCell align="center" style={{ verticalAlign: 'top', color: theme.typography.primary.paragraphbody, }}>
                                            <div align="center" style={{ color: theme.typography.primary.paragraphbody, border: '1px ridge  skyblue ' }}>Activate
                                                {
                                                    Operations.is_Activate == true ? <FcCheckmark /> : <FcCancel />
                                                }</div>
                                        </TableCell>
                                        <TableCell align="center" style={{ verticalAlign: 'top', color: theme.typography.primary.paragraphbody, }}>
                                            <div align="center" style={{ color: theme.typography.primary.paragraphbody, border: '1px ridge  skyblue' }}>Deactivate
                                                {
                                                    Operations.is_Deactivate == true ? <FcCheckmark /> : <FcCancel />
                                                }</div>
                                        </TableCell>
                                        <TableCell align="center" style={{ verticalAlign: 'top', color: theme.typography.primary.paragraphbody, }}>
                                            <div align="center" style={{ color: theme.typography.primary.paragraphbody, border: '1px ridge  skyblue ' }}>Duplicate Check
                                                {
                                                    Operations.is_dupcheck == true ? <FcCheckmark /> : <FcCancel />
                                                }</div>
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