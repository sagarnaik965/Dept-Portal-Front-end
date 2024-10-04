// import Card from '@material-tailwind/react/Card';
// import CardHeader from '@material-tailwind/react/CardHeader';
// import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
// import { Form } from 'react-bootstrap';
import { Label } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Box, TableCell, TableRow, TableBody, Paper, Table, TableContainer, TableHead, Grid } from '@mui/material';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import { positions } from '@mui/system';
import { useTheme } from '@material-ui/core';
//  import { MaskedText } from "react-native-mask-text";
// import InputMask from "react-input-mask";
import Baseurl from './Baseurl';


export default function LicenceKey({ applklist }) {

    const theme = useTheme()
    const isMobile = window.innerWidth <= 768;


    const lkmask = applklist.lk;

    // var [difflkexpiryalert, setDifflkexpiryalert] = useState('10');
    // const [alertflag, setAlertflag] = useState(false);

    var [dayss, setdayss] = useState([])
    var days = [];
    var alertflag = false;
    useEffect(() => {

        // const updateUsers = [
        //     // copy the current users state
        //     ...users,
        //     // now you can add a new object to add to the array
        //     {
        //       // using the length of the array for a unique id
        //       id: users.length + 1,
        //       // adding a new user name
        //       name: "Steve",
        //       // with a type of member
        //       type: "member"
        //     }
        //   ];
        //   // update the state to the updatedUsers
        //   setUsers(updateUsers);



        //     const newFruits = fruitData.map((fruit) => fruit.name);
        // setFruits([...fruits, ...newFruits]);

        // alert(lkmask+"---------lkmask")
        // applklist.map(
        //     (element) => {
        //         return (

        //             setdayss([...dayss,element.diffexpirydateforalert])
        //         )
        //     }
        // )
        const newday = applklist.map((element) => element.diffexpirydateforalert)
        setdayss([...dayss, ...newday])

        newday.map((element) =>

            element != 0 && element < 0 ? alertflag = true : alertflag = true
            //  alert(element+"----------element")
        )

        // if (days != 0 && days < 0) {
        //     alertflag = true
        //     console.log(alertflag + "------------------alertflag")

        // }



    }, {})



    return (

        <>
            {/* <div style={{ marginLeft: '10%', marginRight: '10%' }}> */}
            <div style={{ marginLeft: isMobile ? 'auto' : '10%', marginRight: isMobile ? 'auto' : '10%' }}>

                <Grid container spacing={2} style={{ width: '100%', }}>




                    <Grid item lg={12} >
                        <TableContainer component={Paper} style={{ backgroundColor: theme.viewbgtable.backgroundColor }}>
                            <Table  aria-label="simple table">
                                <TableHead style={{ backgroundColor: theme.viewbg.backgroundColor }}>
                                    <TableRow>
                                        <TableCell align="center" style={{ color: theme.typography.primary.paragraphbody,}}>  <b>Licence Key</b></TableCell>
                                        <TableCell align="center" style={{ color: theme.typography.primary.paragraphbody,}}>  <b>Expiry Date</b></TableCell>
                                        <TableCell align="center" style={{ color: theme.typography.primary.paragraphbody,}}>  <b>Status</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {/* <h1>{days}</h1> */}

                                    {applklist.map(
                                        (element) => {
                                            return (

                                                <TableRow>
                                                    {element.diffexpirydateforalert < 0 ?
                                                        <TableCell align="center" style={{ color: 'red' }}>{element.lk}</TableCell>
                                                        :
                                                        <TableCell align="center" style={{ color: theme.typography.primary.paragraphbody,}}>{element.lk}</TableCell>
                                                    }

                                                    {/* <TableCell align="center">{element.lkexpiry}</TableCell> */}
                                                    {element.diffexpirydateforalert < 0 ?

                                                        <TableCell align="center" style={{ color: 'red' }}>{element.lkexpiry}</TableCell>

                                                        :
                                                        <TableCell align="center" style={{ color: theme.typography.primary.paragraphbody,}}>{element.lkexpiry}</TableCell>

                                                    }
                                                    {/* <TableCell align="center"> {alertflag?'':''}</TableCell>  */}

                                                    {/* <TableCell align="center">

                                                        {element.diffexpirydateforalert != 0 && element.diffexpirydateforalert < 0 ? 'expired' : element.diffexpirydateforalert + ' days remain to expiry'}
                                                    </TableCell> */}
                                                        {/* {element.diffexpirydateforalert != 0 && element.diffexpirydateforalert < 30 ? element.diffexpirydateforalert + ' days remain to expiry': ''}  */}

                                                    {element.diffexpirydateforalert != 0 && element.diffexpirydateforalert < 0 ?
                                                        <TableCell align="center" style={{ color: 'red' }}>expired</TableCell>
                                                        :
                                                        <TableCell align="center" style={{ color: theme.typography.primary.paragraphbody,}}>{element.diffexpirydateforalert} &nbsp;days are left until expiry</TableCell>
                                                        // {element.diffexpirydateforalert = 0 ? '':<TableCell align="center">{element.diffexpirydateforalert} &nbsp;days remain to expiry</TableCell>}
                                                    }



                                                </TableRow>

                                            )
                                        }
                                    )
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>
                </Grid>
            </div>
        </>


    );
}
