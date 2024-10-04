import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ListTwoToneIcon from '@mui/icons-material/ListTwoTone';
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone';
import { Tooltip, Grid } from '@mui/material';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import '../assets/styles/font.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import DrawerComp from "./Drawer";
import { useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import BaseLocal from './BaseLocal';
export default function NavbarShrink() {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    let { authStore } = useSelector((state) => state);
    let [username, setusername] = useState("")
    /////////////////////
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    ////////////////////

    // const { t } = useTranslation();
    // const classes = useStyles();
    const history = useHistory();
    const [isShown, setIsShown] = React.useState(false);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [anchorEl3, setAnchorEl3] = React.useState(null);

    const handleMenu1Click = (event) => {
        setIsShown(true)
        setAnchorEl1(event.currentTarget);
    };

    const handleMenu2Click = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleMenu3Click = (event) => {
        setAnchorEl3(event.currentTarget);
    };

    const handleMenuClose = (setAnchorEl) => {
        // setIsShown(true);
        setAnchorEl(null);
        // history.push('https://advservice.epramaan.gov.in/dashboard/whatisadv')
    };

    const handleMenuCloseService = (setAnchorEl2) => {
        setAnchorEl2(null);
        history.push('/adv/advasservice')
    }
    const handleMenuCloseSolution = (setAnchorEl2) => {
        setAnchorEl2(null);
        history.push('/adv/advassolution')
    }
    const handleMenuCloseContact = (setAnchorEl2) => {
        setAnchorEl2(null);
        history.push('/adv/contact')
    }
    const handleMenuCloseResources = (setAnchorEl3) => {
        setAnchorEl3(null);
        history.push('/adv/resources')
    }
    const handleHome = (e) => {
        history.push('/adv')
    }
    const handleuserredirect = () => {
        history.push('/adv')
    }

    const linklogin = BaseLocal + 'login'
    var  decryptedText;

    useEffect(() => {

        /////////////////////////////get lc
        try {
            var CryptoJS = require("crypto-js");
            var base64Key = "QWJjZGVmZ2hpamtsbW5vcA==";
            var key = CryptoJS.enc.Base64.parse(base64Key);
            if (localStorage.getItem("LsdItped")) {
                var decryptedData = CryptoJS.AES.decrypt(
                    localStorage.getItem("LsdItped").replace("slashinurl", "/").replace("plusinurl", "+"),
                    key,
                    {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Pkcs7,
                    }
                );
                var  decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
            }
            setusername(decryptedText);
        } catch (error) {
            console.log(error)
        }
        /////////////////////////////get username

      
    }, [])
   
    const processLoginAction = () => {
        history.push("/adv/LoginRequired")
    };

    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="fixed" style={{ backgroundColor: theme.navbar.backgroundColor, marginTop: '90px', }} >
                <Toolbar variant={isSmallScreen ? 'regular' : 'dense'}>


                    {isMatch ? (
                        <>


                            <IconButton style={{ outline: 'none' }} edge="start" color="inherit" aria-label="menu" sx={{ mr: 0 }} >
                                <HomeRoundedIcon onClick={handleHome} />
                            </IconButton>

                            <DrawerComp />



                        </>
                    ) : (
                        <>
                            <IconButton style={{ outline: 'none' }} edge="start" color="inherit" aria-label="menu" sx={{ mr: 0 }} >
                                <HomeRoundedIcon onClick={handleHome} />
                            </IconButton>

                            &nbsp;
                            <a target="_blank" href='https://sp.epramaan.in:8038/dashboard/'>
                                <Button style={{ outline: 'none' }} color="inherit" onClick={handleMenu1Click} >
                                    &nbsp;<ListTwoToneIcon /> About us
                                </Button>
                            </a>


                            &nbsp;
                            <a target="_blank" href='https://sp.epramaan.in:8038/dashboard/'>

                                <Button style={{ outline: 'none' }} color="inherit" onClick={handleMenu2Click}>
                                    &nbsp; <SummarizeTwoToneIcon />Services
                                </Button>

                            </a>



                            <a target="_blank" href='https://sp.epramaan.in:8038/dashboard/'>

                                <Button style={{ outline: 'none' }} color="inherit" onClick={handleMenu3Click} >
                                    &nbsp; <SupportAgentRoundedIcon />  Contact us
                                </Button>
                            </a>


                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ flexGrow: 1 }} />
                            {!authStore.loginStatus &&
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title='login'>
                                        <IconButton sx={{ p: 0 }} size='large' >
                                            <a href={linklogin}> <AccountCircleTwoToneIcon style={{ color: 'white', width: isSmallScreen ? '60px' : '100px', height: '45px', paddingTop: '0px', paddingBottom: '0px', right: '0px' }} /></a>

                                        </IconButton>
                                    </Tooltip>


                                </Box>
                            }
                            {authStore.loginStatus &&
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title={username}>
                                        <IconButton style={{ outline: 'none' }} sx={{ p: 0 }} size='large' onClick={() => { handleuserredirect() }} >

                                            <AccountCircleTwoToneIcon style={{ color: 'white', width: isSmallScreen ? '60px' : '100px', height: '45px', paddingTop: '0px', paddingBottom: '0px', right: '0px' }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Button
                                        style={{ color: 'white' }}
                                        id="fade-button"
                                        onClick={processLoginAction}

                                    >
                                        Logout
                                    </Button>

                                </Box>
                            }


                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}