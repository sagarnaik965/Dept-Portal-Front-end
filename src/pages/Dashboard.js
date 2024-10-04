import Card from "@material-tailwind/react/Card";
import CardRow from "@material-tailwind/react/CardRow";
import { useEffect, useState } from "react";
import { BiGroup, BiPoll } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { typeApiActionforDynamic } from "../store/authslice";
import Grid from "@mui/material/Grid";
import Baseurl from "../components/Baseurl";
import BaseLocal from "../components/BaseLocal";
import "../assets/styles/animation.css";
import { ChartForWeeklyTransaction } from "../components/ChartForWeeklyTransaction";
import Donutchart from "../components/Donutchart";
import { useTheme } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DonutchartType from "../components/DonutchartType";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function Dashboard() {
  let reloadCount = sessionStorage.getItem("reloadCount");
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openunsucessful, setOpenunsucessful] = React.useState(false);
  const handleClickOpenunsucessful = () => {
    setOpenunsucessful(true);
  };
  const handleCloseunsucessful = () => {
    setOpenunsucessful(false);
  };

  const theme = useTheme();
  const [succesfullcount, setsuccesfullcount] = useState("");
  const [unsuccesfullcount, setunsuccesfullcount] = useState("");
  const [totalac, setTotalac] = useState("");
  let history = useHistory();
  const [spinner, setSpinner] = useState(false);
  let dispatch = useDispatch();
  let { authStore } = useSelector((state) => state);

  var decryptedText = "";



  useEffect(() => {

    window.scrollTo(0, 0)
    dispatch(typeApiActionforDynamic());
    if (localStorage.getItem("LsdItped") === null) {
      window.location.replace(BaseLocal);
      // window.location.replace(BaseLocal + "Demo");
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
            window.location.replace(BaseLocal);
            // window.location.replace(BaseLocal + "Demo");
          }
        })
        .catch((err) => {
          if (err.message == "Failed to fetch") {
            history.push("/adv/LoginRequired")
          }
        });
    }

    // -----------------------------------------code for dashboard Successful counts----------------------------------------------
    fetch(Baseurl + "homepagesuccesscount",
      {
        method: "POST",
        body: decryptedText,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => response.json())
      .then((actualData) => {
        setsuccesfullcount(actualData)
      }
      )
      .catch((err) => {
      });

    // -----------------------------------------code for dashboard Unsuccessful counts----------------------------------------------
    fetch(Baseurl + "totalerrorcount",
      {
        method: "POST",
        body: decryptedText,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => response.json())
      .then((actualData) => setunsuccesfullcount(actualData))
      .catch((err) => {
      });

    // -----------------------------------------code for dashboard Total Application counts counts----------------------------------------------
    fetch(Baseurl + "totalaccountdeptwise",
      {
        method: "POST",
        body: decryptedText,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => response.json())
      .then((actualData) => {
        setTotalac(actualData)
      }
      )
      .catch((err) => {
      });


    // ---------------------code for refreshing the page manually----------------------------------------
    if (reloadCount < 2) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      // window.location.reload();
      history.push("/adv")
    } else {
      sessionStorage.removeItem('reloadCount');
    }

  }, []);
  var total = succesfullcount + unsuccesfullcount;

  return (
    <>
      <div
        className="px-2"
        style={{
          opacity: "1",
          minHeight: "510px",
          marginBottom: "150px",
          backgroundColor: theme.tablecontainer.backgroundColor,
        }}
      >
        <Grid container spacing={1} style={{ backgroundColor: theme.tablecontainer.backgroundColor }}>
          <Grid xs={12} sm={3} md={3} item>
            <Card className="hvr-sweep-to-right" >
              <div style={{ backgroundColor: theme.grid.backgroundColor, borderRadius: '10px', cursor: 'pointer' }}>
                <CardRow >
                  <BiPoll size={"40px"} style={{ color: theme.typography.primary.light }} />
                  <br></br>
                  <div style={{ textAlign: "center", paddingLeft: "40px", color: theme.typography.primary.success }} onClick={handleClickOpen}>
                    Successful
                    <br></br>
                    <div style={{ color: theme.typography.secondary.light }}>{succesfullcount.toLocaleString()}</div>
                  </div>
                  <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                  >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} style={{ color: theme.typography.primary.paragraphbody, backgroundColor: theme.viewbg.backgroundColor }}>

                      Operation-wise Successful Transactions   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                      <DonutchartType type="y" />
                    </DialogContent>
                  </BootstrapDialog>
                </CardRow>
              </div>
            </Card>
          </Grid>
          <Grid xs={12} sm={3} md={3} item>
            <Card className="hvr-sweep-to-right">
              <div style={{ backgroundColor: theme.grid.backgroundColor, borderRadius: '10px', cursor: 'pointer' }}>
                <CardRow>
                  <BiPoll size={"40px"} style={{ color: theme.typography.primary.dark }} />
                  <div style={{ textAlign: "center", paddingLeft: "40px", color: theme.typography.primary.dark }} onClick={handleClickOpenunsucessful}>
                    Unsuccessful
                    <br></br>
                    <div style={{ color: theme.typography.secondary.light }}> {unsuccesfullcount.toLocaleString()}</div>

                  </div>
                  <BootstrapDialog
                    onClose={handleCloseunsucessful}
                    aria-labelledby="customized-dialog-title"
                    open={openunsucessful}
                  >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseunsucessful} style={{ color: theme.typography.primary.paragraphbody, backgroundColor: theme.viewbg.backgroundColor }}>

                      Operation-wise Unsuccessful Transactions &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                      <DonutchartType type="n" />
                    </DialogContent>
                  </BootstrapDialog>

                </CardRow>
              </div>
            </Card>
          </Grid>
          <Grid xs={12} sm={3} md={3} item>
            <Card className="hvr-sweep-to-right">
              <div style={{ backgroundColor: theme.grid.backgroundColor, borderRadius: '10px', }}>
                <CardRow>
                  <BiPoll size={"40px"} style={{ color: theme.typography.primary.lightest }} />
                  <div style={{ textAlign: "center", paddingLeft: "40px", color: theme.typography.primary.lightest }}>
                    Total
                    <br></br>
                    <div style={{ color: theme.typography.secondary.light }}> {total.toLocaleString()}</div>

                  </div>
                </CardRow>
              </div>
            </Card>
          </Grid>
          <Grid xs={12} sm={3} md={3} item>
            <NavLink to="/adv/applicationDetails">
              <Card>
                <div style={{ backgroundColor: theme.grid.backgroundColor }}>
                  <CardRow>
                    <BiGroup size={"40px"} />
                    <div style={{ textAlign: "center", paddingLeft: "40px", color: theme.typography.primary.app }}>
                      Applications
                      <br></br>
                      <div style={{ color: theme.typography.secondary.light }}>   {totalac.toLocaleString()}</div>

                    </div>
                  </CardRow>
                </div>
              </Card>
            </NavLink>
          </Grid>
        </Grid>
        <br />

        <Grid container spacing={1} style={{ backgroundColor: theme.tablecontainer.backgroundColor }}>
          <Grid xs={12} sm={6} lg={6} md={6} item style={{ backgroundColor: theme.tablecontainer.backgroundColor }}>
            <Typography variant="h6" style={{ color: theme.typography.primary.paragraphbody, backgroundColor: theme.tablecontainer.backgroundColor }}>Operation-Wise Transactions</Typography>
            <hr style={{ backgroundColor: theme.tablecontainer.backgroundColor }} />
            <Donutchart />
          </Grid>
          <Grid xs={12} sm={6} lg={6} md={6} item >
            <Typography variant="h6" style={{ color: theme.typography.primary.paragraphbody, backgroundColor: theme.tablecontainer.backgroundColor }}>Weekly Transactions</Typography>
            <hr />
            <ChartForWeeklyTransaction />
          </Grid>
        </Grid>

        <br />
      </div>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
}
