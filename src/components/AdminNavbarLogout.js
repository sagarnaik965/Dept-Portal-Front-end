import React from 'react';
import Button from '@material-tailwind/react/Button';
import { useHistory, useLocation } from 'react-router-dom';
import { AiOutlineCloseCircle, AiOutlineMenu } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { logoutApiAction } from "../store/authslice";
import CancelIcon from '@mui/icons-material/Cancel';

export default function AdminNavbarLogout({ showSidebar, setShowSidebar }) {
    const isMobile = window.innerWidth <= 768;

    let { authStore } = useSelector((state) => state);
    var CryptoJS = require("crypto-js");
    // const user =JSON.parse( CryptoJS.AES.decrypt(authStore.deptId, 'abc').toString(CryptoJS.enc.Utf8))
    try {
        var bytes = CryptoJS.AES.decrypt(authStore.deptId, 'adv');
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {

    }
    const location = useLocation().pathname;
    let dispatch = useDispatch();
    let history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open1 = Boolean(anchorEl);
    const handleClick1 = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl(null);
    };

    const navtoadvasservice = () => {
        window.location.href = "https://advservice.epramaan.gov.in/dashboard/aadhaarValutAsService";
    };
    const navtoadvassolution = () => {
        window.location.href = "https://advservice.epramaan.gov.in/dashboard/aadhaardatavaultasasolution";

    }

    const [anchorE2, setAnchorE2] = React.useState(null);
    const open2 = Boolean(anchorE2);
    const handleClick2 = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorE2(null);
    };
    const navtoadvcontact = () => {
        window.location.href = "https://advservice.epramaan.gov.in/dashboard/contactus";
    }
    const navtoadvresources = () => {
        window.location.href = "https://advservice.epramaan.gov.in/dashboard/resources";

    }

    const [anchorE3, setAnchorE3] = React.useState(null);
    const open3 = Boolean(anchorE3);
    const handleClick3 = (event) => {
        setAnchorE3(event.currentTarget);
    };
    const handleClose3 = () => {
        setAnchorE3(null);
    };

    const navtoADV = () => {
        window.location.href = "https://advservice.epramaan.gov.in/dashboard/whatisadv";

    }

    

    return (
        <>
            <div className="md:hidden">
                <Button
                    color="transparent"
                    buttonType="link"
                    size="lg"
                    iconOnly
                    rounded
                    ripple="light"
                    onClick={() => setShowSidebar('left-0')}
                    style={{ marginTop: '170px' }} 
                >
                    <AiOutlineMenu color='red' size={25} />
                </Button>
                <div
                    className={`absolute top-2 md:hidden ${showSidebar === 'left-0' ? 'left-64' : '-left-64'
                        } z-50 transition-all duration-300`}
                >
                    <Button
                        color="transparent"
                        // buttonType="link"
                        size="sm"
                        iconOnly
                        rounded
                        // ripple="light"
                        onClick={() => setShowSidebar('-left-64')}
                    >
                        {/* <CancelIcon  size={35} style={{color:'black' }} /> */}

                        <AiOutlineCloseCircle color='#03a9f4' size={35} style={{marginTop:isMobile?'40px':'auto'}}/>
                    </Button>
                </div>
            </div>


        </>
    );
}
