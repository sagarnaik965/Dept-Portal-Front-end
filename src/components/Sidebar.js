import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminNavbarLogout from './AdminNavbarLogout';

import { AiOutlineHome } from 'react-icons/ai';

// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AiOutlineForm } from 'react-icons/ai';
import { MdAppRegistration, MdGroups } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { VscKey } from 'react-icons/vsc';
import 'react-pro-sidebar/dist/css/styles.css';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core';
import { Typography } from '@mui/material';




export default function Sidebar() {
    const theme=useTheme();
    const [showSidebar, setShowSidebar] = useState('-left-64');
    let { authStore } = useSelector((state) => state);
    const roleStatus = authStore.roletype;
//   const [portaltype, setportaltype] = useState();

//     if (authStore.type == 'd') {
//         setportaltype(true)
//       } else {
//         setportaltype(false)
//       }

    return (

        <>
            {/* <div style={{overflowY:"scroll",scrollMargin:"1px black"}}> */}
            {!authStore.loginStatus &&
            <></>

                // <AdminNavbar
                //     showSidebar={showSidebar}
                //     setShowSidebar={setShowSidebar}
                // />

              
            }

            {authStore.loginStatus &&

                <AdminNavbarLogout
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                />

            }
            <div
                // style={{overflowY:"scroll"}}
                className={`h-screen fixed top-0 md:left-0 sm:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
                style={{ maxHeight: 'auto',  height: '60%',marginTop:'130px' , backgroundColor:theme.sidebar.backgroundColor,position:'fixed',zIndex:'2'}}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                    {/* <a
                        href="http://localhost:8080/adv"
                        target="_blank"
                        rel="noreferrer"
                    >                       
                        <Grid container spacing={1}>
                            <Grid item xs={3} >
                                <img src={advlogo} width="60px" />
                            </Grid>
                            <Grid item xs={9}>
                                    <span> <b> <h6 style={{ marginLeft: '0px' ,marginTop:'10px'}}>Aadhaar Data Vault</h6></b></span>
                                </Grid>
                        </Grid>
                        
                      
                    </a> */}

                    <div className="flex flex-col" >
                        {/* <hr className="my-4 min-w-full" /> */}

                        <ul className="flex-col min-w-full flex list-none"
                        // style={{maxHeight: 370, overflow: 'auto'}}
                        >

                            {/* <li className="rounded-lg mb-4 mt-2">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<MdOutlineExpandMore />}
                            >
                                <Typography>
                                    <NavLink
                                        to="/"
                                        exact
                                        className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                        activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                    >
                                        <AiOutlineHome />
                                        Dashboard
                                    </NavLink>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Settings
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        </li> */}


                            <li className="rounded-lg mb-1 mt-0">
                                <NavLink
                                    // to={`/${authStore.deptId}/${authStore.role}`}
                                    // to={`/${localStorage.getItem("DeptIdLS")}/${localStorage.getItem("RoleLS")}`}
                                    // to={`/${localStorage.getItem("DeptIdLS")}`}
                                    to={`/adv`}
                                    




                                    // to="/ECI0001"
                                    exact
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    {/* <Icon name="dashboard" size="2xl" /> */}
                                    <AiOutlineHome  style={{color:theme.typography.primary.paragraphbody}}/>
                                    <Typography variant='h7' style={{color:theme.typography.primary.paragraphbody}}> Dashboard</Typography>
                                   
                                </NavLink>
                            </li>





                            <li className="rounded-lg mb-1 ">
                                <NavLink
                                    to="/adv/appdetails"
                                    exact
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    {/* <Icon name="settings" size="2xl" /> */}
                                    <MdGroups  style={{color:theme.typography.primary.paragraphbody}} />
                                    <Typography variant='h7' style={{color:theme.typography.primary.paragraphbody}}>  Application Details</Typography>
                                   
                                </NavLink>
                            </li>




                          



                                <li className="rounded-lg mb-1 ">
                                    <NavLink
                                        to="/adv/reports"
                                        exact
                                        className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                        activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                    >
                                        {/* <Icon name="dashboard" size="2xl" /> */}
                                        <TbReport style={{color:theme.typography.primary.paragraphbody}} />
                                    <Typography variant='h7' style={{color:theme.typography.primary.paragraphbody}}>Reports</Typography>

                                     
                                    </NavLink>
                                </li>
                                <li className="rounded-lg mb-1 ">
                                    <NavLink
                                        to="/adv/billing"
                                        exact
                                        className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                        activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                    >
                                        {/* <Icon name="dashboard" size="2xl" /> */}
                                        <TbReport  style={{color:theme.typography.primary.paragraphbody}}/>
                                    <Typography variant='h7' style={{color:theme.typography.primary.paragraphbody}}>Bills</Typography>

                                        
                                    </NavLink>
                                </li>
                         


                         

                         
                        </ul>
                    </div>
                </div>
            </div>

            {/* </div> */}
        </>
    );
}