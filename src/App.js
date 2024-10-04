import { Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Report from './pages/Report';
import './assets/styles/tailwind.css';
import ApplicationDetails from './components/ApplicationDetails';
import ApplicationsInfo from './components/ApplicationsInfo';
import AppDetails from './components/AppDetails';
import LoginRequired from './components/LoginRequired';
import HeaderAdv from './components/HeaderAdv';
import Billing from './components/Billing';
import ReportApp from './pages/ReportApp';
import BillingApp from './components/BillingApp';
import Navbar2 from './components/Navbar2';

import { useEffect, useState } from 'react';
import '../src/App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import NavbarShrink from './components/NavbarShrink';
import Footer2 from './pages/Footer2';
import Dashboard from './pages/Dashboard';
import SingIn from './pages/SingIn';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import { AppWiseoprTransactionBarchart } from './components/AppWiseOprTransactionBarchart';
import ErrorPage from './components/ErrorPage';

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
  grid: {
    backgroundColor: 'white'
  },
  dash: {
    backgroundColor: 'linear-gradient(to right, lightgrey , lightblue)'
  },

  dashboardcount: {
    backgroundColor: 'linear-gradient(to right, #f7f6fa , #DEF1F7)'
  },
  titleADV: {
    background: 'linear-gradient(to right, #330867 , #30CFD0 )'
  },
  news: {
    backgroundImage: 'linear-gradient(to right,  orange,pink)'
  },
  table: {
    backgroundImage: 'linear-gradient(to right,  orange,pink)'
  },
  tablebody: {
    backgroundColor: 'whitesmoke'
  },
  tableinnerbody: {
    backgroundImage: 'linear-gradient(to right, lightgrey , lightblue)'
  },
  tablecontainer: {
    backgroundColor: 'white'
  },
  navbar: {
    backgroundColor: '#063970'
  },
  sidebar: {
    backgroundColor: 'white'
  },
  login: {
    backgroundColor: 'blue'
  },
  accordianbg: {
    backgroundColor: 'white'
  },
  dropdownbg: {
    backgroundColor: 'white'
  },
  viewbg: {
    backgroundColor: '#80aed736'
  },
  viewbgtable: {
    backgroundColor: 'aliceblue'
  },
  typography: {
    primary: {
      light: 'green',
      dark: 'red',
      lightest: 'orange',
      title: 'blue',
      galleryheading: '#548BC5',
      headings: '#2b5281',
      paragraph: 'black',
      mainheading: '#2b5281',
      paragraphbody: 'black',
      success: 'green',
      app: 'black',
      radiobtn:' #0288d1',
      alert:'light',
      appnamedetail:'red'

    },
    secondary: {
      light: 'black'
    }
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',

  },
  news: {
    backgroundImage: 'linear-gradient(to right, black,black)'
  },

  dashboardcount: {
    backgroundColor: 'linear-gradient(to right, black, black)'
  },
  titleADV: {
    background: 'linear-gradient(to right, white, white )'
  },
  dropdownbg: {
    backgroundColor: '#616161'
  },
  viewbgtable: {
    backgroundColor: 'black'
  },
  typography: {
    color: 'yellow',
    primary: {
      light: 'yellow',
      dark: 'yellow',
      lightest: 'yellow',
      title: 'yellow',
      galleryheading: 'yellow',
      mainheading: 'yellow',
      paragraphbody: 'white',
      success: 'yellow',
      app: 'yellow',
      radiobtn:'white',
      alert:'dark',
      appnamedetail:'white'
    },
    secondary: {
      light: 'white'
    }
  },
  dash: {
    backgroundColor: 'linear-gradient(to right, black , black)',
  },
  viewbg: {
    backgroundColor: '#616161'
  },
  title: {
    textcolor: 'white'
  },
  navbar: {
    backgroundColor: '#424242'
  },
  sidebar: {
    backgroundColor: '#424242'
  },
  login: {
    backgroundColor: '#9e9e9e'
  },

  grid: {
    backgroundColor: 'black'
  },
  bgbody: {

    bgblack: 'black'
  },
  table: {
    backgroundImage: 'linear-gradient(to right,#616161,#bdbdbd)'
  },
  card: {
    primary: 'black'
  },
  tablebody: {
    backgroundColor: '#424242'
  },
  tableinnerbody: {
    backgroundImage: 'linear-gradient(to right, #616161 ,#616161)'
  },
  tablecontainer: {
    backgroundColor: 'black'
  },
  accordianbg: {
    backgroundColor: '#e0e0e0'
  }

});


function App() {
  const realtheme = useTheme();
  let { authStore } = useSelector((state) => state);

  const [portaltype, setportaltype] = useState();

  useEffect(() => {

    if (authStore.type == 'd') {
      setportaltype(true)
    } else {
      setportaltype(false)
    }
    
  }, [])

  const [selecttheme, setSelectheme] = useState();
  const [theme, setTheme] = useState('light');
  const [bodybgcolor, setbodybgcolor] = useState('white');

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    localStorage.setItem("theme", theme)
    setSelectheme(localStorage.getItem("theme"))
    if (theme === 'light') {
      setbodybgcolor('black')
    }
    else if (theme === 'dark') {
      setbodybgcolor('white')
    }
  };

  return (
    <>
     
      <Navbar2 theme={theme} handleThemeChange={handleThemeChange} />
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <div style={{ backgroundColor: bodybgcolor }}>
          <HeaderAdv />
          <NavbarShrink />
          {/* <Sidebar /> */}
          {authStore.type == 'd' && <Sidebar />}
          {authStore.loginStatus &&
            <>
              <div className="md:ml-64" style={{ paddingTop:'12%'}}>
                <Route exact path="/adv/applicationDetails" component={ApplicationDetails} />
                <Route exact path="/adv/applicationinfo/:appcode/:appName" component={props => <ApplicationsInfo {...props} />} />
                <Route exact path="/adv/appdetails" component={AppDetails} />
                <Route exact path="/adv" component={Dashboard} />
                <Route exact path="/adv/reportsapp" component={Report} />
                <Route exact path="/adv/billingapp" component={Billing} />
                <Route exact path="/adv/reports" component={ReportApp} />
                <Route exact path="/adv/billing" component={BillingApp} />
                <Route exact path="/adv/appcharts/:appcode" component={AppWiseoprTransactionBarchart} />
              </div>
            </>
          }

      {!authStore.loginStatus &&
            <>
              <div className="md:ml-64" style={{ paddingTop:'12%'}} >
                <Route exact path="/adv/LoginRequired" component={LoginRequired} />
                <Route exact path="/adv/applicationinfo/:appcode" component={LoginRequired} />
                <Route exact path="/adv/appdetails" component={LoginRequired} />
                <Route exact path="/adv" component={LoginRequired} />
                <Route exact path="/adv/reports" component={ReportApp} />
                <Route exact path="/adv/billing" component={BillingApp} />
                <Route exact path="/adv/reportsapp" component={LoginRequired} />
                <Route exact path="/adv/billingapp" component={LoginRequired} />
              </div>
            </>
          }
          <Route exact path="/adv/Login" component={Login} />
          {/*=====================================After Login============================== */}
          <Route exact path="/adv/SignIn" component={SingIn} />
          <Route path="/adv/LoginRequired" component={LoginRequired} />
          {/* <Route path="*" component={ErrorPage} /> */}
          {/* ////////////////////////////////////////////////////////////////////////////////// */}
          <Footer2 />
        </div>
      </ThemeProvider>
    </>
  );
}
export default App;
