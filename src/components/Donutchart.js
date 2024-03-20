import { useTheme } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import Baseurl from "./Baseurl";
import '../assets/css/donutchart.css'
function Donutchart() {
    const theme = useTheme();
    const [oprNames, setOprNames] = useState(['getuid', 'storeuid', 'activate', "deactivate"]);
    const [counts, setCounts] = useState([0, 0, 0, 0]);
    var decryptedText = "";
    useEffect(() => {
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
        const getdata = async () => {
            const oprname = [];
            const count = [];
            const reqData = await fetch(Baseurl + "DonutChart", {
                method: "post",
                body: decryptedText,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },

            })
            const resData = await reqData.json();
            for (let i = 0; i < resData.length; i++) {
                oprname.push(resData[i].name);
                count.push(parseInt(resData[i].y));
            }
            setOprNames(oprname);
            setCounts(count);
        }
        getdata();
    }, []);

    return (
        <React.Fragment>
            <div className='container-fluid mt-3 mb-3' style={{ backgroundColor: theme.tablecontainer.backgroundColor }} >
                <Chart
                    type="donut"
                    // width={350}
                    height={215}
                    series={counts}

                    options={{
                        labels: oprNames,


                        title: {
                            // text:"counts Country Name",
                            // align:"center",
                        },

                        plotOptions: {
                            pie: {
                                donut: {
                                    labels: {
                                        show: true,
                                        value:{
                                            color:theme.typography.primary.paragraphbody,
                                        },

                                        total: {
                                            show: true,
                                            showAlways: true,
                                            fontSize: 20,
                                            color: '#f90000',
                                        },
                                        // style: {
                                        //     fontSize: '14px',
                                        //     fontFamily: 'Roboto, sans-serif',
                                        //     fontWeight: 400,
                                        //     colors: ['#fff', '#fff', '#fff', '#fff'], // set the color of text to white
                                        //   },


                                    }
                                }
                            }
                        },
                        legend: {
                            show: true,
                            fontSize: '14px',
                            labels: {
                                colors: theme.typography.primary.paragraphbody,
                            }
                        },
                        dataLabels: {
                            enabled: true,
                        },

                    }}
                // apply CSS class to label text
                //   className="donut-chart"
                />

            </div>
        </React.Fragment>
    );
}
export default Donutchart;

