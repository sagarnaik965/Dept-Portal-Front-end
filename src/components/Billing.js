import React, { useRef } from "react";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import background from "../assets/img/abc.jpg";
import { Button, Card } from "@mui/material";
import { saveAs } from 'file-saver';
import { Grid } from '@mui/material';
import { useState } from "react";
import { Select, InputLabel, MenuItem } from '@mui/material';
import ReactLoading from "react-loading";
import ReactLoadingforpdf from "react-loading";
import ReactLoadingforcsv from "react-loading";


import Baseurl from "../components/Baseurl";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Slide, toast, ToastContainer } from "react-toastify";
import BaseLocal from "./BaseLocal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from '@material-ui/core/styles';


const moment = require('moment');

export default function Billing() {
    const theme = useTheme()
    let history = useHistory();
    var decryptedText = "";
    let [username, setusername] = useState("");

    const today = new Date();
    const quarter = Math.floor((today.getMonth() / 3));
    const startFullQuarter = new Date(today.getFullYear(), quarter * 3 - 3, 1);
    const endFullQuarter = new Date(startFullQuarter.getFullYear(), startFullQuarter.getMonth() + 3, 0);
    var quarteryearforsummaryreport = endFullQuarter.getFullYear();
    var quarterforsummreport = "";
    const dropdownarray = [];

    if (quarter == 0) {
        quarterforsummreport = "0";
        dropdownarray[0] = "January-March";
        dropdownarray[1] = "April-June";
        dropdownarray[2] = "July-September";
        dropdownarray[3] = "October-December";
    }
    else if (quarter == 1) {

        quarterforsummreport = "1";
        dropdownarray[0] = "January-March";
    }
    else if (quarter == 2) {

        quarterforsummreport = "2";
        dropdownarray[0] = "January-March";
        dropdownarray[1] = "April-June";
    }
    else if (quarter == 3) {

        quarterforsummreport = "3";
        dropdownarray[0] = "January-March";
        dropdownarray[1] = "April-June";
        dropdownarray[2] = "July-September";
    }
    //-------------------------code for common drop down----------------------------
    dropdownarray[0] = "January-March";
    dropdownarray[1] = "April-June";
    dropdownarray[2] = "July-September";
    dropdownarray[3] = "October-December";

    let [csvdata, setCsvdata] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [LastDate, setLastDate] = useState(new Date());
    const [spinnerforfetchingpdf, setSpinnerforfetchingpdf] = useState(false);
    const [spinnerforfetchingcsv, setSpinnerforfetchingcsv] = useState(false);
    let [fetchingdataflag, setFetchingdataflag] = useState(false)
    let [file, setFile] = useState(new Blob([], { type: 'application/pdf' }));




    function generate(event) {
        setFetchingdataflag(true)
        setSpinnerforfetchingpdf(true)
        setSpinnerforfetchingcsv(true)

        let quarter = "";

        if (quarterlyYear == undefined) {
            return false;
        }

        if (quarterlyQuarter == undefined) {
            return false;
        }

        if (quarterlyQuarter == 0) {
            quarter = "01";

        } else
            if (quarterlyQuarter == 1) {
                quarter = "04";
            }
            else if (quarterlyQuarter == 2) {
                quarter = "07";
            }
            else if (quarterlyQuarter == 3) {
                quarter = "10";
            }


        // -----------------------------checking the selected quarter is valid or not-------------------------------------------

        var firstDate = new Date(quarterlyYear, quarterlyQuarter * 3, 1);
        var endDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0);
        var todays = new Date();
        if (endDate > todays) {
            toastAlertWarning("Please select proper quarter")
            setFetchingdataflag(false)
            setSpinnerforfetchingpdf(false)
            setSpinnerforfetchingcsv(false)
            return false
        }
        if (firstDate > todays) {
            toastAlertWarning("Please select proper quarter")
            setFetchingdataflag(false)
            setSpinnerforfetchingpdf(false)
            setSpinnerforfetchingcsv(false)
            return false
        }


        const fdate = startDate.toLocaleDateString().replaceAll("/", "-");
        const ldate = LastDate.toLocaleDateString().replaceAll("/", "-");
        const datedata = ["bill", quarter, quarterlyYear, username];

        const Billingpdf = () => {
            fetch(Baseurl + "billDeptCategpdf",
                {
                    method: "POST",
                    body: JSON.stringify(datedata),
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "http://localhost:3000",
                    },
                }
            )
                .then(res => {
                    if (res.status == "204") {
                        throw new Error('No data found for specific period');
                    }
                    if (res.status == "500") {
                        throw new Error('Something went wrong.');
                    }
                    return res.blob();
                })
                .then((blob) => {
                    const blobfile = new Blob([blob], { type: 'application/pdf' })
                    setFile(blobfile);
                    setSpinnerforfetchingpdf(false)
                })
                .catch(e => {
                    toastAlertWarning(e.message)
                    setSpinnerforfetchingpdf(false)
                    setFetchingdataflag(false)
                })
        }

        const Billingcsv = () => {
            fetch(Baseurl + "billDeptCategCsv",
                {
                    method: "POST",
                    body: JSON.stringify(datedata),
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "http://localhost:3000",
                    },
                }
            )
                .then(res => {
                    if (res.status == "204") {
                        throw new Error('No data found for specific period');
                    }

                    if (res.status == "500") {
                        throw new Error('Something went wrong.');
                    }
                    return res.json();
                })
                .then((data) => {
                    setCsvdata(data)
                    setSpinnerforfetchingcsv(false)
                })
                .catch(e => {
                    toastAlertWarning(e.message)
                    setSpinnerforfetchingcsv(false)
                    setFetchingdataflag(false)


                })
        }
        Billingpdf();
        Billingcsv();
        event.preventDefault();
    }

    function Downloadpdf() {
        saveAs(file, "Bill");
        setFetchingdataflag(false)

    }

    function Downloadcsv() {
        setFetchingdataflag(false)


    }






    // ------------------------------------------block of code for dyanamic quarter--------------------------------------------------------------

    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(3), (val, index) => year - index);
    let [quarterlyQuarter, setQuarterlyQuarter] = useState(quarterforsummreport);
    let [quarterlyYear, setQuarterlyYear] = useState(quarteryearforsummaryreport);

    let dateFormateFortMui = "";
    if (new Date().getDate() > 9) {
        dateFormateFortMui = new Date().getFullYear() + "-" + new Date().getMonth() + 1 + "-" + new Date().getDate();
    } else {
        dateFormateFortMui = new Date().getFullYear() + "-" + new Date().getMonth() + 1 + "-" + "0" + new Date().getDate();
    }
    var todaysdate = new Date(dateFormateFortMui);
    var currentmonth = todaysdate.getMonth() + 1;
    var quarterforsumaryreport = "";
    if (moment().quarter() == 1) {
        quarterforsumaryreport = "10";
    }
    else if (moment().quarter() == 2) {
        quarterforsumaryreport = "01";
    }
    else if (moment().quarter() == 3) {
        quarterforsumaryreport = "04";
    }
    else if (moment().quarter() == 4) {
        quarterforsumaryreport = "07";
    }
    const quaterlyreportsummary = (event) => {
        let quarter = "";

        if (quarterlyYear == undefined) {
            return false;
        }

        if (quarterlyQuarter == undefined) {
            return false;
        }

        if (quarterlyQuarter == 0) {
            quarter = "01";

        } else
            if (quarterlyQuarter == 1) {
                quarter = "04";
            }
            else if (quarterlyQuarter == 2) {
                quarter = "07";
            }
            else if (quarterlyQuarter == 3) {
                quarter = "10";
            }
        // -----------------------------checking the selected quarter is valid or not-------------------------------------------

        var firstDate = new Date(quarterlyYear, quarterlyQuarter * 3, 1);
        var endDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0);
        // alert(firstDate +"==Current Quarters Date=="+endDate)
        var todays = new Date();
        if (endDate > todays) {
            toastAlertWarning("Please select proper date")
            return false
        }
        if (firstDate > todays) {
            toastAlertWarning("Please select proper date")
            return false
        }
        const fdate = startDate.toLocaleDateString().replaceAll("/", "-");
        const ldate = LastDate.toLocaleDateString().replaceAll("/", "-");
        const datedata = ["bill", quarter, quarterlyYear, username];
    }

    useEffect(() => {

        window.scrollTo(0, 0)

        if (localStorage.getItem("LsdItped") === null) {
            // Toastwarning("Please login first!")
            window.location.replace(BaseLocal + "Logout");
        }
        else {

        }


        /////////////////////////////get lc
        var CryptoJS = require("crypto-js");

        var base64Key = "QWJjZGVmZ2hpamtsbW5vcA==";
        var key = CryptoJS.enc.Base64.parse(base64Key);
        var plaintText = "x";
        var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        });

        if (localStorage.getItem("LsdItped")) {
            var decryptedData = CryptoJS.AES.decrypt(
                localStorage.getItem("LsdItped").replace("slashinurl", "/").replace("plusinurl", "+"),
                key,
                {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7,
                }
            );

            decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
        }

        setusername(decryptedText)
        /////////////////////////////get username

        // -----------------------------------------code to check wheather user is logout or not----------------------------------------------
        if (localStorage.getItem("LsdItped") === null) { }
        else {

            fetch(BaseLocal + "isSessNull", {
                method: "POST",
                body: decryptedText,
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    return response;
                })
                .then((response) => {
                    return response;
                })
                .then((actualData) => {
                    if (actualData.status === 400) {
                        window.location.replace(BaseLocal + "Logout");

                    }
                })
                .catch((err) => {
                    if (err.message == "Failed to fetch") {

                        history.push("/adv/LoginRequired")
                    }

                });
        }



        const BillingAsOfNow = () => {
            fetch(Baseurl + "BillingTillToday/" + quarter + "/" + quarterlyYear)
                .then((data) => {
                    const res = data.json();
                    return res
                }).then((res) => {
                }).catch(e => {
                })
        }
    }, []);










    const [flag, setFlag] = useState("quarter");
    const [documenttype, setDocumenttype] = useState("pdf");
    const handleflag = (e) => {
        setFlag(e.target.value)
    }
    const handleflagfordocument = (e) => {
        setDocumenttype(e.target.value)
    }
    const csvData = [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ];

    const toastAlertWarning = (message) => {

        toast.warn(message, {
            position: 'top-right',
            style: {
              top: '130px',
            },
            autoClose: 5000,
            transition: Slide,
            pauseOnFocusLoss: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: theme.typography.primary.alert,
        });
    }


    return (
        <>

            <ToastContainer />

            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '80%', height: 'auto', paddingBottom: '300px', bottom: '0px', backgroundColor: theme.tablecontainer.backgroundColor }}>
                <div style={{ fontSize: '30px', fontWeight: 'bold', color: theme.typography.primary.mainheading }}>Billing</div>
                <hr />
                <br />

                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue="quarter"
                    >
                        <FormControlLabel size="small" value="quarter" onClick={handleflag} control={<Radio style={{color:theme.typography.primary.radiobtn}}/>} label="Quarterly" style={{ color: theme.typography.primary.paragraphbody }} />
                        {/* <FormControlLabel value="asofnow" onClick={handleflag} control={<Radio />} label="Till today" style={{color:theme.typography.primary.paragraphbody}} /> */}
                        {/* <FormControlLabel value="status" onClick={handleflag} control={<Radio />} label="Status" style={{color:theme.typography.primary.paragraphbody}} /> */}
                    </RadioGroup>
                </FormControl>
                <br />
                <br />
                <div>
                    {flag === "asofnow" && <>
                        <br></br>
                    </>
                    }
                    {flag === "quarter" && <>


                        <Grid container spacing={1}>
                            <Grid item xs={13} sm={8} md={3} className="flex flex-col lg:flex-row justify-between"  >
                                <div >
                                    {/* <FormControl style={{ minWidth: 190 }} size='small' >
                                        <InputLabel id="demo-simple-select-label" style={{ color: theme.typography.primary.app }} >Quarter</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Quarter"

                                            value={quarterlyQuarter}
                                            onChange={e => setQuarterlyQuarter(e.target.value)}
                                            style={{ height: '38px', backgroundColor: theme.dropdownbg.backgroundColor, color: theme.typography.primary.paragraphbody, position: 'absolute', zIndex: '0' }} >
                                            {
                                                dropdownarray.map((year, index) => {
                                                    return <MenuItem key={`year${index}`} value={index} style={{ color: theme.typography.primary.paragraphbody, backgroundColor: theme.dropdownbg.backgroundColor }}>{year}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl> */}

                                    <FormControl style={{ minWidth: 170 }} size='small' >
                                        <InputLabel id="demo-simple-select-label" style={{ color: theme.typography.primary.app }}> Quarter</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Quarter"
                                            // value="01"
                                            onChange={e => setQuarterlyQuarter(e.target.value)}
                                            style={{ backgroundColor: theme.dropdownbg.backgroundColor, color: theme.typography.primary.paragraphbody }}

                                        >
                                             {
                                                dropdownarray.map((year, index) => {
                                                    return <MenuItem key={`year${index}`} value={index} style={{ color: theme.typography.primary.paragraphbody, backgroundColor: theme.dropdownbg.backgroundColor }}>{year}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                            </Grid>


                            <Grid item xs={12} sm={8} md={3} lg={3}>
                                <div>
                                    <FormControl style={{ minWidth: 120, }} size='small' >
                                        <InputLabel id="demo-simple-select-label" style={{ color: theme.typography.primary.app }}>Year</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Year"
                                            // value={quarterlyYear}
                                            onChange={e => setQuarterlyYear(e.target.value)}
                                            style={{ height: '38px', backgroundColor: theme.dropdownbg.backgroundColor, color: theme.typography.primary.paragraphbody }}                                            >
                                            {
                                                years.map((year, index) => {
                                                    return <MenuItem key={`year${index}`} value={year} style={{ color: theme.typography.primary.paragraphbody, backgroundColor: theme.dropdownbg.backgroundColor }}>{year}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                            </Grid>



                            <Grid item xs={12} sm={8} md={6} lg={3}>
                                <div style={{}}>

                                    {fetchingdataflag ?
                                        <>
                                            {spinnerforfetchingpdf ?
                                                <>
                                                    <ReactLoadingforpdf type="balls" color="#0000FF"
                                                        height={10} width={40} />

                                                </>
                                                :
                                                <>
                                                    <Button size="medium" color="info" variant="contained" onClick={(e) => { Downloadpdf() }} >PDF</Button>

                                                </>
                                            }

                                            {spinnerforfetchingcsv ?
                                                <>
                                                    <ReactLoadingforcsv type="balls" color="#0000FF"
                                                        height={10} width={40} />

                                                </>
                                                :
                                                <>
                                                    <CSVLink
                                                        data={csvdata}
                                                        filename="Bill"
                                                        style={{ marginLeft: '5px' }}
                                                    >
                                                        <Button size="medium" color="info" variant="contained" onClick={(e) => { setFetchingdataflag(false) }} >CSV</Button>
                                                    </CSVLink>
                                                </>
                                            }


                                        </>

                                        :
                                        <><Button size="medium" color="info" variant="contained" onClick={generate} >generate</Button></>

                                    }





                                </div>
                            </Grid>
                        </Grid>
                        <br></br>
                    </>
                    }
                    {flag === "status" && <>
                    </>
                    }
                </div>
            </div>
            <br></br>
            {/* </Card> */}

            <br />
            <br />   <br />
            <br />
            <br />


        </>
    )
}