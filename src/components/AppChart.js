import React, { useEffect, useState } from "react";
import Baseurl from "./Baseurl";
import ReactLoading from "react-loading";
import {
  BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
  Tooltip
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import BaseLocal from "./BaseLocal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from '@material-ui/core/styles';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export function AppChart() {
  const [oprnames, setoprnames] = useState([]);
// const labels = ["getrefnum", "getuid", "activate", "struid", "deactivate"];
const labels = oprnames;

const d1 = [];
  const theme = useTheme();
  let history = useHistory();
  var decryptedText = "";
  let [username, setusername] = useState("");
  const [no, setNo] = useState([]);
  const [yes, setYes] = useState([]);
  const [txnforTotal, setTotal] = useState([]);
  const [spinner, setSpinner] = useState(false);

  const data = {
    labels,
    datasets: [
      {
        label: "Successful",
        data: yes,
        backgroundColor: '#0DC818',
        // color:'red'
      },
      {
        label: "Unsuccessful ",
        data: no,
        backgroundColor: '#E74C3C',

      },
      {
        label: "Total",
        data: txnforTotal,
        backgroundColor: '#F4D03F',
      }
    ],
    borderWidth: 0.1,

  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color:  theme.typography.primary.paragraphbody
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: theme.typography.primary.paragraphbody
        }
      },
      y: {
        ticks: {
          color: theme.typography.primary.paragraphbody
        }
      }
    },
    responsive: true,

  };
  const { appcode } = useParams();
  const appc = appcode;

  useEffect(() => {

    window.scrollTo(0,0)

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



    setSpinner(true)

    const txnforNo = () => {
      const appcodedata = [appc, "No"]
      fetch(Baseurl + "applicationwisedata", {
        method: "POST",
        body: JSON.stringify(appcodedata),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      })
        .then((data) => {
          const res = data.json();
          return res
        }).then((res) => {
          var label = [];
          var data = [];
          for (var i of res) {
            label.push(i.label);
            data.push(i.y)
          }
          setNo(data);
          setSpinner(false)
        }).catch(e => {
        })
    }
    txnforNo();

    const txnforYes = () => {
      const appcodedata = [appc, "Yes"]
      fetch(Baseurl + "applicationwisedata", {
        method: "POST",
        body: JSON.stringify(appcodedata),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      })
        .then((data) => {
          const res = data.json();
          return res
        }).then((res) => {
          var label = [];
          var data = [];
          for (var i of res) {
            label.push(i.label);
            data.push(i.y)
          }
          setYes(data);
        }).catch(e => {
        })
    }
    txnforYes();

    const txnforTotal = () => {
      const appcodedata = [appc, "Total"]

      fetch(Baseurl + "applicationwisedata",
        {
          method: "POST",
          body: JSON.stringify(appcodedata),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        }
      )
        .then((data) => {
          const res = data.json();
          return res
        }).then((res) => {

          var label = [];
          var data = [];
          for (var i of res) {
            label.push(i.label);
            data.push(i.y)
          }
          setTotal(data);

          setoprnames(label);
        }).catch(e => {
        })
    }
    txnforTotal();
  }, [])

  return (
    <>
    <div style={{ backgroundColor: theme.tablecontainer.backgroundColor }}>
      {spinner ?
        <>
          <div style={{
            marginTop: '100px',
            position: 'absolute', left: '60%', top: '20%',
            transform: 'translate(-50%, -50%)'
          }}>

            <center className='advloading' >
              <ReactLoading type="spinningBubbles" color='#40c4ff' height={50} width={60} />
            </center>


          </div>

        </>
        :
        // <Line options={options} data={data}  height={300}  style={{  maxHeight:'100%'  }} />
        <Bar options={options} data={data}  height={300}  style={{  maxHeight:'100%'  }} />
      }
    </div>
    </>
  );
}

