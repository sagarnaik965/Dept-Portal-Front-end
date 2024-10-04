
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import BaseLocal from './BaseLocal';
import ReactLoading from "react-loading";
import {  useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutApiAction } from "../store/authslice";



function LoginRequired() {

  let [username,setUsername]= useState();
  let history = useHistory();
  let { authStore } = useSelector((state) => state);

  let dispatch = useDispatch();
  var decryptedText = "";

  useEffect(() => {  
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
setUsername(decryptedText);
let user = authStore.deptId;
// alert(decryptedText+"-before logout")
localStorage.clear()
// window.location.replace(BaseLocal + "Logout/"+user);


if(!decryptedText){
// if(!localStorage.getItem("LsdItped")){
  window.location.replace(BaseLocal);

  // window.location.replace(BaseLocal+"Demo");

}else {
  
  // -------------------production-------------------------------
  window.location.replace(BaseLocal + "Logout/"+decryptedText);

  // --------------------Local-------------------------------
  // window.location.replace(BaseLocal + "Logout");

}

  }, []);




  return (

   

    <div style={{ minHeight: '510px' }} >      
      Logging Out ....
    </div>
  );
}

export default LoginRequired;























// --------------------------------------old code before epramaan integration--------------------------------------

// import React, { useEffect, useState } from 'react'
// import Grid from '@mui/material/Grid';
// import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
// import BaseLocal from './BaseLocal';
// import ReactLoading from "react-loading";
// import { useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutApiAction } from "../store/authslice";



// function LoginRequired() {
//   let history = useHistory();
//   let { authStore } = useSelector((state) => state);
//   let dispatch = useDispatch();


//   useEffect(() => {
//     if(localStorage.getItem("LsdItped")==null)
//     {
//       window.location.replace(BaseLocal + "Logout" );
//       localStorage.clear()
//     }
  
//     /////////////////////////////get lc
//     var CryptoJS = require("crypto-js");
//     // alert(localStorage.getItem("hidden") +"-hidden")
//     var base64Key = "QWJjZGVmZ2hpamtsbW5vcA==";
//     var key = CryptoJS.enc.Base64.parse(base64Key);
//     var plaintText = "x";
//     var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
//       mode: CryptoJS.mode.ECB,
//       padding: CryptoJS.pad.Pkcs7
//     });
//     var decryptedData = CryptoJS.AES.decrypt(localStorage.getItem("hidden").replace("slashinurl", "/").replace("plusinurl", "+"), key, {
//       mode: CryptoJS.mode.ECB,
//       padding: CryptoJS.pad.Pkcs7
//     });
//     var decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
//     /////////////////////////////get username


//     window.location.replace(BaseLocal + "Logout/" );
//     localStorage.clear()


//   }, []);
//   return (
//     <div style={{ minHeight: '510px' }} >
//       <center>  Logging Out ....</center>
    
//     </div>
//   );
// }

// export default LoginRequired;
